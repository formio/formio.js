const renders = require('../../test/renders');
const forms = require('../../test/formtest');
const pretty = require('pretty');
const fs = require('fs');
import assert from 'power-assert';
const AllComponents = require('../components').default;
const Components = require('../components/Components').default;
const templates = require('./index').default;
const Form = require('../Form').default;
Components.setComponents(AllComponents);
const componentDir = 'components';

const fixComponent = (instance, index = 0) => {
	instance.id = instance.key;
	index++;
	if (instance.everyComponent) {
		instance.everyComponent((component) => fixComponent(component, index));
		if (
			Object.prototype.hasOwnProperty.call(instance, 'subForm') &&
			instance.subForm
		) {
			instance.subForm.id = instance.key;
		}
	}
	if (instance.type === 'file') {
		instance.support.filereader = true;
		instance.support.hasWarning = false;
	}
};

describe('Rendering Tests', function () {
	Object.keys(templates).forEach((framework) => {
		describe(`Framework ${framework}`, function () {
			describe('Form Renders', function () {
				Object.keys(forms).forEach((form) => {
					it(`Form renders ${form}`, function () {
						return new Form(forms[form], {
							template: framework,
						}).ready.then((instance) => {
							fixComponent(instance);
							assert.equal(
								renders[`form-${framework}-${form}`],
								pretty(instance.render(), {
									ocd: true,
								}),
							);
						});
					});
				});
			});

			Object.keys(AllComponents).forEach((component) => {
				if (component !== 'componentmodal') {
					describe(`Component ${component}`, function () {
						it(`Renders ${component} for ${framework}`, function (done) {
							const instance = new AllComponents[component](
								{},
								{
									template: framework,
								},
							);
							fixComponent(instance);
							assert.equal(
								renders[`component-${framework}-${component}`],
								pretty(instance.render(), {
									ocd: true,
								}),
							);
							done();
						});

						it(`Renders ${component} for ${framework} as required`, function (done) {
							const instance = new AllComponents[component](
								{
									validate: {
										required: true,
									},
								},
								{
									template: framework,
								},
							);
							fixComponent(instance);
							assert.equal(
								renders[`component-${framework}-${component}-required`],
								pretty(instance.render(), {
									ocd: true,
								}),
							);
							done();
						});

						it(`Renders ${component} for ${framework} as multiple`, function (done) {
							const instance = new AllComponents[component](
								{
									multiple: true,
								},
								{
									template: framework,
								},
							);
							fixComponent(instance);
							assert.equal(
								renders[`component-${framework}-${component}-multiple`],
								pretty(instance.render(), {
									ocd: true,
								}),
							);
							done();
						});

						if (
							fs.existsSync(
								`./lib/${componentDir}/${component}/fixtures/values.js`,
							)
						) {
							const values = require(
								`../${componentDir}/${component}/fixtures/values.js`,
							).default.slice(0);

							values.unshift(undefined);

							values.forEach((value, index) => {
								it(`Renders ${component} for ${framework} value ${index} as html`, function (done) {
									const instance = new AllComponents[component](
										{},
										{
											template: framework,
											flatten: true,
											renderMode: 'html',
										},
									);
									instance.dataValue = value;
									fixComponent(instance);
									assert.equal(
										renders[
											`component-${framework}-${component}-html-value${index}`
										],
										pretty(instance.render(), {
											ocd: true,
										}),
									);
									done();
								});
								it(`Renders ${component} for ${framework} value ${index} as string`, function (done) {
									const instance = new AllComponents[component](
										{},
										{
											template: framework,
											flatten: true,
											renderMode: 'html',
										},
									);
									fixComponent(instance);
									const file =
										renders[
											`component-${framework}-${component}-string-value${index}`
										];
									const val = instance.getValueAsString(value);

									if (val !== file) {
										console.log('er');
									}
									assert.equal(
										renders[
											`component-${framework}-${component}-string-value${index}`
										],
										pretty(instance.getValueAsString(value), {
											ocd: true,
										}),
									);
									done();
								});
							});
						}
					});
				}
			});
		});
	});
});
