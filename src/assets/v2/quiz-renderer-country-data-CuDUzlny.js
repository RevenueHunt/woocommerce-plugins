const countryData = [
  {
    name: "Afghanistan",
    prefix: "+93",
    code: "AF",
    flag: "🇦🇫"
  },
  {
    name: "Albania",
    prefix: "+355",
    code: "AL",
    flag: "🇦🇱"
  },
  {
    name: "Algeria",
    prefix: "+213",
    code: "DZ",
    flag: "🇩🇿"
  },
  {
    name: "Andorra",
    prefix: "+376",
    code: "AD",
    flag: "🇦🇩"
  },
  {
    name: "Angola",
    prefix: "+244",
    code: "AO",
    flag: "🇦🇴"
  },
  {
    name: "Antarctica",
    prefix: "+672",
    code: "AQ",
    flag: "🇦🇶"
  },
  {
    name: "Argentina",
    prefix: "+54",
    code: "AR",
    flag: "🇦🇷"
  },
  {
    name: "Armenia",
    prefix: "+374",
    code: "AM",
    flag: "🇦🇲"
  },
  {
    name: "Aruba",
    prefix: "+297",
    code: "AW",
    flag: "🇦🇼"
  },
  {
    name: "Australia",
    prefix: "+61",
    code: "AU",
    flag: "🇦🇺"
  },
  {
    name: "Austria",
    prefix: "+43",
    code: "AT",
    flag: "🇦🇹"
  },
  {
    name: "Azerbaijan",
    prefix: "+994",
    code: "AZ",
    flag: "🇦🇿"
  },
  {
    name: "Bahrain",
    prefix: "+973",
    code: "BH",
    flag: "🇧🇭"
  },
  {
    name: "Bahamas",
    prefix: "+1242",
    code: "BS",
    flag: "🇧🇸"
  },
  {
    name: "Barbados",
    prefix: "+1246",
    code: "BB",
    flag: "🇧🇧"
  },
  {
    name: "Bangladesh",
    prefix: "+880",
    code: "BD",
    flag: "🇧🇩"
  },
  {
    name: "Belarus",
    prefix: "+375",
    code: "BY",
    flag: "🇧🇾"
  },
  {
    name: "Belgium",
    prefix: "+32",
    code: "BE",
    flag: "🇧🇪"
  },
  {
    name: "Belize",
    prefix: "+501",
    code: "BZ",
    flag: "🇧🇿"
  },
  {
    name: "Benin",
    prefix: "+229",
    code: "BJ",
    flag: "🇧🇯"
  },
  {
    name: "Bhutan",
    prefix: "+975",
    code: "BT",
    flag: "🇧🇹"
  },
  {
    name: "Bolivia, Plurinational State of",
    prefix: "+591",
    code: "BO",
    flag: "🇧🇴"
  },
  {
    name: "Bosnia and Herzegovina",
    prefix: "+387",
    code: "BA",
    flag: "🇧🇦"
  },
  {
    name: "Botswana",
    prefix: "+267",
    code: "BW",
    flag: "🇧🇼"
  },
  {
    name: "Brazil",
    prefix: "+55",
    code: "BR",
    flag: "🇧🇷"
  },
  {
    name: "British Indian Ocean Territory",
    prefix: "+246",
    code: "IO",
    flag: "🇮🇴"
  },
  {
    name: "Brunei Darussalam",
    prefix: "+673",
    code: "BN",
    flag: "🇧🇳"
  },
  {
    name: "Bulgaria",
    prefix: "+359",
    code: "BG",
    flag: "🇧🇬"
  },
  {
    name: "Burkina Faso",
    prefix: "+226",
    code: "BF",
    flag: "🇧🇫"
  },
  {
    name: "Burundi",
    prefix: "+257",
    code: "BI",
    flag: "🇧🇮"
  },
  {
    name: "Cambodia",
    prefix: "+855",
    code: "KH",
    flag: "🇰🇭"
  },
  {
    name: "Canada",
    prefix: "+1",
    code: "CA",
    flag: "🇨🇦"
  },
  {
    name: "Cameroon",
    prefix: "+237",
    code: "CM",
    flag: "🇨🇲"
  },
  {
    name: "Cape Verde",
    prefix: "+238",
    code: "CV",
    flag: "🇨🇻"
  },
  {
    name: "Cayman Islands",
    prefix: "+ 345",
    code: "KY",
    flag: "🇰🇾"
  },
  {
    name: "Central African Republic",
    prefix: "+236",
    code: "CF",
    flag: "🇨🇫"
  },
  {
    name: "Chad",
    prefix: "+235",
    code: "TD",
    flag: "🇹🇩"
  },
  {
    name: "Chile",
    prefix: "+56",
    code: "CL",
    flag: "🇨🇱"
  },
  {
    name: "China",
    prefix: "+86",
    code: "CN",
    flag: "🇨🇳"
  },
  {
    name: "Colombia",
    prefix: "+57",
    code: "CO",
    flag: "🇨🇴"
  },
  {
    name: "Comoros",
    prefix: "+269",
    code: "KM",
    flag: "🇰🇲"
  },
  {
    name: "Congo",
    prefix: "+242",
    code: "CG",
    flag: "🇨🇬"
  },
  {
    name: "Congo, The Democratic Republic of the Congo",
    prefix: "+243",
    code: "CD",
    flag: "🇨🇩"
  },
  {
    name: "Cook Islands",
    prefix: "+682",
    code: "CK",
    flag: "🇨🇰"
  },
  {
    name: "Costa Rica",
    prefix: "+506",
    code: "CR",
    flag: "🇨🇷"
  },
  {
    name: "Cote d'Ivoire",
    prefix: "+225",
    code: "CI",
    flag: "🇨🇮"
  },
  {
    name: "Croatia",
    prefix: "+385",
    code: "HR",
    flag: "🇭🇷"
  },
  {
    name: "Cuba",
    prefix: "+53",
    code: "CU",
    flag: "🇨🇺"
  },
  {
    name: "Cyprus",
    prefix: "+357",
    code: "CY",
    flag: "🇨🇾"
  },
  {
    name: "Czech Republic",
    prefix: "+420",
    code: "CZ",
    flag: "🇨🇿"
  },
  {
    name: "Denmark",
    prefix: "+45",
    code: "DK",
    flag: "🇩🇰"
  },
  {
    name: "Dominica",
    prefix: "+1767",
    code: "DM",
    flag: "🇩🇲"
  },
  {
    name: "Dominican Republic",
    prefix: "+1809",
    code: "DO",
    flag: "🇩🇴"
  },
  {
    name: "Djibouti",
    prefix: "+253",
    code: "DJ",
    flag: "🇩🇯"
  },
  {
    name: "Ecuador",
    prefix: "+593",
    code: "EC",
    flag: "🇪🇨"
  },
  {
    name: "Egypt",
    prefix: "+20",
    code: "EG",
    flag: "🇪🇬"
  },
  {
    name: "El Salvador",
    prefix: "+503",
    code: "SV",
    flag: "🇸🇻"
  },
  {
    name: "Equatorial Guinea",
    prefix: "+240",
    code: "GQ",
    flag: "🇬🇶"
  },
  {
    name: "Eritrea",
    prefix: "+291",
    code: "ER",
    flag: "🇪🇷"
  },
  {
    name: "Estonia",
    prefix: "+372",
    code: "EE",
    flag: "🇪🇪"
  },
  {
    name: "Ethiopia",
    prefix: "+251",
    code: "ET",
    flag: "🇪🇹"
  },
  {
    name: "Falkland Islands (Malvinas)",
    prefix: "+500",
    code: "FK",
    flag: "🇫🇰"
  },
  {
    name: "Faroe Islands",
    prefix: "+298",
    code: "FO",
    flag: "🇫🇴"
  },
  {
    name: "Fiji",
    prefix: "+679",
    code: "FJ",
    flag: "🇫🇯"
  },
  {
    name: "Finland",
    prefix: "+358",
    code: "FI",
    flag: "🇫🇮"
  },
  {
    name: "France",
    prefix: "+33",
    code: "FR",
    flag: "🇫🇷"
  },
  {
    name: "French Guiana",
    prefix: "+594",
    code: "GF",
    flag: "🇬🇫"
  },
  {
    name: "French Polynesia",
    prefix: "+689",
    code: "PF",
    flag: "🇵🇫"
  },
  {
    name: "Gabon",
    prefix: "+241",
    code: "GA",
    flag: "🇬🇦"
  },
  {
    name: "Gambia",
    prefix: "+220",
    code: "GM",
    flag: "🇬🇲"
  },
  {
    name: "Georgia",
    prefix: "+995",
    code: "GE",
    flag: "🇬🇪"
  },
  {
    name: "Germany",
    prefix: "+49",
    code: "DE",
    flag: "🇩🇪"
  },
  {
    name: "Ghana",
    prefix: "+233",
    code: "GH",
    flag: "🇬🇭"
  },
  {
    name: "Gibraltar",
    prefix: "+350",
    code: "GI",
    flag: "🇬🇮"
  },
  {
    name: "Greece",
    prefix: "+30",
    code: "GR",
    flag: "🇬🇷"
  },
  {
    name: "Greenland",
    prefix: "+299",
    code: "GL",
    flag: "🇬🇱"
  },
  {
    name: "Guadeloupe",
    prefix: "+590",
    code: "GP",
    flag: "🇬🇵"
  },
  {
    name: "Guatemala",
    prefix: "+502",
    code: "GT",
    flag: "🇬🇹"
  },
  {
    name: "Guinea",
    prefix: "+224",
    code: "GN",
    flag: "🇬🇳"
  },
  {
    name: "Guinea-Bissau",
    prefix: "+245",
    code: "GW",
    flag: "🇬🇼"
  },
  {
    name: "Guyana",
    prefix: "+595",
    code: "GY",
    flag: "🇬🇾"
  },
  {
    name: "Haiti",
    prefix: "+509",
    code: "HT",
    flag: "🇭🇹"
  },
  {
    name: "Holy See (Vatican City State)",
    prefix: "+379",
    code: "VA",
    flag: "🇻🇦"
  },
  {
    name: "Honduras",
    prefix: "+504",
    code: "HN",
    flag: "🇭🇳"
  },
  {
    name: "Hong Kong",
    prefix: "+852",
    code: "HK",
    flag: "🇭🇰"
  },
  {
    name: "Hungary",
    prefix: "+36",
    code: "HU",
    flag: "🇭🇺"
  },
  {
    name: "Iceland",
    prefix: "+354",
    code: "IS",
    flag: "🇮🇸"
  },
  {
    name: "India",
    prefix: "+91",
    code: "IN",
    flag: "🇮🇳"
  },
  {
    name: "Indonesia",
    prefix: "+62",
    code: "ID",
    flag: "🇮🇩"
  },
  {
    name: "Iran, Islamic Republic of Persian Gulf",
    prefix: "+98",
    code: "IR",
    flag: "🇮🇷"
  },
  {
    name: "Iraq",
    prefix: "+964",
    code: "IQ",
    flag: "🇮🇶"
  },
  {
    name: "Ireland",
    prefix: "+353",
    code: "IE",
    flag: "🇮🇪"
  },
  {
    name: "Israel",
    prefix: "+972",
    code: "IL",
    flag: "🇮🇱"
  },
  {
    name: "Italy",
    prefix: "+39",
    code: "IT",
    flag: "🇮🇹"
  },
  {
    name: "Japan",
    prefix: "+81",
    code: "JP",
    flag: "🇯🇵"
  },
  {
    name: "Jordan",
    prefix: "+962",
    code: "JO",
    flag: "🇯🇴"
  },
  {
    name: "Kazakhstan",
    prefix: "+77",
    code: "KZ",
    flag: "🇰🇿"
  },
  {
    name: "Kenya",
    prefix: "+254",
    code: "KE",
    flag: "🇰🇪"
  },
  {
    name: "Kiribati",
    prefix: "+686",
    code: "KI",
    flag: "🇰🇮"
  },
  {
    name: "Korea, Democratic People's Republic of Korea",
    prefix: "+850",
    code: "KP",
    flag: "🇰🇵"
  },
  {
    name: "Korea, Republic of South Korea",
    prefix: "+82",
    code: "KR",
    flag: "🇰🇷"
  },
  {
    name: "Kuwait",
    prefix: "+965",
    code: "KW",
    flag: "🇰🇼"
  },
  {
    name: "Kyrgyzstan",
    prefix: "+996",
    code: "KG",
    flag: "🇰🇬"
  },
  {
    name: "Laos",
    prefix: "+856",
    code: "LA",
    flag: "🇱🇦"
  },
  {
    name: "Latvia",
    prefix: "+371",
    code: "LV",
    flag: "🇱🇻"
  },
  {
    name: "Lebanon",
    prefix: "+961",
    code: "LB",
    flag: "🇱🇧"
  },
  {
    name: "Lesotho",
    prefix: "+266",
    code: "LS",
    flag: "🇱🇸"
  },
  {
    name: "Liberia",
    prefix: "+231",
    code: "LR",
    flag: "🇱🇷"
  },
  {
    name: "Libyan Arab Jamahiriya",
    prefix: "+218",
    code: "LY",
    flag: "🇱🇾"
  },
  {
    name: "Liechtenstein",
    prefix: "+423",
    code: "LI",
    flag: "🇱🇮"
  },
  {
    name: "Lithuania",
    prefix: "+370",
    code: "LT",
    flag: "🇱🇹"
  },
  {
    name: "Luxembourg",
    prefix: "+352",
    code: "LU",
    flag: "🇱🇺"
  },
  {
    name: "Macao",
    prefix: "+853",
    code: "MO",
    flag: "🇲🇴"
  },
  {
    name: "Macedonia",
    prefix: "+389",
    code: "MK",
    flag: "🇲🇰"
  },
  {
    name: "Madagascar",
    prefix: "+261",
    code: "MG",
    flag: "🇲🇬"
  },
  {
    name: "Malawi",
    prefix: "+265",
    code: "MW",
    flag: "🇲🇼"
  },
  {
    name: "Malaysia",
    prefix: "+60",
    code: "MY",
    flag: "🇲🇾"
  },
  {
    name: "Maldives",
    prefix: "+960",
    code: "MV",
    flag: "🇲🇻"
  },
  {
    name: "Mali",
    prefix: "+223",
    code: "ML",
    flag: "🇲🇱"
  },
  {
    name: "Malta",
    prefix: "+356",
    code: "MT",
    flag: "🇲🇹"
  },
  {
    name: "Marshall Islands",
    prefix: "+692",
    code: "MH",
    flag: "🇲🇭"
  },
  {
    name: "Martinique",
    prefix: "+596",
    code: "MQ",
    flag: "🇲🇶"
  },
  {
    name: "Mauritania",
    prefix: "+222",
    code: "MR",
    flag: "🇲🇷"
  },
  {
    name: "Mauritius",
    prefix: "+230",
    code: "MU",
    flag: "🇲🇺"
  },
  {
    name: "Mayotte",
    prefix: "+262",
    code: "YT",
    flag: "🇾🇹"
  },
  {
    name: "Mexico",
    prefix: "+52",
    code: "MX",
    flag: "🇲🇽"
  },
  {
    name: "Micronesia, Federated States of Micronesia",
    prefix: "+691",
    code: "FM",
    flag: "🇫🇲"
  },
  {
    name: "Moldova",
    prefix: "+373",
    code: "MD",
    flag: "🇲🇩"
  },
  {
    name: "Monaco",
    prefix: "+377",
    code: "MC",
    flag: "🇲🇨"
  },
  {
    name: "Mongolia",
    prefix: "+976",
    code: "MN",
    flag: "🇲🇳"
  },
  {
    name: "Montenegro",
    prefix: "+382",
    code: "ME",
    flag: "🇲🇪"
  },
  {
    name: "Morocco",
    prefix: "+212",
    code: "MA",
    flag: "🇲🇦"
  },
  {
    name: "Mozambique",
    prefix: "+258",
    code: "MZ",
    flag: "🇲🇿"
  },
  {
    name: "Myanmar",
    prefix: "+95",
    code: "MM",
    flag: "🇲🇲"
  },
  {
    name: "Namibia",
    prefix: "+264",
    code: "NA",
    flag: "🇳🇦"
  },
  {
    name: "Nauru",
    prefix: "+674",
    code: "NR",
    flag: "🇳🇷"
  },
  {
    name: "Nepal",
    prefix: "+977",
    code: "NP",
    flag: "🇳🇵"
  },
  {
    name: "Netherlands",
    prefix: "+31",
    code: "NL",
    flag: "🇳🇱"
  },
  {
    name: "Netherlands Antilles",
    prefix: "+599",
    code: "AN",
    flag: ""
  },
  {
    name: "New Caledonia",
    prefix: "+687",
    code: "NC",
    flag: "🇳🇨"
  },
  {
    name: "New Zealand",
    prefix: "+64",
    code: "NZ",
    flag: "🇳🇿"
  },
  {
    name: "Nicaragua",
    prefix: "+505",
    code: "NI",
    flag: "🇳🇮"
  },
  {
    name: "Niger",
    prefix: "+227",
    code: "NE",
    flag: "🇳🇪"
  },
  {
    name: "Nigeria",
    prefix: "+234",
    code: "NG",
    flag: "🇳🇬"
  },
  {
    name: "Niue",
    prefix: "+683",
    code: "NU",
    flag: "🇳🇺"
  },
  {
    name: "Norfolk Island",
    prefix: "+672",
    code: "NF",
    flag: "🇳🇫"
  },
  {
    name: "Norway",
    prefix: "+47",
    code: "NO",
    flag: "🇳🇴"
  },
  {
    name: "Oman",
    prefix: "+968",
    code: "OM",
    flag: "🇴🇲"
  },
  {
    name: "Pakistan",
    prefix: "+92",
    code: "PK",
    flag: "🇵🇰"
  },
  {
    name: "Palau",
    prefix: "+680",
    code: "PW",
    flag: "🇵🇼"
  },
  {
    name: "Palestinian Territory, Occupied",
    prefix: "+970",
    code: "PS",
    flag: "🇵🇸"
  },
  {
    name: "Panama",
    prefix: "+507",
    code: "PA",
    flag: "🇵🇦"
  },
  {
    name: "Papua New Guinea",
    prefix: "+675",
    code: "PG",
    flag: "🇵🇬"
  },
  {
    name: "Paraguay",
    prefix: "+595",
    code: "PY",
    flag: "🇵🇾"
  },
  {
    name: "Peru",
    prefix: "+51",
    code: "PE",
    flag: "🇵🇪"
  },
  {
    name: "Philippines",
    prefix: "+63",
    code: "PH",
    flag: "🇵🇭"
  },
  {
    name: "Pitcairn",
    prefix: "+872",
    code: "PN",
    flag: "🇵🇳"
  },
  {
    name: "Poland",
    prefix: "+48",
    code: "PL",
    flag: "🇵🇱"
  },
  {
    name: "Portugal",
    prefix: "+351",
    code: "PT",
    flag: "🇵🇹"
  },
  {
    name: "Qatar",
    prefix: "+974",
    code: "QA",
    flag: "🇶🇦"
  },
  {
    name: "Romania",
    prefix: "+40",
    code: "RO",
    flag: "🇷🇴"
  },
  {
    name: "Russia",
    prefix: "+7",
    code: "RU",
    flag: "🇷🇺"
  },
  {
    name: "Rwanda",
    prefix: "+250",
    code: "RW",
    flag: "🇷🇼"
  },
  {
    name: "Reunion",
    prefix: "+262",
    code: "RE",
    flag: "🇷🇪"
  },
  {
    name: "Saint Helena, Ascension and Tristan Da Cunha",
    prefix: "+290",
    code: "SH",
    flag: "🇸🇭"
  },
  {
    name: "Saint Pierre and Miquelon",
    prefix: "+508",
    code: "PM",
    flag: "🇵🇲"
  },
  {
    name: "Samoa",
    prefix: "+685",
    code: "WS",
    flag: "🇼🇸"
  },
  {
    name: "San Marino",
    prefix: "+378",
    code: "SM",
    flag: "🇸🇲"
  },
  {
    name: "Sao Tome and Principe",
    prefix: "+239",
    code: "ST",
    flag: "🇸🇹"
  },
  {
    name: "Saudi Arabia",
    prefix: "+966",
    code: "SA",
    flag: "🇸🇦"
  },
  {
    name: "Senegal",
    prefix: "+221",
    code: "SN",
    flag: "🇸🇳"
  },
  {
    name: "Serbia",
    prefix: "+381",
    code: "RS",
    flag: "🇷🇸"
  },
  {
    name: "Seychelles",
    prefix: "+248",
    code: "SC",
    flag: "🇸🇨"
  },
  {
    name: "Sierra Leone",
    prefix: "+232",
    code: "SL",
    flag: "🇸🇱"
  },
  {
    name: "Singapore",
    prefix: "+65",
    code: "SG",
    flag: "🇸🇬"
  },
  {
    name: "Slovakia",
    prefix: "+421",
    code: "SK",
    flag: "🇸🇰"
  },
  {
    name: "Slovenia",
    prefix: "+386",
    code: "SI",
    flag: "🇸🇮"
  },
  {
    name: "Solomon Islands",
    prefix: "+677",
    code: "SB",
    flag: "🇸🇧"
  },
  {
    name: "Somalia",
    prefix: "+252",
    code: "SO",
    flag: "🇸🇴"
  },
  {
    name: "South Africa",
    prefix: "+27",
    code: "ZA",
    flag: "🇿🇦"
  },
  {
    name: "South Sudan",
    prefix: "+211",
    code: "SS",
    flag: "🇸🇸"
  },
  {
    name: "South Georgia and the South Sandwich Islands",
    prefix: "+500",
    code: "GS",
    flag: "🇬🇸"
  },
  {
    name: "Spain",
    prefix: "+34",
    code: "ES",
    flag: "🇪🇸"
  },
  {
    name: "Sri Lanka",
    prefix: "+94",
    code: "LK",
    flag: "🇱🇰"
  },
  {
    name: "Sudan",
    prefix: "+249",
    code: "SD",
    flag: "🇸🇩"
  },
  {
    name: "Suriname",
    prefix: "+597",
    code: "SR",
    flag: "🇸🇷"
  },
  {
    name: "Svalbard and Jan Mayen",
    prefix: "+47",
    code: "SJ",
    flag: "🇸🇯"
  },
  {
    name: "Swaziland",
    prefix: "+268",
    code: "SZ",
    flag: "🇸🇿"
  },
  {
    name: "Sweden",
    prefix: "+46",
    code: "SE",
    flag: "🇸🇪"
  },
  {
    name: "Switzerland",
    prefix: "+41",
    code: "CH",
    flag: "🇨🇭"
  },
  {
    name: "Syrian Arab Republic",
    prefix: "+963",
    code: "SY",
    flag: "🇸🇾"
  },
  {
    name: "Taiwan",
    prefix: "+886",
    code: "TW",
    flag: "🇹🇼"
  },
  {
    name: "Tajikistan",
    prefix: "+992",
    code: "TJ",
    flag: "🇹🇯"
  },
  {
    name: "Tanzania, United Republic of Tanzania",
    prefix: "+255",
    code: "TZ",
    flag: "🇹🇿"
  },
  {
    name: "Thailand",
    prefix: "+66",
    code: "TH",
    flag: "🇹🇭"
  },
  {
    name: "Timor-Leste",
    prefix: "+670",
    code: "TL",
    flag: "🇹🇱"
  },
  {
    name: "Togo",
    prefix: "+228",
    code: "TG",
    flag: "🇹🇬"
  },
  {
    name: "Tokelau",
    prefix: "+690",
    code: "TK",
    flag: "🇹🇰"
  },
  {
    name: "Tonga",
    prefix: "+676",
    code: "TO",
    flag: "🇹🇴"
  },
  {
    name: "Tunisia",
    prefix: "+216",
    code: "TN",
    flag: "🇹🇳"
  },
  {
    name: "Turkey",
    prefix: "+90",
    code: "TR",
    flag: "🇹🇷"
  },
  {
    name: "Turkmenistan",
    prefix: "+993",
    code: "TM",
    flag: "🇹🇲"
  },
  {
    name: "Tuvalu",
    prefix: "+688",
    code: "TV",
    flag: "🇹🇻"
  },
  {
    name: "Uganda",
    prefix: "+256",
    code: "UG",
    flag: "🇺🇬"
  },
  {
    name: "Ukraine",
    prefix: "+380",
    code: "UA",
    flag: "🇺🇦"
  },
  {
    name: "United Arab Emirates",
    prefix: "+971",
    code: "AE",
    flag: "🇦🇪"
  },
  {
    name: "United Kingdom",
    prefix: "+44",
    code: "GB",
    flag: "🇬🇧"
  },
  {
    name: "United States",
    prefix: "+1",
    code: "US",
    flag: "🇺🇸"
  },
  {
    name: "Uruguay",
    prefix: "+598",
    code: "UY",
    flag: "🇺🇾"
  },
  {
    name: "Uzbekistan",
    prefix: "+998",
    code: "UZ",
    flag: "🇺🇿"
  },
  {
    name: "Vanuatu",
    prefix: "+678",
    code: "VU",
    flag: "🇻🇺"
  },
  {
    name: "Venezuela, Bolivarian Republic of Venezuela",
    prefix: "+58",
    code: "VE",
    flag: "🇻🇪"
  },
  {
    name: "Vietnam",
    prefix: "+84",
    code: "VN",
    flag: "🇻🇳"
  },
  {
    name: "Wallis and Futuna",
    prefix: "+681",
    code: "WF",
    flag: "🇼🇫"
  },
  {
    name: "Yemen",
    prefix: "+967",
    code: "YE",
    flag: "🇾🇪"
  },
  {
    name: "Zambia",
    prefix: "+260",
    code: "ZM",
    flag: "🇿🇲"
  },
  {
    name: "Zimbabwe",
    prefix: "+263",
    code: "ZW",
    flag: "🇿🇼"
  },
  {
    name: "Grenada",
    prefix: "+1473",
    code: "GD",
    flag: "🇬🇩"
  },
  {
    name: "Jamaica",
    prefix: "+1876",
    code: "JM",
    flag: "🇯🇲"
  },
  {
    name: "Saint Kitts and Nevis",
    prefix: "+1869",
    code: "KN",
    flag: "🇰🇳"
  },
  {
    name: "Saint Lucia",
    prefix: "+1758",
    code: "LC",
    flag: "🇱🇨"
  },
  {
    name: "Saint Vincent and the Grenadines",
    prefix: "+1784",
    code: "VC",
    flag: "🇻🇨"
  },
  {
    name: "Trinidad and Tobago",
    prefix: "+1868",
    code: "TT",
    flag: "🇹🇹"
  }
];
const getPrefixFromCountryCode = (countryCode) => {
  var _a;
  return ((_a = countryData.find((country) => country.code === countryCode)) == null ? void 0 : _a.prefix) || "+1";
};
const getCountryName = (countryCode) => {
  var _a;
  return ((_a = countryData.find((country) => country.code === countryCode)) == null ? void 0 : _a.name) || "";
};
const getFlagImage = (countryCode) => {
  return `https://cdn.shopify.com/static/images/flags/${countryCode.toLowerCase()}.svg`;
};
export {
  countryData,
  getCountryName,
  getFlagImage,
  getPrefixFromCountryCode
};
