import _ from 'lodash';

export default {
  placeholder: _.reduce(
    ["textField", "textArea", "number", "password", "select", "email", "url", "phoneNumber", "tags", "address", "dateTime", "day", "currency"],
    (obj, componentKey, index) => {
      if(componentKey === 'day') {
        obj[componentKey] = { day: "enter day", month: "enter month", year: "enter year" };
      } 
      else {
        'test placeholder' + index;
      }

      return obj;
    },
    {} 
  ),
  description: _.reduce(
    [
      "textField", "textArea", "number", "password", "checkbox", "selectBoxes", "select", "radio", "email", "url", "phoneNumber", "tags", "address", "dateTime", "day", "time", "currency", "survey", 
      //"signature", 
      "dataMap", "dataGrid", "editGrid", "tree", "file", "submit"
    ],
    (obj, componentKey, index) => {
      obj[componentKey] = 'test description' + index;
      return obj;
    },
    {} 
  ),
  tooltip:_.reduce(
    [
      "textField", "textArea", "number", "password", "checkbox", "selectBoxes", "select", "radio", "email", "url", "phoneNumber", "tags", "address", "dateTime", "day", "time", "currency", "survey", 
      //"signature", 
      "fieldset", "panel", "container", "dataMap", "dataGrid", "editGrid", "tree", "file", "submit"
      ],
    (obj, componentKey, index) => {
      obj[componentKey] = 'test tooltip' + index;
      return obj;
    },
    {} 
  ),
  prefix: _.reduce(
    ["textField", "textArea", "number", "password", "email", "url", "phoneNumber", "currency"],
    (obj, componentKey, index) => {
      obj[componentKey] = 'test prefix' + index;
      return obj;
    },
    {} 
  ),
  suffix:_.reduce(
    ["textField", "textArea", "number", "password", "email", "url", "phoneNumber", "currency"],
    (obj, componentKey, index) => {
      obj[componentKey] = 'test suffix' + index;
      return obj;
    },
    {} 
  ),
  customClass: _.reduce(
    [
      "textField", "textArea", "number", "password", "checkbox", "selectBoxes", "select", "radio", "email", "url", "phoneNumber", "tags", "address", "dateTime", "day", "time", "currency", "survey", 
      //"signature", 
      "html", "content", "columns", "fieldset", "panel", "table", "tabs", "well", "hidden", "container", "dataMap", "dataGrid", "editGrid", "tree", "file", "submit"
    ],
    (obj, componentKey) => {
      obj[componentKey] = 'test-custom__css_class';
      return obj;
    },
    {} 
  ),
  tabindex: _.reduce(
    [
      "textField", "textArea", "number", "password", "checkbox", "selectBoxes", "select", "radio", "email", "url", "phoneNumber", 
      //"tags", //BUG
      "address", "dateTime", 
      //"day", //BUG
      "time", "currency", 
      //"survey", //BUG
      //"signature",
      //"fieldset", "dataGrid", "editGrid", "tree", "file", //BUG
      "submit"
    ],
    (obj, componentKey, index) => {
      obj[componentKey] = index;
      return obj;
    },
    {} ),
  hidden: _.reduce(
    [
      "textField", "textArea", "number", "password", "checkbox", "selectBoxes", "select", "radio", "email", "url", "phoneNumber", "tags", "address", "dateTime", "day", "time", "currency", "survey", 
      //"signature", 
      "html", "content", "columns", "fieldset", "panel", "table", "tabs", "well", "container", "dataMap", "dataGrid", "editGrid", "tree", "file", "submit"
    ],
    (obj, componentKey) => {
      obj[componentKey] = true;
      return obj;
    },
    {} ),
  hideLabel: _.reduce(
    [
      "textField", "textArea", "number", "password", "checkbox", "selectBoxes", "select", "radio", "email", "url", "phoneNumber", "tags", "address", "dateTime", "day", "time", "currency", "survey", 
      //"signature", 
      "panel", "container", "dataMap", "dataGrid", "editGrid", "tree", "file"
    ],
    (obj, componentKey) => {
      obj[componentKey] = true;
      return obj;
    },
    {} ),
  disabled: _.reduce(
    [
      "textField", "textArea", "number", "password", "checkbox", "selectBoxes", "select", "radio", "email", "url", "phoneNumber", "tags", "address", "dateTime", "day", "time", "currency", "survey", 
      //"signature", 
      "fieldset", "panel", "container", "dataMap", "dataGrid", "editGrid", "tree", "file", "submit"
    ],
    (obj, componentKey) => {
      obj[componentKey] = true;
      return obj;
    },
    {} ),
  defaultValue: {
    textField: 'test default value',
    textArea: 'test default value',
    number: 55,
    checkbox: true,
    selectBoxes: {a: true, b: false, c:true},
    select: 'a',
    radio: 'b',
    email: 'user@example.com',
    url: 'https://portal.form.io',
    phoneNumber: '(555) 555-5555',
    tags: 'default',
    address: {
      address: {county: "Dallas County", state: "Texas", country: "United States", country_code: "us"},
      boundingbox: (4) ["32.5453486", "32.9899027", "-97.0383833", "-96.5168819"],
      class: "boundary",
      display_name: "Dallas County, Texas, United States",
      icon: "https://nominatim.openstreetmap.org/ui/mapicons//poi_boundary_administrative.p.20.png",
      importance: 0.6662149661993487,
      lat: "32.7620405",
      licence: "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
      lon: "-96.7790069",
      osm_id: 1837698,
      osm_type: "relation",
      place_id: 256774876,
      type: "administrative",
    },
    dateTime: '2021-02-03T12:00:00',
    day: '01/05/2005',
    time: '04:15:00',
    currency: 20,
    survey: {
      question1: 'yes',
      question2: 'no'
    },
    dataGrid: [
      {textFieldDataGrid: "default1"},
      {textFieldDataGrid: "default2"}
    ],
    tree: {
      children: [{ children: [], data: {textFieldTree: 'default2'} }],
      data:{ textFieldTree: 'default1' }
    },
  },
  customDefaultValue: {
    textField: { js:'value = data.basis + " default"', expectedValue: 'base value default'},
    textArea: { js:'value = data.basis + " default"', expectedValue: 'base value default'},
    number: { js: 'value = data.basis.length', expectedValue: 10 },
    //checkbox: { js:'value = data.basis.length > 5', expectedValue: true },// BUG
    selectBoxes: { js:'value = {a: data.basis.length > 5, b: data.basis.length > 10 , c: data.basis.length > 20}', expectedValue: { a: true, b: false , c: false}},
    select: { js:'value = data.basis.length > 5 ? "a" : "b"', expectedValue: 'a'},
    radio: { js:'value = data.basis.length < 5 ? "c" : "b"', expectedValue: 'b'},
    email: { js:'value = `${data.basis.split(" ").join("")}@example.com`', expectedValue: 'basevalue@example.com'},
    url: { js: 'value = `https://${data.basis.split(" ").join("")}.com`', expectedValue: 'https://basevalue.com'},
    phoneNumber: { js:'value = `(${data.basis ? "222":"333"}) 555-5555`', expectedValue: '(222) 555-5555'},
    tags: { js:'value = data.basis.split(" ").join(",")', expectedValue: 'base,value'},
    dateTime: { js:"var date = moment('2005-02-03T12:00:00');var now = moment();value = date < now ? '2023-03-03T12:00:00' : '2003-12-12T12:00:00';", expectedValue: '2023-03-03T12:00:00'},
    day: { js:'value = data.basis.length > 5 ? "05/05/2015" : "03/03/2003"', expectedValue: '05/05/2015'},
    time: { js:'value = data.basis.length > 5 ? "04:45:00" : "04:05:00"', expectedValue: '04:45:00'},
    currency: { js:'value = data.basis.length', expectedValue: 10 },
    survey: { js:"value = { question1: data.basis.length ? 'yes' : 'no', question2: !data.basis.length ? 'yes' : 'no'}", expectedValue: { question1: 'yes' , question2: 'no'}},
    //signature: 'test-custom__css_class',
    hidden: { js:'value = data.basis.length', expectedValue: 10 },
    container: { js:'value = { textFieldContainer: data.basis + " default" }', expectedValue: { textFieldContainer:'base value default'}},
    dataMap: { js:'value = { key: data.basis + " default" }', expectedValue: { key: 'base value default' } },
    dataGrid: { js:'value = [{ textFieldDataGrid: data.basis + " default1" }, { textFieldDataGrid: data.basis + " default2" }]', expectedValue: [{ textFieldDataGrid: 'base value default1' }, { textFieldDataGrid: 'base value default2' }]},
    editGrid: { js:'value = [{textFieldEditGrid: data.basis + " default"}]', expectedValue: [{textFieldEditGrid: 'base value default'}]},
    tree: { js:"value = {children: [], data:{ textFieldTree: data.basis + ' default' } }", expectedValue: {children: [], data:{ textFieldTree: 'base value default' } }},
    file: { js:`
      value = [{ 
        name: "test file-15c248a4-401f-4456-aff9-abcbdf0f7bfa.docx",
        originalName: "test file.docx",
        size: 11396,
        storage: "base64",
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        url: "data:application/vnd.openxmlformats-officedocument",
      }]`,
      expectedValue: [{ 
        name: "test file-15c248a4-401f-4456-aff9-abcbdf0f7bfa.docx",
        originalName: "test file.docx",
        size: 11396,
        storage: "base64",
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        url: "data:application/vnd.openxmlformats-officedocument",
      }]
    }
  },
  redrawOn:_.reduce(
    [
      "textField", "textArea", "number", "password", "checkbox", "selectBoxes", "select", "radio", "email", "url", "phoneNumber", "tags", "address", "dateTime", "day", "time", "currency", "survey", 
      //"signature", 
      "hidden", "container", "dataMap", "dataGrid", "editGrid", "tree", "file"
    ],
    (obj, componentKey) => {
      obj[componentKey] = 'checkbox';
      return obj;
    },
    {} ),
  multiple:_.reduce(
    [ 
      "textField", "textArea", "number", "password", "select", "email", "url", "phoneNumber", "address", "dateTime", "time", "currency", 
      //"tree"//BUG, 
      "file"
    ],
    (obj, componentKey) => {
      obj[componentKey] = true;
      return obj;
    },
    {} ),
  modalEdit:_.reduce(
    [ 
      "textField", "textArea", "number", "password", "checkbox", "selectBoxes", "select", "radio", "email", "url", "phoneNumber", "tags", "address", "dateTime", "day", "time", "currency", "survey", 
      //"signature", 
      "html", "content", 
      "columns", "fieldset", "panel", "table", "tabs", "well", //BUG: they are excluded from some tests of modalEdit setting (not discard changes, not)
      "hidden", "container", "dataMap", "dataGrid", "editGrid", "tree", "file"
    ],
    (obj, componentKey) => {
      obj[componentKey] = true;
      return obj;
    },
    {}
  ),    
};



