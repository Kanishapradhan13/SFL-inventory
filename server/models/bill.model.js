import mongoose from "mongoose";

const Schema = mongoose.Schema;

const billSchema = new Schema({
    vendor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vendor",
      },
      image: {
        type: String,
      },
  });
  
  const Bill = mongoose.model('Bill', billSchema);

  export default Bill;








