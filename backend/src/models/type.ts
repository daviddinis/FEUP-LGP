import mongoose, { Model, model, Document } from 'mongoose';

export interface IType extends Document {
	name: string;
	parameters: [{ 
		param: string,
		constraints: [
			{
				constraint: {
					type: string,
					enum: ["lt", "gt", "lte", "gte", "eq", "oneOf", "contains", "containsParam"],
				},
				value: string
			},
		], }];
  }

const typeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            unique: true
        },
        parameters: [{
            param: String,
            constraints: [
                {
                    constraint: {
                        type: String,
                        enum: ["lt", "gt", "lte", "gte", "eq", "oneOf", "contains", "containsParam"],
                    },
                    value: String
                },
            ],
        }],
    },
    { timestamps: true }
);

const type: Model<IType> = model('type', typeSchema);

export default type;