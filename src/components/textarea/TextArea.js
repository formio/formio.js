/* globals Quill */
import {TextFieldComponent} from '../textfield/TextField';
import {BaseComponent} from '../base/Base';

export class TextAreaComponent extends TextFieldComponent {
  constructor(component, options, data) {
    super(component, options, data);

    // Never submit on enter for text areas.
    this.options.submitOnEnter = false;
  }

  wysiwygDefault() {
    return {
      theme: 'snow',
      placeholder: this.component.placeholder,
      modules: {
        toolbar: [
          [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
          [{'header': [1, 2, 3, 4, 5, 6, false]}],
          [{'font': []}],
          ['bold', 'italic', 'underline', 'strike', {'script': 'sub'}, {'script': 'super'}, 'clean'],
          [{'color': []}, {'background': []}],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}, {'align': []}],
          ['blockquote', 'code-block'],
          ['link', 'image', 'video', 'formula', 'source']
        ]
      }
    };
  }

  createInput(container) {
    if (!this.component.wysiwyg) {
      return super.createInput(container);
    }

    // Normalize the configurations.
    if (this.component.wysiwyg.toolbarGroups) {
      console.warn('The WYSIWYG settings are configured for CKEditor. For this renderer, you will need to use configurations for the Quill Editor. See https://quilljs.com/docs/configuration for more information.');
      this.component.wysiwyg = this.wysiwygDefault();
    }
    if (typeof this.component.wysiwyg === 'boolean') {
      this.component.wysiwyg = this.wysiwygDefault();
    }

    // Add the input.
    this.input = this.ce('div', {
      class: 'formio-wysiwyg-editor'
    });
    container.appendChild(this.input);

    // Lazy load the quill css.
    BaseComponent.requireLibrary(`quill-css-${this.component.wysiwyg.theme}`, 'Quill', [
      {type: 'styles', src: `https://cdn.quilljs.com/1.3.5/quill.${this.component.wysiwyg.theme}.css`}
    ], true);

    // Lazy load the quill library.
    this.quillReady = BaseComponent.requireLibrary('quill', 'Quill', 'https://cdn.quilljs.com/1.3.5/quill.min.js', true)
      .then(() => {
        this.quill = new Quill(this.input, this.component.wysiwyg);
        this.quill.root.spellcheck = this.component.spellcheck;

        /** This block of code adds the [source] capabilities.  See https://codepen.io/anon/pen/ZyEjrQ **/
        const txtArea = document.createElement('textarea');
        txtArea.setAttribute('class', 'quill-source-code');
        this.quill.addContainer('ql-custom').appendChild(txtArea);

        // Allows users to skip toolbar items when tabbing though form
        const elm = document.querySelectorAll('.ql-formats > button');
        for (let i=0; i < elm.length; i++) {
          elm[i].setAttribute('tabindex', '-1');
        }

        const qlSource = document.querySelector('.ql-source');
        if (qlSource) {
          qlSource.addEventListener('click', () => {
            if (txtArea.style.display === 'inherit') {
              this.quill.clipboard.dangerouslyPasteHTML(txtArea.value);
            }
            txtArea.style.display = (txtArea.style.display === 'none') ? 'inherit' : 'none';
          });
        }
        /** END CODEBLOCK **/

        this.quill.on('text-change', () => {
          txtArea.value = this.quill.root.innerHTML;
          this.updateValue(true);
        });

        if (this.options.readOnly || this.component.disabled) {
          this.quill.disable();
        }

        return this.quill;
      });

    return this.input;
  }

  isEmpty(value) {
    if (this.quill) {
      return (!value || (value === '<p><br></p>'));
    }
    else {
      return super.isEmpty(value);
    }
  }

  get defaultValue() {
    let defaultValue = super.defaultValue;
    if (this.component.wysiwyg && !defaultValue) {
      defaultValue = '<p><br></p>';
    }
    return defaultValue;
  }

  setValue(value, flags) {
    if (!this.component.wysiwyg) {
      return super.setValue(value, flags);
    }

    this.quillReady.then((quill) => {
      quill.clipboard.dangerouslyPasteHTML(value);
      this.updateValue(flags);
    });
  }

  getValue() {
    if (this.viewOnly) {
      return this.dataValue;
    }
    return this.quill ? this.quill.root.innerHTML : super.getValue();
  }

  elementInfo() {
    const info = super.elementInfo();
    info.type = 'textarea';
    if (this.component.rows) {
      info.attr.rows = this.component.rows;
    }
    return info;
  }
}
