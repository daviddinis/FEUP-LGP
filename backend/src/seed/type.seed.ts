import Type from "../models/type";
export default async function seedType() {

  await Type.deleteMany({});
  await Type.create({
    name: "KB",
    parameters: [
      {
        param: "Company Number",
        constraints: [{constraint: "eq", value: "05747877"}],
      },
      {
        param: "Company Address",
        constraints: [
          {constraint: "containsParam", value: "Company Number"},
        ],
      },
      {
        param: "Company Status",
        constraints: [{constraint: "oneOf", value: "Active,Inactive"}],
      },
      {
        param: "Company Type",
        constraints: [{constraint: "contains", value: "Company"}],
      },
      {
        param: "Created On",
        constraints: [{constraint: "contains", value: "2000"}],
      },
    ],
  });

  await Type.create({
    name: "PRCO",
    parameters: [
      {param: "Company Name", constraints: []},
      {param: "SIREN", constraints: []},
      {param: "LEI", constraints: []},
      {param: "CIB", constraints: []},
      {param: "Company Address", constraints: []},
      {param: "Date of Registration", constraints: []},
      {param: "Date of Publication", constraints: []},
      {param: "Country", constraints: []},
    ],
  });

  await Type.create({
    name: "AFCA",
    parameters: [
      {param: "Board of Directors", constraints: []},
      {param: "Executive Management", constraints: []},
      {param: "Profit (Text)", constraints: []},
      {param: "Revenues (Text)", constraints: []},
      {param: "Assets (Text)", constraints: []},
      {param: "Total Assets", constraints: []},
      {param: "Total Liabilities", constraints: []},
      {param: "Gross Profit", constraints: []},
      {param: "Profit", constraints: []},
      {param: "Date of Publication", constraints: []},
      {param: "Country", constraints: []},
    ]
  })
}