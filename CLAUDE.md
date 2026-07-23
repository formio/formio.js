# @formio/js

## Identity

- **Path:** `packages/formio.js`. **Published as:** `@formio/js` on npm (MIT) — external consumers exist beyond the workspace.
- **Module system:** Dual CJS + ESM build (`tsconfig.cjs.json` + `tsconfig.mjs.json`). `main` points at `lib/cjs/index.js`. **Language:** JavaScript with TypeScript type-checking (`check-types: tsc --noEmit`).
- **Era:** modern ES-module class era — `export default class X extends Y`, class fields, lodash everywhere, ES `import`. Pockets of CJS in build tooling (e.g. `test/updateRenders.cjs`).
- **Purpose:** The browser SDK / form renderer / form builder for form.io. Defines `Webform`, `Wizard`, `Form`, `FormBuilder`, the `Component` base class, all 40 component types, the `Templates` / `Providers` / `Builders` / `Displays` registries, and the embed/CDN entry points. Consumes `@formio/core` (data processing) and `@formio/bootstrap` (default theme).

## Floor — immutable musts

- **This package is published publicly on npm.** Do not put license-gated logic, secrets, or internal-only fixtures here.
- **Do not clobber `this._submission` or `this._data` upstream of `onSetSubmission` in `Webform`.** They are reference-identity-bearing across [`Webform`](./src/Webform.js), [`Wizard`](./src/Wizard.js), and every `Component`. The correct fix for "setSubmission mutates the caller's submission" is to break aliasing at [`Webform.js:865`](./src/Webform.js) (`submission.data = this.data`), not to reset the internal references. See gotcha [`formio.js/submission-identity-01`](../../docs/gotchas/formio.js.md#submission-identity-01).
- **PRs that touch [`Webform.js`](./src/Webform.js), [`Wizard.js`](./src/Wizard.js), or [`components/_classes/component/Component.js`](./src/components/_classes/component/Component.js) must surface one concern at a time.** These are 1800 / 1200 / 4600-LOC mega-classes; mixing a typo fix, a `return;` adjustment, and a behavior change in one diff hides the load-bearing change at review. See [`formio.js/mega-class-cascade-01`](../../docs/gotchas/formio.js.md#mega-class-cascade-01).
- **A change to `Webform.setSubmission` / `_submission` / `_data` lifecycle requires a Wizard sub-form regression test.** [`Wizard.js:133`](./src/Wizard.js) reads `subForm._submission` directly; [`:1012`](./src/Wizard.js) sets its own. Wizard tests live in [`test/unit/Wizard.unit.js`](./test/unit/Wizard.unit.js) and [`test/wizards/`](./test/wizards/).
- **A change to component rendering (`Component.render`, theme partials, `Display`) must be exercised through the PDF render path too.** See gotcha [`formio.js/pdf-render-path-diverges-01`](../../docs/gotchas/formio.js.md#pdf-render-path-diverges-01).
- **New unit-test files must match `test/unit/*.unit.js`.** `.mocharc.json` globs to that exact pattern and has `bail: true` — subdirectories silently don't run. See [`formio.js/test-discovery-01`](../../docs/gotchas/formio.js.md#test-discovery-01).
- **Do not add new imports from `@formio/core/experimental`.** [`src/templates/Templates.js:2`](./src/templates/Templates.js) already depends on it; widening that surface couples our stability to core's unstable directory. See [`formio.js/templates-experimental-import-01`](../../docs/gotchas/formio.js.md#templates-experimental-import-01).

## Ceiling — emerging patterns

- **Pattern: a new component subclasses `Input` / `Field` / `NestedComponent` (not `Component` directly), exports a default class, and pairs with a `<Name>.form.js` schema file. Example:** [`src/components/textfield/TextField.js`](./src/components/textfield/TextField.js) + [`TextField.form.js`](./src/components/textfield/TextField.form.js) — the smallest reference shape. Register in [`src/components/index.js`](./src/components/index.js).
- **Pattern: registries are static classes consumed via `Formio.<Registry>` at the top of [`src/formio.form.js`](./src/formio.form.js).** Example: [`src/components/Components.js:60`](./src/components/Components.js) (`Components.setComponent(name, comp)`), [`src/providers/Providers.js`](./src/providers/Providers.js) (`addProvider(type, name, provider)`), [`src/templates/Templates.js`](./src/templates/Templates.js). Mirror the static-method shape for any new registry.
- **Pattern: form / submission lifecycle is anchored in [`Webform.js`](./src/Webform.js); Wizard / PDF specialize via subclass.** Example: `Webform` extends `NestedDataComponent`; [`Wizard`](./src/Wizard.js) and [`PDF`](./src/PDF.js) extend `Webform`. Lifecycle methods (`init`, `setValue`, `getValue`, `setSubmission`, `onSetSubmission`) cluster at [`Webform.js:700-910`](./src/Webform.js); read this range whenever the bug touches submission semantics.
- **Pattern: unit tests use a global `jsdom-global` + `Formio.createForm(document.createElement('div'), formJson)` harness. Example:** [`test/unit/Webform.unit.js`](./test/unit/Webform.unit.js) — mid-file (search for `Should handle multiple set submissions`-style tests). Mocha is configured via [`.mocharc.json`](./.mocharc.json) with `bail: true`.

## Blast radius

**24 workspace dependents + external npm consumers.** Tier: **high+**. See [`/docs/dependencies/formio.js.md`](../../docs/dependencies/formio.js.md). Bigger than `@formio/core`. Dependents include `@formio/react`, `@formio/angular`, `@formio/vue`, `@formio/premium`, `@formio/pdf`, `@formio/esignature`, `@formio/reporting`, `@formio/viewer`, and several apps. High tier means dependent tests are part of the definition of green — see Test & Build.

## Test & Build

```sh
pnpm -F @formio/js test            # mocha --config .mocharc.json test/unit/*.unit.js
pnpm -F @formio/js lint            # eslint . --fix
pnpm -F @formio/js check-types     # tsc --noEmit
pnpm -F @formio/js build           # typedoc + tsc (cjs + mjs) + gulp + webpack dev + prod
pnpm -F @formio/js test:updateRenders   # regenerate snapshot renders — read the gotcha first
```

"Green" for a local iteration = `test` + `lint` + `check-types` all pass. **"Green" for a PR = the dependents' tests pass too** — this is a high-blast-radius package (24 dependents), so before calling a change done run:

```sh
pnpm test --filter='...@formio/js'   # this package + all 24 dependents (turbo rebuilds them first)
```

`build` is only required when verifying the published artifacts.

Test config: [`.mocharc.json`](./.mocharc.json) sets `bail: true`, `timeout: 20000`, and requires `ts-node/register`, `mock-local-storage`, `jsdom-global/register`. Narrow tests with `--grep`:

```sh
cd packages/formio.js
TZ=UTC npx mocha --config .mocharc.json --grep 'Webform' test/unit/*.unit.js
```

## Hot paths & gotchas

See [`/docs/gotchas/formio.js.md`](../../docs/gotchas/formio.js.md). Current entries:

- `formio.js/submission-identity-01` — `_submission` / `_data` are identity-bearing; don't reset them upstream
- `formio.js/mega-class-cascade-01` — `Webform`, `Wizard`, `Component` are mega-classes; surface one concern per PR
- `formio.js/pdf-render-path-diverges-01` — PDF reuses Component classes via a different display path; exercise it
- `formio.js/test-discovery-01` — `test/unit/*.unit.js` only; subdirectories silently don't run
- `formio.js/templates-experimental-import-01` — we deep-import `@formio/core/experimental`; don't widen the surface
- `formio.js/error-list-repaint-dirty-01` — toggle error classes, never clear-and-repaint; a falsy `flags.dirty` must not clobber a component's own `this.dirty`
- `formio.js/widget-value-format-01` — `widget.getValueAsString(value, format)` takes a format string; never forward the display-options object into the widget layer
- `formio.js/condition-operators-mutated-by-reporting-01` — `@formio/reporting` adds a `filterKey` getter to `Utils.ConditionOperators` at load
- `formio.js/makerequest-plugin-bypass-01` — client→server calls must go through `Formio.makeRequest`, not bare `fetch`/`XHR`, or plugin-injected auth (remote-stage `x-remote-token`) is dropped

## Cross-cutting triggers

- **Touching `Webform.setSubmission`, `onSetSubmission`, `setValue`, `getValue`, `_submission`, or `_data`** → audit [`Wizard.js:133`](./src/Wizard.js) and [`:1012`](./src/Wizard.js), check the `getValue` return at [`Webform.js:870`](./src/Webform.js), and grep `_submission` across [`src/components/_classes/component/Component.js`](./src/components/_classes/component/Component.js). The FIO-10372 trap is in this neighborhood.
- **Touching component rendering (Component.render, Template partials, Display attachment)** → exercise [`PDF.js`](./src/PDF.js) / [`PDFBuilder.js`](./src/PDFBuilder.js). The FIO-10768 / FIO-11237 / FIO-11675 cluster is what happens when you don't.
- **Touching value formatting (`getView`, `getValueAsString`, `getWidgetValueAsString`, any widget's `getValueAsString`)** → read [`/docs/cross-cutting/value-display.md`](../../docs/cross-cutting/value-display.md) first. Premium's ReviewPage/DataTable consume this chain; the symptom usually surfaces there, the fix belongs here, and the two-layer test rule applies.
- **Touching conditional logic (`src/utils/utils.js` conditionals, `src/utils/conditionOperators/`, `Component.checkComponentConditions`, clearOnHide)** → read [`/docs/cross-cutting/conditional-logic.md`](../../docs/cross-cutting/conditional-logic.md) first. The same semantics exist in `@formio/core` and `@formio/premium`; a one-sided fix becomes a client/server divergence with a data-loss symptom. Note `@formio/reporting` also reads `Utils.ConditionOperators` by name and mutates each operator at load ([`formio.js/condition-operators-mutated-by-reporting-01`](../../docs/gotchas/formio.js.md#condition-operators-mutated-by-reporting-01--formioreporting-adds-a-filterkey-getter-to-utilsconditionoperators-at-load)).
- **Touching `destroy`/`teardown`/`attach`/`detach`, or any async continuation in a component** → read [`/docs/cross-cutting/component-lifecycle.md`](../../docs/cross-cutting/component-lifecycle.md) first. `teardown()` hard-deletes `this.events`; six addon packages hold lifecycle references that race destroy (FIO-10902).
- **Touching `Form.js`/`FormBuilder.js` (the `.ready` promise, instance creation, re-attach)** → read [`/docs/cross-cutting/framework-wrapper-lifecycle.md`](../../docs/cross-cutting/framework-wrapper-lifecycle.md). `@formio/react` drives these from a re-render loop; a change to ready/creation timing surfaces as a redraw/leak bug in the wrapper + demo apps (FIO-11128, FIO-11245).
- **Adding or restructuring `src/components/`, `src/templates/`, `src/providers/`** → update [`src/components/index.js`](./src/components/index.js) (or the equivalent area `index.js`) — the registries are filesystem-derived. A new directory without an index entry silently no-ops.
- **Adding or touching any direct `fetch`/`XMLHttpRequest` to the Form.io server (storage providers, custom signing/upload endpoints)** → route it through `Formio.makeRequest`/`formio.makeRequest`, never a bare request — registered plugins' `requestOptions` hooks (the portal's remote-stage `x-remote-token`) only run on the makeRequest pipeline, and a bare request 401s from a remotely-connected stage (FIO-11551). See [`formio.js/makerequest-plugin-bypass-01`](../../docs/gotchas/formio.js.md#makerequest-plugin-bypass-01--clientserver-requests-that-bypass-formiomakerequest-lose-plugin-injected-auth-remote-stage-upload-401) + the request-plugin / remote-stage-auth seam in [`/docs/cross-cutting/README.md`](../../docs/cross-cutting/README.md).
- **Touching `DataMap.iteratableRows`/`componentContext`, `NestedComponent` value propagation, or any component's `isEqual`** → `@formio/esignature` patches these base prototypes and validates signed submissions against their internals; a refactor here can silently break e-signature change-detection. Two esign fixes have landed in this package (FIO-11148 DataMap, FIO-11129 NestedComponent). Exercise the esignature suite and read [`/docs/cross-cutting/README.md`](../../docs/cross-cutting/README.md) (eSignature prototype-augmentation seam) + [`esignature/formio.js-prototype-coupling-06`](../../docs/gotchas/esignature.md#formiojs-prototype-coupling-06--esign-change-detection-depends-on-formiojs-component-internals-and-bugs-leak-across-the-boundary).
- **Changing any base component/widget/display method body (e.g. `ComponentModal.updateView`, `getValueAsString` options, the `CalendarWidget`/flatpickr ref shape)** → `@formio/vpat` patches these prototypes for accessibility and copies of stale base bodies in its overrides drift silently (FIO-11290 `updateView`/`modalPreview`, FIO-8729 5.x upgrade). It has no behavioral test suite of its own — verify in a vpat-consuming app. See [`/docs/cross-cutting/README.md`](../../docs/cross-cutting/README.md) (VPAT a11y prototype-augmentation seam) + [`vpat/override-drift-01`](../../docs/gotchas/vpat.md#override-drift-01--a-prototypemethod-override-that-reimplements-base-logic-silently-drifts-when-formiojs-changes).
- **Adding or changing instance API that user-authored JS can reach (`evalContext`, public Component getters/methods used in custom logic)** → the server mirrors that surface in `apps/formio/src/vm/src/InstanceShim.js`; an unmirrored addition works in the browser and breaks server-side validation/calculation. Read [`/docs/cross-cutting/server-evaluation.md`](../../docs/cross-cutting/server-evaluation.md).
- **Changing component markup the renderer reads back — `ref` names, element ids, `aria-*` wiring, or a shared id format (e.g. fieldset legend `l-<id>-legend` via `getFieldsetLegendIds()`)** → read [`/docs/cross-cutting/template-markup-contract.md`](../../docs/cross-cutting/template-markup-contract.md) first. The same markup is reimplemented in `@formio/bootstrap` (bootstrap3/4/5), `@formio/uswds`, and `@formio/standard-template`; a one-sided change is a silent a11y/behavior regression (FIO-11126, FIO-10942).
- **Bumping `@formio/core`** → audit [`src/templates/Templates.js:2`](./src/templates/Templates.js) for the experimental-surface import. Core's experimental directory can change shape between minor releases.
- **`major` bump** → affects external npm consumers of `@formio/js`, not just the 24 workspace dependents.

## References

- Repo-wide: [`/CLAUDE.md`](../../CLAUDE.md), [`/STANDARDS.md`](../../STANDARDS.md)
- Architecture: [`/docs/architecture/formio.js.md`](../../docs/architecture/formio.js.md)
- Dependencies: [`/docs/dependencies/formio.js.md`](../../docs/dependencies/formio.js.md)
- Gotchas: [`/docs/gotchas/formio.js.md`](../../docs/gotchas/formio.js.md)
- Upstream package: [`packages/core/CLAUDE.md`](../core/CLAUDE.md)
