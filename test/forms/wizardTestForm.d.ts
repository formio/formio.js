declare namespace _default {
  export { form };
  export { submission };
  export { htmlModeValues };
}
export default _default;
declare namespace form {
  const type: string;
  const components: (
    | {
        title: string;
        label: string;
        type: string;
        key: string;
        input: boolean;
        tableView: boolean;
        components: (
          | {
              label: string;
              tableView: boolean;
              key: string;
              type: string;
              input: boolean;
              breadcrumbClickable?: undefined;
              buttonSettings?: undefined;
              scrollToTop?: undefined;
              collapsible?: undefined;
              components?: undefined;
              rowDrafts?: undefined;
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
      }
    | {
        title: string;
        label: string;
        type: string;
        key: string;
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
      }
    | {
        title: string;
        label: string;
        type: string;
        key: string;
        components: (
          | {
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
            }
          | {
              label: string;
              tableView: boolean;
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
                  required: boolean;
                  onlyAvailableItems: boolean;
                };
                key: string;
                type: string;
                indexeddb: {
                  filter: {};
                };
                input: boolean;
              }[];
            }
        )[];
        input: boolean;
        tableView: boolean;
      }
  )[];
  const revisions: string;
  const _vid: number;
  const title: string;
  const display: string;
  const name: string;
  const path: string;
}
declare namespace submission {
  const _id: string;
  const state: string;
  namespace data {
    const tags: string;
    const textField: string;
    const editGrid: {
      select: string;
    }[];
    const checkbox: boolean;
    const dateTime: string;
    const dataGrid: {
      textField1: string;
    }[];
    const email: string;
    namespace container {
      const select: string;
    }
  }
}
declare namespace htmlModeValues {
  const tags_1: string;
  export { tags_1 as tags };
  const textField_1: string;
  export { textField_1 as textField };
  const editGrid_1: {
    select: string;
  }[];
  export { editGrid_1 as editGrid };
  const checkbox_1: string;
  export { checkbox_1 as checkbox };
  const dateTime_1: string;
  export { dateTime_1 as dateTime };
  const dataGrid_1: {
    textField1: string;
  }[];
  export { dataGrid_1 as dataGrid };
  const email_1: string;
  export { email_1 as email };
  export namespace container_1 {
    const select_1: string;
    export { select_1 as select };
  }
  export { container_1 as container };
}
