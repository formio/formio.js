declare var _default: {
    key: string;
    columns: {
        componnets: ({
            key: string;
            ignore: boolean;
            type?: undefined;
            label?: undefined;
            weight?: undefined;
            placeholder?: undefined;
            tooltip?: undefined;
            input?: undefined;
            customDefaultValue?: undefined;
        } | {
            type: string;
            label: string;
            key: string;
            weight: number;
            placeholder: string;
            tooltip: string;
            input: boolean;
            customDefaultValue: ({ instance }: {
                instance: any;
            }) => {
                mode: string;
                address: {};
            } | {
                mode?: undefined;
                address?: undefined;
            };
            ignore?: undefined;
        })[];
    }[];
}[];
export default _default;
