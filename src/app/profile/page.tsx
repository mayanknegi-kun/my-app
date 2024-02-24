"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");

  useEffect(() => {
    getuserDetails();
  }, []);

  const getuserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res, res.data.user._id, "res");
    setData(res.data.user._id);
  };

  const logout = () => {
    try {
      axios.get("/api/users/logout");
      toast.success("Logout Successful");
      router.push("/login");
    } catch (err: any) {
      console.log(err.message);
      toast.error(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <p>profile page</p>
      <h2>
        {data === "nothing" ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <hr />
      <button
        className="rounded bg-[lightblue] p-3 mt-4 text-[black]"
        onClick={logout}
      >
        Logout
      </button>
      <button
        className="rounded bg-green-800 p-3 mt-4 text-[black]"
        onClick={getuserDetails}
      >
        Get User Details
      </button>
      <Toaster />
    </div>
  );
}
