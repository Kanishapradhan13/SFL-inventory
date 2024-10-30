import express from "express";
const router = express.Router();
import User from "../models/user.model.js";
import lucia from "../config/lucia.js";
import { authUser, authAdmin, authStorekeeper } from "../middleware/auth.middleware.js";

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    console.log(await User.find({}))
    if (!user) {
      return res.status(404).send("Wrong credentails!");
    }

    if (user.password === req.body.password) {
      const session = await lucia.createSession(user.id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);

      // res.cookie(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

      return res.json({ user, sessionCookie });
    } else {
      return res.status(404).send("Wrong password!");
    }
  } catch (e) {
    return res.status(404).send(e.message);
  }
});

router.post("/signup", async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    console.log(req.body)
      if (existingUser) {
        return res.status(400).json({ message: "Email is already registered" });
      }
    const user = await User.create(req.body);
    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.post("/logout", async (req, res) => {
  const sessionId = lucia.readSessionCookie(req.headers.cookie ?? "");

  if (!sessionId) {
    return res.status(403).send("Unauthorized! Session not found.");
  }

  await lucia.invalidateSession(sessionId);

  return res.send("Log out successful!");
});

router.use("/auth-user", authUser, (req, res) => {
  res.json(req.authUser._id);
});
router.use("/auth-storekeeper", authStorekeeper, (req, res) => {
  res.json(req.authUser._id);
});
router.use("/auth-admin", authAdmin, (req, res) => {
  res.json(req.authUser._id);
});

export default router;
