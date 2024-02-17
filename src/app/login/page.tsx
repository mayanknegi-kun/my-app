"use client";
import axios from "axios";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const onLogin = async () => {
    try {
      const res = await axios.post("/api/users/login", user);
      console.log(res, "res");
      toast.success("Login Success");
      router.push("/profile");
    } catch (err: any) {
      console.log(err);
      toast.error(err.message);
    }
  };

  useEffect(() => {
    if (user?.email.length > 0 && user?.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>Login</h1>
        <hr />
        <div className="flex flex-col gap-2 w-1/2 mb-4">
          <label htmlFor="email">Email: </label>
          <input
            className="text-black rounded p-2 outline-none focus:border-white-600"
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
            className="text-black rounded p-2 outline-none focus:border-white-600"
            id="password"
            placeholder="*********"
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>

        <button
          className="p-2 border border-gray-300 rounded my-4 focus:outline-none"
          onClick={onLogin}
        >
          Login Here
        </button>
        <Link href={"/signup"}>Sign Up Here</Link>
      </div>
      <Toaster />
    </>
  );
}
