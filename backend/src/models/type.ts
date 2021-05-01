import mongoose from 'mongoose';

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

const type = mongoose.model('type', typeSchema);

export default type;