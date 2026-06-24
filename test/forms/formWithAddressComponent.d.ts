declare namespace _default {
  export { form };
  export { submission };
}
export default _default;
declare namespace form {
  const type: string;
  const components: (
    | {
        label: string;
        reorder: boolean;
        addAnotherPosition: string;
        defaultOpen: boolean;
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
          provider: string;
          key: string;
          type: string;
          input: boolean;
          components: {
            label: string;
            tableView: boolean;
            key: string;
            type: string;
            input: boolean;
            customConditional: string;
          }[];
          providerOptions: {
            params: {
              key: string;
              region: string;
            };
          };
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
        addAnotherPosition?: undefined;
        defaultOpen?: undefined;
        layoutFixed?: undefined;
        enableRowGroups?: undefined;
        initEmpty?: undefined;
        defaultValue?: undefined;
        components?: undefined;
      }
  )[];
  const title: string;
  const display: string;
  const name: string;
  const path: string;
  const machineName: string;
}
declare namespace submission {
  const dataGrid: {
    address: {
      address_components: {
        long_name: string;
        short_name: string;
        types: string[];
      }[];
      formatted_address: string;
      geometry: {
        bounds: {
          northeast: {
            lat: number;
            lng: number;
          };
          southwest: {
            lat: number;
            lng: number;
          };
        };
        location: {
          lat: number;
          lng: number;
        };
        location_type: string;
        viewport: {
          northeast: {
            lat: number;
            lng: number;
          };
          southwest: {
            lat: number;
            lng: number;
          };
        };
      };
      place_id: string;
      types: string[];
    };
  }[];
}
