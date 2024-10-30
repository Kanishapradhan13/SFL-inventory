import mongoose from "mongoose";

const Schema = mongoose.Schema;

const itemSchema = new Schema({
    item_name: {
      type: String,
      required: true
    },
    item_unit: {
      type: String,
      required: true
    },
    model_no: {
      type: String,
      required: true
    },
    low_stock_threshold: {
      type: Number,
      required: true
    },
    image: {
      type: String // Assuming the image is stored as a URL or file path
    },
    true_count: {
      type: Number,
      required: true,
      default: 0,
    },
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category', // Reference to the Category model
      required: true
    },
    location_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Location', // Reference to the Location model
      required: true
    },
    sublocation_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Sublocation', // Reference to the Sublocation model
      required: true
    }
  });
  
  const Item = mongoose.model('Item', itemSchema);

  export default Item;