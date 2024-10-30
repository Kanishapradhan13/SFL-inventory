import mongoose from "mongoose";

const Schema = mongoose.Schema;

const sessionSchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
    expires_at: {
      type: Date,
      required: true,
    },
  },
  { _id: false }
);

const Session = mongoose.model("Session", sessionSchema);

export default Session;
