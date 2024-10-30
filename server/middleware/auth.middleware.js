// import { User } from "../index.js";
import User from "../models/user.model.js";
import lucia from "../config/lucia.js";

async function authUser(req, res, next) {
  const sessionId = lucia.readSessionCookie(req.headers.cookie ?? "");
  

  const { session, user } = await lucia.validateSession(sessionId);
  if (!session) {
    const sessionCookie = lucia.createBlankSessionCookie();
    res.cookie(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
  }

  if (session && session.fresh) {
    const sessionCookie = lucia.createSessionCookie(session.id);
    res.cookie(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
  }

  if (session && user) {
    const authUser = await User.findById(user.id);

    if (!authUser) {
      return res.status(403).send("Unauthorized! User not found.");
    } else if (authUser.role !== "User") {
      return res.status(403).send("Unauthorized! User is not of type user.");
    }
    req.authUser = authUser;
    return next();
  } else {
    return res.status(403).send("Unauthorized user!");
  }
}

async function authAdmin(req, res, next) {
  const sessionId = lucia.readSessionCookie(req.headers.cookie ?? "");

  const { session, user } = await lucia.validateSession(sessionId);


  if (!session) {
    const sessionCookie = lucia.createBlankSessionCookie();
    res.cookie(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
  }

  if (session && session.fresh) {
    const sessionCookie = lucia.createSessionCookie(session.id);
    res.cookie(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
  }

  if (session && user) {
    const authUser = await User.findById(user.id);

    if (!authUser) {
      return res.status(403).send("Unauthorized! User not found.");
    } else if (authUser.role !== "Admin") {
      return res.status(403).send("Unauthorized! User is not of type admin.");
    }
    req.authUser = authUser;
    return next();
  } else {
    return res.status(403).send("Unauthorized admin!");
  }
}
async function authStorekeeper(req, res, next) {
  const sessionId = lucia.readSessionCookie(req.headers.cookie ?? "");

  const { session, user } = await lucia.validateSession(sessionId);


  if (!session) {
    const sessionCookie = lucia.createBlankSessionCookie();
    res.cookie(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
  }

  if (session && session.fresh) {
    const sessionCookie = lucia.createSessionCookie(session.id);
    res.cookie(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
  }

  if (session && user) {
    const authUser = await User.findById(user.id);

    if (!authUser) {
      return res.status(403).send("Unauthorized! User not found.");
    } else if (authUser.role !== "StoreKeeper") {
      return res.status(403).send("Unauthorized! User is not of type storekeeper.");
    }
    req.authUser = authUser;
    return next();
  } else {
    return res.status(403).send("Unauthorized admin!");
  }
}

export { authAdmin, authUser, authStorekeeper };
