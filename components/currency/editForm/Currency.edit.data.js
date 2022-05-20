"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = [{
  type: 'select',
  input: true,
  weight: 50,
  key: 'currency',
  label: 'Currency',
  tooltip: 'The currency to use in currency formatting. Possible values are (ISO-4217) currency codes.',
  defaultValue: 'USD',
  dataSrc: 'values',
  data: {
    values: [{
      label: 'US Dollar (USD)',
      value: 'USD'
    }, {
      label: 'Euro (EUR)',
      value: 'EUR'
    }, {
      label: 'Pound Sterling (GBP)',
      value: 'GBP'
    }, {
      label: 'Australian Dollar (AUD)',
      value: 'AUD'
    }, {
      label: 'Afghani (AFN)',
      value: 'AFN'
    }, {
      label: 'Lek (ALL)',
      value: 'ALL'
    }, {
      label: 'Algerian Dinar (DZD)',
      value: 'DZD'
    }, {
      label: 'Kwanza (AOA)',
      value: 'AOA'
    }, {
      label: 'East Caribbean Dollar (XCD)',
      value: 'XCD'
    }, {
      label: 'Argentine Peso (ARS)',
      value: 'ARS'
    }, {
      label: 'Armenian Dram (AMD)',
      value: 'AMD'
    }, {
      label: 'Aruban Florin (AWG)',
      value: 'AWG'
    }, {
      label: 'Azerbaijan Manat (AZN)',
      value: 'AZN'
    }, {
      label: 'Bahamian Dollar (BSD)',
      value: 'BSD'
    }, {
      label: 'Bahraini Dinar (BHD)',
      value: 'BHD'
    }, {
      label: 'Taka (BDT)',
      value: 'BDT'
    }, {
      label: 'Barbados Dollar (BBD)',
      value: 'BBD'
    }, {
      label: 'Belarusian Ruble (BYN)',
      value: 'BYN'
    }, {
      label: 'Belize Dollar (BZD)',
      value: 'BZD'
    }, {
      label: 'CFA Franc BCEAO (XOF)',
      value: 'XOF'
    }, {
      label: 'Bermudian Dollar (BMD)',
      value: 'BMD'
    }, {
      label: 'Indian Rupee (INR)',
      value: 'INR'
    }, {
      label: 'Ngultrum (BTN)',
      value: 'BTN'
    }, {
      label: 'Boliviano (BOB)',
      value: 'BOB'
    }, {
      label: 'Mvdol (BOV)',
      value: 'BOV'
    }, {
      label: 'Convertible Mark (BAM)',
      value: 'BAM'
    }, {
      label: 'Pula (BWP)',
      value: 'BWP'
    }, {
      label: 'Norwegian Krone (NOK)',
      value: 'NOK'
    }, {
      label: 'Brazilian Real (BRL)',
      value: 'BRL'
    }, {
      label: 'Brunei Dollar (BND)',
      value: 'BND'
    }, {
      label: 'Bulgarian Lev (BGN)',
      value: 'BGN'
    }, {
      label: 'Burundi Franc (BIF)',
      value: 'BIF'
    }, {
      label: 'Cabo Verde Escudo (CVE)',
      value: 'CVE'
    }, {
      label: 'Riel (KHR)',
      value: 'KHR'
    }, {
      label: 'CFA Franc BEAC (XAF)',
      value: 'XAF'
    }, {
      label: 'Canadian Dollar (CAD)',
      value: 'CAD'
    }, {
      label: 'Cayman Islands Dollar (KYD)',
      value: 'KYD'
    }, {
      label: 'Chilean Peso (CLP)',
      value: 'CLP'
    }, {
      label: 'Unidad de Fomento (CLF)',
      value: 'CLF'
    }, {
      label: 'Yuan Renminbi (CNY)',
      value: 'CNY'
    }, {
      label: 'Colombian Peso (COP)',
      value: 'COP'
    }, {
      label: 'Unidad de Valor Real (COU)',
      value: 'COU'
    }, {
      label: 'Comorian Franc (KMF)',
      value: 'KMF'
    }, {
      label: 'Congolese Franc (CDF)',
      value: 'CDF'
    }, {
      label: 'New Zealand Dollar (NZD)',
      value: 'NZD'
    }, {
      label: 'Costa Rican Colon (CRC)',
      value: 'CRC'
    }, {
      label: 'Kuna (HRK)',
      value: 'HRK'
    }, {
      label: 'Cuban Peso (CUP)',
      value: 'CUP'
    }, {
      label: 'Peso Convertible (CUC)',
      value: 'CUC'
    }, {
      label: 'Netherlands Antillean Guilder (ANG)',
      value: 'ANG'
    }, {
      label: 'Czech Koruna (CZK)',
      value: 'CZK'
    }, {
      label: 'Danish Krone (DKK)',
      value: 'DKK'
    }, {
      label: 'Djibouti Franc (DJF)',
      value: 'DJF'
    }, {
      label: 'Dominican Peso (DOP)',
      value: 'DOP'
    }, {
      label: 'Egyptian Pound (EGP)',
      value: 'EGP'
    }, {
      label: 'El Salvador Colon (SVC)',
      value: 'SVC'
    }, {
      label: 'Nakfa (ERN)',
      value: 'ERN'
    }, {
      label: 'Ethiopian Birr (ETB)',
      value: 'ETB'
    }, {
      label: 'Falkland Islands Pound (FKP)',
      value: 'FKP'
    }, {
      label: 'Fiji Dollar (FJD)',
      value: 'FJD'
    }, {
      label: 'CFP Franc (XPF)',
      value: 'XPF'
    }, {
      label: 'Dalasi (GMD)',
      value: 'GMD'
    }, {
      label: 'Lari (GEL)',
      value: 'GEL'
    }, {
      label: 'Ghana Cedi (GHS)',
      value: 'GHS'
    }, {
      label: 'Gibraltar Pound (GIP)',
      value: 'GIP'
    }, {
      label: 'Quetzal (GTQ)',
      value: 'GTQ'
    }, {
      label: 'Guinean Franc (GNF)',
      value: 'GNF'
    }, {
      label: 'Guyana Dollar (GYD)',
      value: 'GYD'
    }, {
      label: 'Gourde (HTG)',
      value: 'HTG'
    }, {
      label: 'Lempira (HNL)',
      value: 'HNL'
    }, {
      label: 'Hong Kong Dollar (HKD)',
      value: 'HKD'
    }, {
      label: 'Forint (HUF)',
      value: 'HUF'
    }, {
      label: 'Iceland Krona (ISK)',
      value: 'ISK'
    }, {
      label: 'Indian Rupee (INR)',
      value: 'INR'
    }, {
      label: 'Rupiah (IDR)',
      value: 'IDR'
    }, {
      label: 'SDR (Special Drawing Right) (XDR)',
      value: 'XDR'
    }, {
      label: 'Iranian Rial (IRR)',
      value: 'IRR'
    }, {
      label: 'Iraqi Dinar (IQD)',
      value: 'IQD'
    }, {
      label: 'New Israeli Sheqel (ILS)',
      value: 'ILS'
    }, {
      label: 'Jamaican Dollar (JMD)',
      value: 'JMD'
    }, {
      label: 'Yen (JPY)',
      value: 'JPY'
    }, {
      label: 'Jordanian Dinar (JOD)',
      value: 'JOD'
    }, {
      label: 'Tenge (KZT)',
      value: 'KZT'
    }, {
      label: 'Kenyan Shilling (KES)',
      value: 'KES'
    }, {
      label: 'North Korean Won (KPW)',
      value: 'KPW'
    }, {
      label: 'Won (KRW)',
      value: 'KRW'
    }, {
      label: 'Kuwaiti Dinar (KWD)',
      value: 'KWD'
    }, {
      label: 'Som (KGS)',
      value: 'KGS'
    }, {
      label: 'Lao Kip (LAK)',
      value: 'LAK'
    }, {
      label: 'Lebanese Pound (LBP)',
      value: 'LBP'
    }, {
      label: 'Loti (LSL)',
      value: 'LSL'
    }, {
      label: 'Rand (ZAR)',
      value: 'ZAR'
    }, {
      label: 'Liberian Dollar (LRD)',
      value: 'LRD'
    }, {
      label: 'Libyan Dinar (LYD)',
      value: 'LYD'
    }, {
      label: 'Swiss Franc (CHF)',
      value: 'CHF'
    }, {
      label: 'Pataca (MOP)',
      value: 'MOP'
    }, {
      label: 'Denar (MKD)',
      value: 'MKD'
    }, {
      label: 'Malagasy Ariary (MGA)',
      value: 'MGA'
    }, {
      label: 'Malawi Kwacha (MWK)',
      value: 'MWK'
    }, {
      label: 'Malaysian Ringgit (MYR)',
      value: 'MYR'
    }, {
      label: 'Rufiyaa (MVR)',
      value: 'MVR'
    }, {
      label: 'Ouguiya (MRU)',
      value: 'MRU'
    }, {
      label: 'Mauritius Rupee (MUR)',
      value: 'MUR'
    }, {
      label: 'ADB Unit of Account (XUA)',
      value: 'XUA'
    }, {
      label: 'Mexican Peso (MXN)',
      value: 'MXN'
    }, {
      label: 'Mexican Unidad de Inversion (UDI) (MXV)',
      value: 'MXV'
    }, {
      label: 'Moldovan Leu (MDL)',
      value: 'MDL'
    }, {
      label: 'Tugrik (MNT)',
      value: 'MNT'
    }, {
      label: 'Moroccan Dirham (MAD)',
      value: 'MAD'
    }, {
      label: 'Mozambique Metical (MZN)',
      value: 'MZN'
    }, {
      label: 'Kyat (MMK)',
      value: 'MMK'
    }, {
      label: 'Namibia Dollar (NAD)',
      value: 'NAD'
    }, {
      label: 'Nepalese Rupee (NPR)',
      value: 'NPR'
    }, {
      label: 'Cordoba Oro (NIO)',
      value: 'NIO'
    }, {
      label: 'Naira (NGN)',
      value: 'NGN'
    }, {
      label: 'Rial Omani (OMR)',
      value: 'OMR'
    }, {
      label: 'Pakistan Rupee (PKR)',
      value: 'PKR'
    }, {
      label: 'Balboa (PAB)',
      value: 'PAB'
    }, {
      label: 'Kina (PGK)',
      value: 'PGK'
    }, {
      label: 'Guarani (PYG)',
      value: 'PYG'
    }, {
      label: 'Sol (PEN)',
      value: 'PEN'
    }, {
      label: 'Philippine Peso (PHP)',
      value: 'PHP'
    }, {
      label: 'Zloty (PLN)',
      value: 'PLN'
    }, {
      label: 'Qatari Rial (QAR)',
      value: 'QAR'
    }, {
      label: 'Romanian Leu (RON)',
      value: 'RON'
    }, {
      label: 'Russian Ruble (RUB)',
      value: 'RUB'
    }, {
      label: 'Rwanda Franc (RWF)',
      value: 'RWF'
    }, {
      label: 'Saint Helena Pound (SHP)',
      value: 'SHP'
    }, {
      label: 'Tala (WST)',
      value: 'WST'
    }, {
      label: 'Dobra (STN)',
      value: 'STN'
    }, {
      label: 'Saudi Riyal (SAR)',
      value: 'SAR'
    }, {
      label: 'Serbian Dinar (RSD)',
      value: 'RSD'
    }, {
      label: 'Seychelles Rupee (SCR)',
      value: 'SCR'
    }, {
      label: 'Leone (SLL)',
      value: 'SLL'
    }, {
      label: 'Singapore Dollar (SGD)',
      value: 'SGD'
    }, {
      label: 'Sucre (XSU)',
      value: 'XSU'
    }, {
      label: 'Solomon Islands Dollar (SBD)',
      value: 'SBD'
    }, {
      label: 'Somali Shilling (SOS)',
      value: 'SOS'
    }, {
      label: 'South Sudanese Pound (SSP)',
      value: 'SSP'
    }, {
      label: 'Sri Lanka Rupee (LKR)',
      value: 'LKR'
    }, {
      label: 'Sudanese Pound (SDG)',
      value: 'SDG'
    }, {
      label: 'Surinam Dollar (SRD)',
      value: 'SRD'
    }, {
      label: 'Lilangeni (SZL)',
      value: 'SZL'
    }, {
      label: 'Swedish Krona (SEK)',
      value: 'SEK'
    }, {
      label: 'WIR Euro (CHE)',
      value: 'CHE'
    }, {
      label: 'WIR Franc (CHW)',
      value: 'CHW'
    }, {
      label: 'Syrian Pound (SYP)',
      value: 'SYP'
    }, {
      label: 'New Taiwan Dollar (TWD)',
      value: 'TWD'
    }, {
      label: 'Somoni (TJS)',
      value: 'TJS'
    }, {
      label: 'Tanzanian Shilling (TZS)',
      value: 'TZS'
    }, {
      label: 'Baht (THB)',
      value: 'THB'
    }, {
      label: 'Pa’anga (TOP)',
      value: 'TOP'
    }, {
      label: 'Trinidad and Tobago Dollar (TTD)',
      value: 'TTD'
    }, {
      label: 'Tunisian Dinar (TND)',
      value: 'TND'
    }, {
      label: 'Turkish Lira (TRY)',
      value: 'TRY'
    }, {
      label: 'Turkmenistan New Manat (TMT)',
      value: 'TMT'
    }, {
      label: 'Uganda Shilling (UGX)',
      value: 'UGX'
    }, {
      label: 'Hryvnia (UAH)',
      value: 'UAH'
    }, {
      label: 'UAE Dirham (AED)',
      value: 'AED'
    }, {
      label: 'US Dollar (Next day) (USN)',
      value: 'USN'
    }, {
      label: 'Peso Uruguayo (UYU)',
      value: 'UYU'
    }, {
      label: 'Uruguay Peso en Unidades Indexadas (UYI)',
      value: 'UYI'
    }, {
      label: 'Unidad Previsional (UYW)',
      value: 'UYW'
    }, {
      label: 'Uzbekistan Sum (UZS)',
      value: 'UZS'
    }, {
      label: 'Vatu (VUV)',
      value: 'VUV'
    }, {
      label: 'Bolívar Soberano (VES)',
      value: 'VES'
    }, {
      label: 'Dong (VND)',
      value: 'VND'
    }, {
      label: 'Yemeni Rial (YER)',
      value: 'YER'
    }, {
      label: 'Zambian Kwacha (ZMW)',
      value: 'ZMW'
    }, {
      label: 'Zimbabwe Dollar (ZWL),',
      value: 'ZWL'
    }]
  }
}];
exports.default = _default;