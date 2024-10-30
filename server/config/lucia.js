import { Lucia } from "lucia";
import mongoose from "mongoose";
import { MongodbAdapter } from "@lucia-auth/adapter-mongodb";

const adapter = new MongodbAdapter(
  mongoose.connection.collection("sessions"),
  mongoose.connection.collection("users")
);

const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
});

export default lucia;
