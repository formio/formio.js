declare namespace _default {
  const type: string;
  const components: (
    | {
        title: string;
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
        components: (
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
                tableView: boolean;
                validate: {
                  required: boolean;
                };
                key: string;
                type: string;
                input: boolean;
              }[];
              rowDrafts?: undefined;
            }
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
                data: {
                  values: {
                    label: string;
                    value: string;
                  }[];
                };
                selectThreshold: number;
                validate: {
                  onlyAvailableItems: boolean;
                };
                key: string;
                type: string;
                indexeddb: {
                  filter: {};
                };
                input: boolean;
              }[];
              breadcrumbClickable?: undefined;
              buttonSettings?: undefined;
              scrollToTop?: undefined;
              collapsible?: undefined;
            }
        )[];
        logic?: undefined;
        conditional?: undefined;
      }
    | {
        title: string;
        breadcrumbClickable: boolean;
        buttonSettings: {
          previous: boolean;
          cancel: boolean;
          next: boolean;
        };
        collapsible: boolean;
        key: string;
        logic: {
          name: string;
          trigger: {
            type: string;
            simple: {
              show: boolean;
              when: string;
              eq: string;
            };
          };
          actions: {
            name: string;
            type: string;
            property: {
              label: string;
              value: string;
              type: string;
            };
            state: boolean;
          }[];
        }[];
        type: string;
        label: string;
        components: (
          | {
              label: string;
              columns: (
                | {
                    components: {
                      label: string;
                      tableView: boolean;
                      validate: {
                        required: boolean;
                      };
                      key: string;
                      type: string;
                      input: boolean;
                      hideOnChildrenHidden: boolean;
                      defaultValue: boolean;
                    }[];
                    width: number;
                    offset: number;
                    push: number;
                    pull: number;
                    size: string;
                  }
                | {
                    components: {
                      label: string;
                      displayInTimezone: string;
                      format: string;
                      tableView: boolean;
                      enableMinDateInput: boolean;
                      datePicker: {
                        disableWeekends: boolean;
                        disableWeekdays: boolean;
                      };
                      enableMaxDateInput: boolean;
                      enableTime: boolean;
                      timePicker: {
                        showMeridian: boolean;
                      };
                      key: string;
                      type: string;
                      input: boolean;
                      widget: {
                        type: string;
                        displayInTimezone: string;
                        locale: string;
                        useLocaleSettings: boolean;
                        allowInput: boolean;
                        mode: string;
                        enableTime: boolean;
                        noCalendar: boolean;
                        format: string;
                        hourIncrement: number;
                        minuteIncrement: number;
                        time_24hr: boolean;
                        minDate: null;
                        disableWeekends: boolean;
                        disableWeekdays: boolean;
                        maxDate: null;
                      };
                      hideOnChildrenHidden: boolean;
                    }[];
                    width: number;
                    offset: number;
                    push: number;
                    pull: number;
                    size: string;
                  }
              )[];
              key: string;
              type: string;
              input: boolean;
              tableView: boolean;
              reorder?: undefined;
              addAnotherPosition?: undefined;
              layoutFixed?: undefined;
              enableRowGroups?: undefined;
              initEmpty?: undefined;
              defaultValue?: undefined;
              components?: undefined;
            }
          | {
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
                tableView: boolean;
                key: string;
                type: string;
                input: boolean;
              }[];
              columns?: undefined;
            }
        )[];
        input: boolean;
        tableView: boolean;
        scrollToTop?: undefined;
        conditional?: undefined;
      }
    | {
        title: string;
        breadcrumbClickable: boolean;
        buttonSettings: {
          previous: boolean;
          cancel: boolean;
          next: boolean;
        };
        scrollToTop: boolean;
        collapsible: boolean;
        key: string;
        conditional: {
          show: boolean;
          when: string;
          eq: string;
        };
        type: string;
        label: string;
        components: {
          label: string;
          key: string;
          type: string;
          input: boolean;
          tableView: boolean;
          components: {
            label: string;
            tableView: boolean;
            key: string;
            type: string;
            input: boolean;
          }[];
        }[];
        input: boolean;
        tableView: boolean;
        logic?: undefined;
      }
  )[];
  const title: string;
  const display: string;
}
export default _default;
