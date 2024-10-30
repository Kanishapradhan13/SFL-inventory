import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const locationSchema = new Schema({
    location_name: {
      type: String,
      required: true,
      unique: true,
    }
  });
  
  const Location = mongoose.model('Location', locationSchema);

  export default Location;