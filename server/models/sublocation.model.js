import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const sublocationSchema = new Schema({
    sublocation_name: {
        type: String,
        required: true,
        unique: true,
      },
      location_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location',
        required: true,
      }
  });
  
  const Sublocation = mongoose.model('Sublocation', sublocationSchema);

  export default Sublocation;