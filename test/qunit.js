QUnit.test("Test Formio.js capabilities", function (assert) {
  var protocol = 'http';
  var domain = 'localhost:3000';

  var formio = new formiojs;
  var variables = {};

  // Point to our test domain.
  formio.setBaseUrl(protocol + '://api.' + domain);

  // Ensure we start logged out.
  formio.setToken(null);

  var tests = [
    {
      message: 'Registering user.',
      promise: function() {
        variables['username'] = chance.string({
          length: 10,
          pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
        });
        variables['email'] = chance.email();
        variables['password'] = chance.string({length: 12});
        return formio.request(protocol + '://formio.' + domain + '/user/register/submission?live=1', 'post', {
          data: {
            'user.name': variables['username'],
            'user.email': variables['email'],
            'user.password': variables['password']
          }
        });
      },
      catch: function(response, assert, done) {
        assert.equal(response, '"Username must be unique."', 'Already registered');
        done();
      }
    },
    {
      message: 'Logging in.',
      promise: function() {
        return formio.request(protocol + '://formio.' + domain + '/user/login/submission?live=1', 'post', {
          data: {
            'user.email': variables['email'],
            'user.password': variables['password']
          }
        });
      },
      then: function(response, assert, done) {
        assert.ok(response.ok, 'Logged in');
        response.json().then(function(user) {
          variables['user'] = user;
          done();
        })
      }
    },
    {
      message: 'Current user.',
      promise: function() {
        return formio.currentUser();
      },
      then: function(response, assert, done) {
        assert.ok(response.ok, 'Got current user');
        response.json().then(function(user) {
          variables['user'] = user;
          done();
        })
      }
    },
    {
      message: 'Create Project',
      promise: function() {
        var formioInstance = formio();
        variables['projectTitle'] = chance.string({
          length: 10,
          pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
        });
        variables['projectName'] = chance.string({
          length: 10,
          pool: 'abcdefghijklmnopqrstuvwxyz'
        });
        variables['projectDescription'] = chance.paragraph({sentences: 1});
        return formioInstance.saveProject({
          title: variables['projectTitle'],
          name: variables['projectName'],
          description: variables['projectDescription'],
          settings: {
            cors: '*'
          },
          template: 'http://help.form.io/templates/empty.json'
        });
      },
      then: function (response, assert, done) {
        assert.ok(response.ok, 'Created project.');
        response.json().then(function(project) {
          variables['project'] = project;
          assert.equal(project.title, variables['projectTitle'], 'Project Title Matches');
          assert.equal(project.name, variables['projectName'], 'Project Name Matches');
          assert.equal(project.description, variables['projectDescription'], 'Project Description Matches');
          assert.equal(project.owner, variables['user']._id, 'User owns the project');
          done();
        });
      }
    },
    {
      message: 'Getting Projects',
      promise: function() {
        return formio.loadProjects()
      },
      then: function (response, assert, done) {
        assert.ok(response.ok, 'Got projects.');
        response.json().then(function(projects) {
          assert.equal(projects[0]._id, variables['project']._id, 'Project is returned');
          variables['project'] = projects[0];
          done();
        });
      }
    },
    {
      message: 'Read Project',
      promise: function() {
        var formioInstance = new formio('/project/' + variables['project']._id);
        return formioInstance.loadProject();
      },
      then: function(response, assert, done) {
        assert.ok(response.ok, 'Project loaded');
        response.json().then(function(project) {
          assert.deepEqual(project, variables['project'], 'Project is equal to itself');
          done();
        });
      }
    },
    {
      message: 'Update Project',
      promise: function() {
        var formioInstance = new formio('/project/' + variables['project']._id);
        variables['project'].name = chance.string({
          length: 10,
          pool: 'abcdefghijklmnopqrstuvwxyz'
        });
        variables['project'].title = chance.string({
          length: 10,
          pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
        });
        variables['project'].description = chance.paragraph({sentences: 1});
        return formioInstance.saveProject(variables['project']);
      },
      then: function(response, assert, done) {
        assert.ok(response.ok, 'Project saved');
        response.json().then(function(project) {
          assert.equal(project._id, variables['project']._id, 'Project has the same id');
          assert.equal(project.name, variables['project'].name, 'Project has new name');
          assert.equal(project.title, variables['project'].title, 'Project has new title');
          assert.equal(project.description, variables['project'].description, 'Project has new description');
          assert.notEqual(project.__v, variables['project'].__v, 'Project has new revision');
          assert.notEqual(project.modified, variables['project'].modified, 'Project has new modified');
          done();
        });
      }
    },
    {
      message: 'Create Form',
      promise: function() {
        var formioInstance = formio('/project/' + variables['project']._id + '/form');
        variables['form'] = {
          title: chance.string({
            length: 10,
            pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
          }),
          name: chance.string({
            length: 10,
            pool: 'abcdefghijklmnopqrstuvwxyz'
          }),
          path: chance.string({
            length: 10,
            pool: 'abcdefghijklmnopqrstuvwxyz'
          }),
          components: [
            {
              defaultValue: "",
              input: true,
              inputMask: "",
              inputType: "text",
              isNew: false,
              key: "fieldLabel",
              label: "Field Label",
              multiple: false,
              persistent: true,
              placeholder: "",
              prefix: "",
              protected: false,
              suffix: "",
              tableView: true,
              type: "textfield",
              unique: false,
              validate: {
                required: false,
                minLength: "",
                maxLength: "",
                pattern: "",
                custom: "",
                customPrivate: false
              }
            },
            {
              action: "submit",
              block: false,
              disableOnInvalid: true,
              input: true,
              key: "submit",
              label: "Submit",
              leftIcon: "",
              rightIcon: "",
              size: "md",
              tableView: false,
              theme: "primary",
              type: "button"
            }
            ],
          type: 'form',
          access: [],
          submissionAccess: []
        };
        return formioInstance.saveForm(variables['form']);
      },
      then: function (response, assert, done) {
        assert.ok(response.ok, 'Created form.');
        response.json().then(function(form) {
          assert.equal(form.title, variables['form'].title, 'Form Title Matches');
          assert.equal(form.name, variables['form'].name, 'Form Name Matches');
          assert.equal(form.path, variables['form'].path, 'Form Path Matches');
          assert.equal(form.project, variables['project']._id, 'Form is in project');
          assert.equal(form.owner, variables['user']._id, 'User owns the form');
          variables['form'] = form;
          done();
        });
      }
    },
    {
      message: 'Load Forms',
      promise: function() {
        var formioInstance = new formio('/project/' + variables['project']._id + '/form');
        return formioInstance.loadForms();
      },
      then: function(response, assert, done) {
        assert.ok(response.ok, 'Forms loaded');
        response.json().then(function(forms) {
          assert.deepEqual(forms[0], variables['form'], 'Form is in list');
          done();
        });
      }
    },
    {
      message: 'Read Form',
      promise: function() {
        var formioInstance = new formio('/project/' + variables['project']._id + '/form/' + variables['form']._id);
        return formioInstance.loadForm();
      },
      then: function(response, assert, done) {
        assert.ok(response.ok, 'Form loaded');
        response.json().then(function(form) {
          assert.deepEqual(form, variables['form'], 'Form is equal to itself');
          done();
        });
      }
    },
    {
      message: 'Update Form',
      promise: function() {
        var formioInstance = new formio('/project/' + variables['project']._id + '/form/' + variables['form']._id);
        variables['form'].name = chance.string({
          length: 10,
          pool: 'abcdefghijklmnopqrstuvwxyz'
        });
        variables['form'].path = chance.string({
          length: 10,
          pool: 'abcdefghijklmnopqrstuvwxyz'
        });
        variables['form'].title = chance.string({
          length: 10,
          pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
        });
        return formioInstance.saveForm(variables['form']);
      },
      then: function(response, assert, done) {
        assert.ok(response.ok, 'Form saved');
        response.json().then(function(form) {
          assert.equal(form._id, variables['form']._id, 'Form has the same id');
          assert.equal(form.name, variables['form'].name, 'Form has the new name');
          assert.equal(form.path, variables['form'].path, 'Form has the new path');
          assert.equal(form.title, variables['form'].title, 'Form has the new title');
          assert.notEqual(form.modified, variables['form'].modified, 'Form has new modified');
          done();
        });
      }
    },
    {
      message: 'Create Submission',
      promise: function () {
        var formioInstance = formio('/project/' + variables['project']._id + '/form/' + variables['form']._id + '/submission');
        variables['submission'] = {
          data: {
            fieldLabel: chance.string()
          }
        }
        return formioInstance.saveSubmission(variables['submission']);
      },
      then: function(response, assert, done) {
        assert.ok(response.ok, 'Submission saved');
        response.json().then(function (submission) {
          assert.deepEqual(submission.data, variables['submission'].data, 'Submission data saved');
          assert.equal(submission.form, variables['form']._id, 'Submission has form');
          assert.equal(submission.owner, variables['user']._id, 'Submission has user');
          variables['submission'] = submission;
          done();
        });
      }
    },
    {
      message: 'Load Submissions',
      promise: function() {
        var formioInstance = new formio('/project/' + variables['project']._id + '/form/' + variables['form']._id + '/submission');
        return formioInstance.loadSubmissions();
      },
      then: function(response, assert, done) {
        assert.ok(response.ok, 'Submissions loaded');
        response.json().then(function(submissions) {
          assert.deepEqual(submissions[0], variables['submission'], 'Submission is in list');
          done();
        });
      }
    },
    {
      message: 'Read Submission',
      promise: function() {
        var formioInstance = new formio('/project/' + variables['project']._id + '/form/' + variables['form']._id + '/submission/' + variables['submission']._id);
        return formioInstance.loadSubmission();
      },
      then: function(response, assert, done) {
        assert.ok(response.ok, 'Submission loaded');
        response.json().then(function(submission) {
          assert.deepEqual(submission, variables['submission'], 'Submission is equal to itself');
          done();
        });
      }
    },
    {
      message: 'Update Submission',
      promise: function() {
        var formioInstance = new formio('/project/' + variables['project']._id + '/form/' + variables['form']._id + '/submission/' + variables['submission']._id);
        variables['submission'].data.fieldLabel = chance.string();
        return formioInstance.saveSubmission(variables['submission']);
      },
      then: function(response, assert, done) {
        assert.ok(response.ok, 'Submission updated');
        response.json().then(function(submission) {
          assert.equal(submission._id, variables['submission']._id, 'Submission has the same id');
          assert.deepEqual(submission.data, variables['submission'].data, 'Submission data updated');
          assert.notEqual(submission.modified, variables['submission'].modified, 'Form has new modified');
          done();
        });
      }
    },
    // Actions
    // Available Actions
    // Action Info
    {
      message: 'Delete Submission',
      promise: function() {
        var formioInstance = new formio('/project/' + variables['project']._id + '/form/' + variables['form']._id + '/submission/' + variables['submission']._id);
        return formioInstance.deleteSubmission();
      }
    },
    {
      message: 'Delete Form',
      promise: function() {
        var formioInstance = new formio('/project/' + variables['project']._id + '/form/' + variables['form']._id);
        return formioInstance.deleteForm();
      }
    },
    {
      message: 'Delete Project',
      promise: function() {
        var formioInstance = new formio('/project/' + variables['project']._id);
        return formioInstance.deleteProject();
      }
    },
    {
      message: 'Getting Projects',
      promise: function() {
        return formio.loadProjects()
      },
      then: function (response, assert, done) {
        assert.ok(response.ok, 'Got projects.');
        response.json().then(function(projects) {
          assert.ok(typeof projects[0] === 'undefined', 'No more projects');
          done();
        });
      }
    },
    {
      message: 'Logging Out',
      promise: function() {
        return formio.logout();
      },
      then: function(response, assert, done) {
        assert.equal(formio.getToken(), '', 'Logged out');
        done();
      }
    }
  ];

  var assertDone = assert.async();
  async.eachSeries(tests, function iterator(item, callback) {
    item.message = item.message || 'There was an error with the request';
    item.promise()
      .then(function(response) {
        if (typeof item.then === 'function') {
          item.then(response, assert, callback);
        }
        else {
          assert.ok(response.ok, item.message);
          callback();
        }
      })
      .catch(function(response) {
        if (typeof item.catch === 'function') {
          item.catch(response, assert, callback);
        }
        else {
          assert.ok(false, item.message + ' ' + response);
          callback();
        }
      });
  }, function done() {
    assertDone();
  });
});