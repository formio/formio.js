# JavaScript API
The JavaScript API is a minimalistic API library that allows you to work with the Form.io API's within JavaScript.

## Usage
Creating an instance of Formio is simple, and takes only a path (URL String). The path can be different, depending on
the desired output. The Formio instance can also access higher level operations, depending on how granular of a path
you start with.

```javascript
var formio = new Formio(<endpoint>, [options]);
```

Where ***endpoint*** is any valid API endpoint within Form.io. These URL's can provide a number of different methods depending on the granularity of the endpoint. This allows you to use the same interface but have access to different methods depending on how granular the endpoint url is. 

The ***options*** parameter is fully documented in the {@link Formio} SDK documentation.

**Important Note**: For any applications that wish to utilize this library, it is important to establish both the Project Url and the Base URL as follows.

```javascript
// This is the typical configuration for Hosted projects on Form.io
Formio.setBaseUrl('https://api.form.io');
Formio.setProjectUrl('https://humanresources.form.io');
```

```javascript
// This is the typical configuration for Deployed projects within your own environment. Here we will assume that the deployed container is hosted @ https://forms.yourdomain.com
Formio.setBaseUrl('https://forms.yourdomain.com');
Formio.setProjectUrl('https://forms.yourdomain.com/yourproject');
```

Here is an overview of all the methods available in the JavaScript API.

## Static Methods
Here are all of the static methods provided by the Formio JavaScript API

| Method | Description |
|--------|-------------|
| {@link Formio.createForm} | Embed a form within your application. |
| {@link Formio.use} | Used to add some {@tutorial modules} to the renderer. | 
| {@link Formio.setUser} | Sets the current user object. |
| {@link Formio.getUser} | Gets the stored user object. |
| {@link Formio.currentUser} | Returns the current user object for the authenticated user. |
| {@link Formio.logout} | Logout of the current user. |
| {@link Formio.setToken} | Sets the current JWT token for this user. |
| {@link Formio.getToken} | Retrieves either the JWT token or the decoded token value of the currently logged in user. |
| {@link Formio.request} | Performs an API request to either Form.io to any other REST endpoint. |
| {@link Formio.pageQuery} | Find all paramters that have been passed to an application via url parameters. |
| {@link Formio.ssoInit} | Perform an SSO initialization |
| {@link Formio.requireLibrary} | Provides a way to lazy load external libraries |
| {@link Formio.libraryReady} | Determine if an external library has finished loading. |
| {@link Formio.clearCache} | Clear the in-memory cache for all requests. |
| {@link Formio.setBaseUrl} | Set the Base URL for your application. |
| {@link Formio.getBaseUrl} | Return the Base URL for the application. |
| {@link Formio.setProjectUrl} | Set the project url for your application. |
| {@link Formio.getProjectUrl} | Return the Project URL for the application. |

## Project API
The project context is the top-most level of the Form.io API's. This context provides project level information for anything within your project. To declare the Formio object at this context, you simply need to provide the URL for your project like so.

```js
var formio = new Formio('https://myproject.form.io');
```

### Project Methods
| Method | Description |
|--------|-------------|
| {@link Formio#loadProject} | Loads the Project JSON |
| {@link Formio#saveProject} | Creates or Save the Project JSON |
| {@link Formio#deleteProject} | Deletes a project |
| {@link Formio#loadForms} | Loads all forms within a project. |
| {@link Formio#saveForm} | Creates a new Form within this project. |
| {@link Formio#loadRoles} | Loads all roles within a project. |
| {@link Formio#getProjectId} | If the project URL was provided via alias, then this will load and return the _id of a project. |
| {@link Formio#accessInfo} | Loads the access information for the project. |


## Forms API
The Forms API is provided to the Formio class by passing along the endpoint of the form you wish to reference. 

```js
var formio = new Formio('https://myproject.form.io/myform');
```

In addition to ALL Project API's being available, the following API methods are available for this context.

* All Project API's are available

### Form Methods
| Method | Description |
|--------|-------------|
| {@link Formio#loadForm} | Loads the Form JSON |
| {@link Formio#saveForm} | Updates the Form JSON. It can also be used to Create a new form as described in the Project methods table. |
| {@link Formio#deleteForm} | Deletes a form |
| {@link Formio#loadSubmissions} | Loads all submissions within a form. |
| {@link Formio#saveSubmission} | Creates a new submission within this form. |
| {@link Formio#loadActions} | Loads all actions attached to a form. |
| {@link Formio#canSubmit} | Determines if the currently logged in user can submit the form. |
| {@link Formio#availableActions} | Lists all of the available actions for this form. |
| {@link Formio#userPermissions} | Determines the users permissions at the form context. |

### Submissions API
The Submissions API are provided by passing along a single submission endpoint to the Formio constructor.

```js
var formio = new Formio('https://myproject.form.io/myform/submission/234234234234');
```

* All Project API's are available
* All Form API's are available

### Submission Methods
| Method | Description |
|--------|-------------|
| {@link Formio#loadSubmission} | Loads the Submission JSON |
| {@link Formio#saveSubmission} | Updates the Submission JSON. It can also be used to Create a new submission as described in the Form methods table. |
| {@link Formio#deleteSubmission} | Deletes a form |
| {@link Formio#getDownloadUrl} | Retrieves the PDF download url of this submission. |
| {@link Formio#userPermissions} | Determines the users permissions at the submission context. |

