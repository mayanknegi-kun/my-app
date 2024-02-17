"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const onSignup = async () => {
    try {
      const res = await axios.post("/api/users/signup", user);
      console.log(res, "res");
      router.push("/login");
    } catch (err: any) {
      console.log(err);
      toast.error(err.message);
    }
  };

  useEffect(() => {
    if (
      user?.email.length > 0 &&
      user?.username.length > 0 &&
      user?.password.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>Signup</h1>
        <hr />
        <div className="flex flex-col gap-2 w-1/2 mb-4">
          <label htmlFor="username">Username: </label>
          <input
            className="rounded p-2 outline-none focus:border-white-600 text-black"
            id="username"
            placeholder="Username"
            type="text"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
        </div>
        <div className="flex flex-col gap-2 w-1/2 mb-4">
          <label htmlFor="email">Email: </label>
          <input
            className="rounded p-2 outline-none focus:border-white-600 text-black"
            id="email"
            placeholder="abc@abc.com"
            type="text"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>
        <div className="flex flex-col gap-2 w-1/2 mb-4">
          <label htmlFor="password">Password: </label>
          <input
            className="rounded p-2 outline-none focus:border-white-600 text-black"
            id="password"
            placeholder="*********"
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>

        <button
          className="p-2 border border-gray-300 rounded my-4 focus:outline-none"
          onClick={onSignup}
        >
          {buttonDisabled ? "No Signup" : "Signup"}
        </button>
        <Link href={"/login"}>Login Here</Link>
      </div>
      <Toaster />
    </>
  );
}
