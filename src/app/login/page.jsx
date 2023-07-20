"use client";
import { MdNotStarted } from "react-icons/md";
import { getProviders, signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Login() {
  const session = useSession();
  const router = useRouter();
  const params = useSearchParams();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    setError(params.get("error"));
    setSuccess(params.get("success"));
    if (session.status === "authenticated") {
      router?.push("/");
    }
  }, [params, session.status, router]);

  if (session.status === "loading") {
    return (
      <div className="main w-full h-full flex flex-col justify-center items-center">
        <p className="text-white animate-bounce">Loading...</p>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    signIn("credentials", {
      email,
      password,
    });
  };

  return (
    <div className="main w-full h-full flex flex-col justify-center items-center">
      <div className="text-center">
        <div className="flex flex-row justify-center items-center align-middle">
          <MdNotStarted className="text-[70px] text-white mt-2" />
          <h2 className="font-extrabold text-[40px] mt-3 text-white">
            Movix | Dev - Clinton
          </h2>
        </div>
        <p className="text-white text-xl mt-2">
          Welcome to Movix, your ultimate destination <br /> for all things
          movies!
        </p>
        <form className="mt-10 border-2 p-5 rounded-md" onSubmit={handleSubmit}>
          <div className="flex flex-col justify-center items-center text-center">
            <input
              type="email"
              placeholder="Email Address"
              className="bg-white w-full p-3 rounded-sm mt-5 focus:shadow-none placeholder:text-purple-500 text-purple-500"
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="bg-white w-full  p-3 rounded-sm mt-5 focus:shadow-none placeholder:text-purple-500 text-purple-500"
              required
            />
            <button className="bg-purple-800 text-xl text-white p-3 w-full mt-5 rounded-sm">
              Login
            </button>

            <span
              className="bg-black text-xl text-white p-3 w-full mt-5 rounded-sm cursor-pointer"
              onClick={() => {
                signIn("google");
              }}
            >
              Login with Google
            </span>
            <p className="text-red text-xl">
              {error && "Something went wrong!"}
            </p>
          </div>
        </form>
      </div>

      <span className="text-gray-200 mt-5">- OR -</span>
      <Link className="text-white underline text-[14px]" href="/register">
        Create a new account
      </Link>
    </div>
  );
}
