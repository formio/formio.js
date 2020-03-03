All forms rendered within the Form.io platform are done through the use of a JSON Schema. This schema is used to tell the renderer how to render the form, but also provides a way for the API to automatically be generated to support the form. This documentation provides detailed specification over the structure of the Form JSON Schema, in addition to all components that can be rendered within a Form.

## Form JSON
Every form defined within Form.io starts with the Form Definition. This describes the properties of the form itself, such as the display type of the form, the type of form, title, path, etc. For example, the following schema describes a form wizard called **Registration**.

```json
{
  "title": "Registration",
  "name": "registration",
  "path": "register",
  "type": "form",
  "display": "wizard",
  "components": [...]
}
```

There are many more properties that can be defined, which are defined as follows.

| Property | Description | Value | Example |
|----------|-------------|--------|---------|
| title | The title of the form. | any `string` | `Registration` |
| name | The API name of the form. Must be a camel-cased identifier used as a human readable identifier. | any `string` | `registration` |
| path | The URL path of the form. This is relative to the base URL of the Project API, and it can contain nested paths such as "user/login". | any `string` | For the following form @ https://examples.form.io/user/login, the base URL of this project is "https://examples.form.io" and the **path** is ```user/login``` |
| type | This is the type of form that is defined. Currently, there are just two types, ```resource``` and ```form```. Resources are special kinds of forms that serve as data structures that can be pulled into other forms through the resource component | `form` or `resource` | `form` |
| display | The display configuration for this form, where each display interprets the JSON schema differently. For example, the `wizard` display turns any root `Panel` component into a separate page within a wizard workflow. | `form`, `wizard`, `pdf` | `form` |
| components | An array of form components where each component is defined through a separate Schema definition described in the Components Schema section. | Array of JSON components | See [Components JSON section](https://github.com/formio/formio.js/wiki/Components-JSON-Schema) |
| _id | The unique identifier for this form object | uuid `string` | `59514e15ef644f006d512dc1` |
| modified | The modified date where this form schema was modified | ISO-8601 Date String | `2017-06-29T19:24:08.891Z` |
| created | The created date when this form was created | ISO-8601 Date String | `2017-06-29T19:24:08.891Z` |
| action | A custom URL to send the `POST` and `PUT` submission data to. | URL `string` | `https://yourdomain.com/submission/api` |
| tags | An array of free-form tags that are assigned to this form. This is useful for categorization of the forms. | Array of any `string` | `["standard", "user"]` |
| machineName | A project unique identifier for this form, which allows for seamless migration into other projects and deployments into other environments. | `string` in the format `[project id]:[form name]` | `jawjclewrjglla:benefitsEnrollment` |
| project | For forms hosted on https://form.io, this is the Project ID which contains this form. | Project ID | `59514e10ef644f006d512db9` |
| owner | The user who was authenticated (using the `x-jwt-token` header), that created this form. | Submission ID of the authenticated user | `59514e10ef644f006d512db9` |
| access | An array of role-permission mappings that assign roles to certain permissions to **form** schema. | Array of Role-Permission Schema | See [Role-Permission Schema](https://github.com/formio/formio.js/wiki/Form-JSON-Schema#role-permission-schema) |
| submissionAccess | An array of role-permission mappings that assign roles to certain permissions to **submissions** of this form. | Array of Role-Permission Schema | See [Role-Permission Schema](https://github.com/formio/formio.js/wiki/Form-JSON-Schema#role-permission-schema) |

### Role-Permission Schema
The schema that determines who has access to certain actions within the Form.io platform uses the Role-Permission schema as defined as follows.

| Property | Description | Value |
|----------|-------------|--------|
| type | The type of permission the roles have been assigned. | ```create_own```, ```create_all```, ```read_own```, ```read_all```, ```edit_own```, ```edit_all```, ```delete_own```, ```delete_all``` |
| roles | An array of Role IDs that are assigned to this role-permission type. | An array of Role ID's |
 