//["textField", "textArea", "number", "password", "checkbox", "selectBoxes", "select", "radio", "email", "url", "phoneNumber", "tags", "address", "dateTime", "day", "time", "currency", "survey", "signature", "html", "content", "columns", "fieldset", "panel", "table", "tabs", "well", "hidden", "container", "dataMap", "dataGrid", "editGrid", "tree", "file", "submit"]
// {
//   textField: 'test-custom__css_class',
//   textArea: 'test-custom__css_class',
//   number: 'test-custom__css_class',
//   password: 'test-custom__css_class',
//   checkbox: 'test-custom__css_class',
//   selectBoxes: 'test-custom__css_class',
//   select: 'test-custom__css_class',
//   radio: 'test-custom__css_class',
//   email: 'test-custom__css_class',
//   url: 'test-custom__css_class',
//   phoneNumber: 'test-custom__css_class',
//   tags: 'test-custom__css_class',
//   address: 'test-custom__css_class',
//   dateTime: 'test-custom__css_class',
//   day: 'test-custom__css_class',
//   time: 'test-custom__css_class',
//   currency: 'test-custom__css_class',
//   survey: 'test-custom__css_class',
//   signature: 'test-custom__css_class',
//   html: 'test-custom__css_class',
//   content: 'test-custom__css_class',
//   columns: 'test-custom__css_class',
//   fieldset: 'test-custom__css_class',
//   panel: 'test-custom__css_class',
//   table: 'test-custom__css_class',
//   tabs: 'test-custom__css_class',
//   well: 'test-custom__css_class',
//   hidden: 'test-custom__css_class',
//   container: 'test-custom__css_class',
//   dataMap: 'test-custom__css_class',
//   dataGrid: 'test-custom__css_class',
//   editGrid: 'test-custom__css_class',
//   tree: 'test-custom__css_class',
//   file: 'test-custom__css_class',
//   submit: 'test-custom__css_class',
// }

