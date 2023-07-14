declare namespace _default {
    const type: string;
    const components: {
        title: string;
        label: string;
        type: string;
        key: string;
        components: (
            | {
                  label: string;
                  tableView: boolean;
                  rowDrafts: boolean;
                  key: string;
                  type: string;
                  input: boolean;
                  components: {
                      label: string;
                      tableView: boolean;
                      key: string;
                      type: string;
                      input: boolean;
                  }[];
                  breadcrumbClickable?: undefined;
                  buttonSettings?: undefined;
                  scrollToTop?: undefined;
                  collapsible?: undefined;
              }
            | {
                  breadcrumbClickable: boolean;
                  buttonSettings: {
                      previous: boolean;
                      cancel: boolean;
                      next: boolean;
                  };
                  scrollToTop: boolean;
                  collapsible: boolean;
                  key: string;
                  type: string;
                  label: string;
                  input: boolean;
                  tableView: boolean;
                  components: {
                      label: string;
                      reorder: boolean;
                      addAnotherPosition: string;
                      layoutFixed: boolean;
                      enableRowGroups: boolean;
                      initEmpty: boolean;
                      tableView: boolean;
                      defaultValue: {}[];
                      key: string;
                      type: string;
                      input: boolean;
                      components: {
                          label: string;
                          mask: boolean;
                          spellcheck: boolean;
                          tableView: boolean;
                          delimiter: boolean;
                          requireDecimal: boolean;
                          inputFormat: string;
                          key: string;
                          type: string;
                          input: boolean;
                      }[];
                  }[];
                  rowDrafts?: undefined;
              }
        )[];
        input: boolean;
        tableView: boolean;
    }[];
    const title: string;
    const display: string;
    const name: string;
    const path: string;
}
export default _default;
