import mongoose from "mongoose";

const Schema = mongoose.Schema;

const categorySchema = new Schema({
  category_name: { type: String, required: true, unique: true },
  type: { type: String, required: true },
});

const Category = mongoose.model("Category", categorySchema);

export default Category;
