const { Schema, model } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const BlogSchema = new Schema (
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        author: {
            name: String,
            required: true,
            unique: true,
        },
        body: {
            type: String,
            required: true,
        },
        viewsCount: {
            type: Number,
            default: 0,
        },
        tags: {
            type: Number,
            default: 0,
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
         
    },
    { timestamps: true }
);
 
BlogSchema.plugin(uniqueValidator);
module.exports = model("blog", BlogSchema);