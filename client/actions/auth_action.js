"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

export async function login(formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  // Validate all fields are provided
  if (!email || !password) {
    return { type: "error", message: "Email and password are required" };
  }

  const body = {
    email,
    password,
  };

  const res = await fetch(
    "http://localhost:5000/auth/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
      body: JSON.stringify(body),
    }
  );

  if (res.ok) {
    const json = await res.json();

    cookies().set(
      json.sessionCookie.name,
      json.sessionCookie.value,
      json.sessionCookie.attributes
    );

    if (json.user.role === "User") {
      console.log("LOGIN AS USER");
      redirect("/user");
    } else if (json.user.role === "Admin") {
      console.log("LOGIN AS ADMIN");
      redirect("/admin");
    } else if (json.user.role === "StoreKeeper") {
      console.log("LOGIN AS StoreKeeper");
      redirect("/storekeeper");
    }
    return { type: "success", message: "Login successful" };
  } else {
    const text = await res.text();
    console.log("Login ERROR: ", text);
    return { type: "error", message: text };
  }
}
export async function signup(formData) {
  const email = formData.get("email");
  const name = formData.get("name");
  const organization = formData.get("organization");
  const phone_no = formData.get("phone_no");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirm_password");

  // Form Validations

  if (
    !email ||
    !name ||
    !organization ||
    !phone_no ||
    !password ||
    !confirmPassword
  ) {
    return { type: "error", message: "All fields are required" };
  }
  if (phone_no.length < 8) {
    return {
      type: "error",
      message: "Phone number must be at least 8 characters long",
    };
  }
  if (password != confirmPassword) {
    return { type: "error", message: "Password does not match" };
  }
  if (password.length < 8) {
    return {
      type: "error",
      message: "Password must be at least 8 characters long",
    };
  }

  const body = {
    _id: uuidv4(),
    email,
    name,
    organization,
    phone_no,
    password,
  };

  // Assuming this function is part of a larger component on the client side
  const res = await fetch(
    "http://localhost:5000/auth/signup",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  if (res.ok) {
    return {
      type: "success",
      message: "Signup successful, Please Login to your account!",
    };
  } else {
    const text = await res.text();
    return { type: "error", message: text };
  }
}
export async function logout() {
  const res = await fetch(
    "http://localhost:5000/auth/logout",
    {
      method: "POST",
      headers: {
        Cookie: `auth_session=${cookies().get("auth_session").value};`,
      },
    }
  );

  if (res.ok) {
    cookies().delete("auth_session");

    redirect("/login");
  } else {
    res.text().then((text) => {
      console.log("LOGOUT ERROR:", text);
    });
  }
}
