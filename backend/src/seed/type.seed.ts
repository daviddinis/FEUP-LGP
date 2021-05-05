import Type from "../models/type";
export default async function seedType() {

    await Type.deleteMany({});
    await Type.create({
        name: "KB",
        parameters: [
          {
            param: "Company Number",
            constraints: [{ constraint: "eq", value: "05747877" }],
          },
          {
            param: "Company Address",
            constraints: [
              { constraint: "containsParam", value: "Company Number" },
            ],
          },
          {
            param: "Company Status",
            constraints: [{ constraint: "oneOf", value: "Active,Inactive" }],
          },
          {
            param: "Company Type",
            constraints: [{ constraint: "contains", value: "Company" }],
          },
          {
            param: "Created On",
            constraints: [{ constraint: "contains", value: "2000" }],
          },
        ],
      });
      
      await Type.create({
        name: "CB",
        parameters: [
          { param: "Company Name", constraints: [] },
          { param: "SIREN", constraints: [] },
          { param: "LEI", constraints: [] },
          { param: "CIB", constraints: [] },
          { param: "Company Address", constraints: [] },
          { param: "$Date of authorisation", constraints: [] },
        ],
      });

}