export const multiSelect = {
  type: 'select',
      label: 'Companies',
      key: 'companies',
      placeholder: 'Select a company',
      dataSrc: 'url',
      data: {
        url: 'https://example.form.io/company/submission?limit={{ limit }}&skip={{ skip }}'
      },
      valueProperty: 'data.name',
      searchField: 'data.name__regex',
      template: '<span>{{ item.data.name }}</span>',
      multiple: true,
      input: true
};

export const multiSelectOptions = [{
  '_id': '5c5f1901a590ab507db886b1',
  'owner': '553dbfc08d22d5cb1a7024f2',
  'roles': [],
  '_vid': 0,
  '_fvid': 0,
  'state': 'submitted',
  'data': {
    'name': 'Cheers',
    'email': 'cheers@example.com',
    'phoneNumber': '(982) 143-9839',
    'submit': true
  },
  'access': [],
  'form': '5b8c1017edc1a6c05601af8e',
  'externalIds': [],
  'created': '2019-02-09T18:16:33.636Z',
  'modified': '2019-02-09T18:16:33.637Z',
  'project': '58b78b87f5609a0070f3f456'
}, {
  '_id': '5c5f18f1a590ab874fb886b0',
  'owner': '553dbfc08d22d5cb1a7024f2',
  'roles': [],
  '_vid': 0,
  '_fvid': 0,
  'state': 'submitted',
  'data': {
    'name': 'Cyberdyne Systems',
    'email': 'cyberdyne@example.com',
    'phoneNumber': '(982) 382-9039',
    'submit': true
  },
  'access': [],
  'form': '5b8c1017edc1a6c05601af8e',
  'externalIds': [],
  'created': '2019-02-09T18:16:17.956Z',
  'modified': '2019-02-09T18:16:17.956Z',
  'project': '58b78b87f5609a0070f3f456'
}, {
  '_id': '5c5f18e1d809c48f4abd1496',
  'owner': '553dbfc08d22d5cb1a7024f2',
  'roles': [],
  '_vid': 0,
  '_fvid': 0,
  'state': 'submitted',
  'data': {
    'name': 'Wayne Enterprises',
    'email': 'we@example.com',
    'phoneNumber': '(982) 338-9432',
    'submit': true
  },
  'access': [],
  'form': '5b8c1017edc1a6c05601af8e',
  'externalIds': [],
  'created': '2019-02-09T18:16:01.388Z',
  'modified': '2019-02-09T18:16:01.389Z',
  'project': '58b78b87f5609a0070f3f456'
}, {
  '_id': '5c5f18d1a590ab5693b886ae',
  'owner': '553dbfc08d22d5cb1a7024f2',
  'roles': [],
  '_vid': 0,
  '_fvid': 0,
  'state': 'submitted',
  'data': {
    'name': 'Gekko & Co',
    'email': 'gekko@example.com',
    'phoneNumber': '(982) 982-3989',
    'submit': true
  },
  'access': [],
  'form': '5b8c1017edc1a6c05601af8e',
  'externalIds': [],
  'created': '2019-02-09T18:15:45.716Z',
  'modified': '2019-02-09T18:15:45.716Z',
  'project': '58b78b87f5609a0070f3f456'
}, {
  '_id': '5c5f18c4ce9978f8e6ab91fe',
  'owner': '553dbfc08d22d5cb1a7024f2',
  'roles': [],
  '_vid': 0,
  '_fvid': 0,
  'state': 'submitted',
  'data': {
    'name': 'Ollivander`s Wand Shop',
    'email': 'ows@example.com',
    'phoneNumber': '(987) 190-2398',
    'submit': true
  },
  'access': [],
  'form': '5b8c1017edc1a6c05601af8e',
  'externalIds': [],
  'created': '2019-02-09T18:15:32.390Z',
  'modified': '2019-02-09T18:15:32.391Z',
  'project': '58b78b87f5609a0070f3f456'
}, {
  '_id': '5c5f18b5c6782092f6379b43',
  'owner': '553dbfc08d22d5cb1a7024f2',
  'roles': [],
  '_vid': 0,
  '_fvid': 0,
  'state': 'submitted',
  'data': {
    'name': 'Stark Industries',
    'email': 'stark@example.com',
    'phoneNumber': '(897) 239-8723',
    'submit': true
  },
  'access': [],
  'form': '5b8c1017edc1a6c05601af8e',
  'externalIds': [],
  'created': '2019-02-09T18:15:17.861Z',
  'modified': '2019-02-09T18:15:17.863Z',
  'project': '58b78b87f5609a0070f3f456'
}, {
  '_id': '5c5f189ea590ab5c90b886aa',
  'owner': '553dbfc08d22d5cb1a7024f2',
  'roles': [],
  '_vid': 0,
  '_fvid': 0,
  'state': 'submitted',
  'data': {
    'name': 'Massive Dynamic',
    'email': 'md@example.com',
    'phoneNumber': '(872) 939-8439',
    'submit': true
  },
  'access': [],
  'form': '5b8c1017edc1a6c05601af8e',
  'externalIds': [],
  'created': '2019-02-09T18:14:54.203Z',
  'modified': '2019-02-09T18:14:54.204Z',
  'project': '58b78b87f5609a0070f3f456'
}, {
  '_id': '5c5f188ece997855cfab91fb',
  'owner': '553dbfc08d22d5cb1a7024f2',
  'roles': [],
  '_vid': 0,
  '_fvid': 0,
  'state': 'submitted',
  'data': {
    'name': 'Vehement Capital Partners',
    'email': 'Vehement@example.com',
    'phoneNumber': '(982) 720-9289',
    'submit': true
  },
  'access': [],
  'form': '5b8c1017edc1a6c05601af8e',
  'externalIds': [],
  'created': '2019-02-09T18:14:38.059Z',
  'modified': '2019-02-09T18:14:38.060Z',
  'project': '58b78b87f5609a0070f3f456'
}, {
  '_id': '5c5f187b9163aee074c7da29',
  'owner': '553dbfc08d22d5cb1a7024f2',
  'roles': [],
  '_vid': 0,
  '_fvid': 0,
  'state': 'submitted',
  'data': {
    'name': 'Hooli',
    'email': 'Hooli@example.com',
    'phoneNumber': '(987) 239-8239',
    'submit': true
  },
  'access': [],
  'form': '5b8c1017edc1a6c05601af8e',
  'externalIds': [],
  'created': '2019-02-09T18:14:19.714Z',
  'modified': '2019-02-09T18:14:19.714Z',
  'project': '58b78b87f5609a0070f3f456'
}, {
  '_id': '5c5f186dce9978dc6cab91f8',
  'owner': '553dbfc08d22d5cb1a7024f2',
  'roles': [],
  '_vid': 0,
  '_fvid': 0,
  'state': 'submitted',
  'data': {
    'name': 'Umbrella Corporation',
    'email': 'umbrella@example.com',
    'phoneNumber': '(982) 782-3762',
    'submit': true
  },
  'access': [],
  'form': '5b8c1017edc1a6c05601af8e',
  'externalIds': [],
  'created': '2019-02-09T18:14:05.353Z',
  'modified': '2019-02-09T18:14:05.354Z',
  'project': '58b78b87f5609a0070f3f456'
}];

