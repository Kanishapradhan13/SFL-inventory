import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    default: "User"
  },
  phone_no: {
    type: Number,
    required: true
  },
  organization: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: "https://res.cloudinary.com/dgs7htb9e/image/upload/v1717040574/x865knbnx6au6gkdsrmf.png"
  },
  favourite_items: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item'
  }]
},
{ _id: false, timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
