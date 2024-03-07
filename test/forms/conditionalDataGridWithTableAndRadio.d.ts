declare namespace _default {
    const type: string;
    const components: (
        | {
              label: string;
              reorder: boolean;
              addAnother: string;
              addAnotherPosition: string;
              defaultOpen: boolean;
              layoutFixed: boolean;
              enableRowGroups: boolean;
              initEmpty: boolean;
              hideLabel: boolean;
              tableView: boolean;
              defaultValue: {
                  compartment: string;
                  of: string;
                  weldComponentLocation: string;
                  examinationDateInitial: string;
                  initialExam: string;
              }[];
              key: string;
              customConditional: string;
              type: string;
              input: boolean;
              components: {
                  label: string;
                  hideLabel: boolean;
                  key: string;
                  type: string;
                  input: boolean;
                  tableView: boolean;
                  components: (
                      | {
                            label: string;
                            numRows: number;
                            cellAlignment: string;
                            key: string;
                            type: string;
                            input: boolean;
                            tableView: boolean;
                            rows: {
                                components: {
                                    label: string;
                                    optionsLabelPosition: string;
                                    inline: boolean;
                                    tableView: boolean;
                                    values: {
                                        label: string;
                                        value: string;
                                        shortcut: string;
                                    }[];
                                    validate: {
                                        required: boolean;
                                    };
                                    key: string;
                                    type: string;
                                    input: boolean;
                                }[];
                            }[][];
                            reorder?: undefined;
                            addAnother?: undefined;
                            addAnotherPosition?: undefined;
                            defaultOpen?: undefined;
                            layoutFixed?: undefined;
                            enableRowGroups?: undefined;
                            initEmpty?: undefined;
                            hideLabel?: undefined;
                            defaultValue?: undefined;
                            conditional?: undefined;
                            components?: undefined;
                        }
                      | {
                            label: string;
                            reorder: boolean;
                            addAnother: string;
                            addAnotherPosition: string;
                            defaultOpen: boolean;
                            layoutFixed: boolean;
                            enableRowGroups: boolean;
                            initEmpty: boolean;
                            hideLabel: boolean;
                            tableView: boolean;
                            defaultValue: {
                                weldComponentLocationRepair: string;
                                examinationDateRepair: string;
                                repairExam: string;
                            }[];
                            key: string;
                            conditional: {
                                show: boolean;
                                when: string;
                                eq: string;
                            };
                            type: string;
                            input: boolean;
                            components: {
                                label: string;
                                numRows: number;
                                cellAlignment: string;
                                key: string;
                                type: string;
                                input: boolean;
                                tableView: boolean;
                                rows: {
                                    components: {
                                        label: string;
                                        optionsLabelPosition: string;
                                        inline: boolean;
                                        tableView: boolean;
                                        values: {
                                            label: string;
                                            value: string;
                                            shortcut: string;
                                        }[];
                                        validate: {
                                            required: boolean;
                                        };
                                        key: string;
                                        type: string;
                                        input: boolean;
                                    }[];
                                }[][];
                            }[];
                            numRows?: undefined;
                            cellAlignment?: undefined;
                            rows?: undefined;
                        }
                  )[];
              }[];
              disableOnInvalid?: undefined;
          }
        | {
              type: string;
              label: string;
              key: string;
              disableOnInvalid: boolean;
              input: boolean;
              tableView: boolean;
              reorder?: undefined;
              addAnother?: undefined;
              addAnotherPosition?: undefined;
              defaultOpen?: undefined;
              layoutFixed?: undefined;
              enableRowGroups?: undefined;
              initEmpty?: undefined;
              hideLabel?: undefined;
              defaultValue?: undefined;
              components?: undefined;
          }
    )[];
    const title: string;
    const display: string;
}
export default _default;
