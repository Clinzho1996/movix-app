"use client";
import Sidebar from "@/components/sidebar/Sidebar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, {useEffect} from "react";

const Home = () => {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    // This code will run after the component has mounted (client-side)
    // Check session status and redirect to login if not authenticated
    if (session.status !== "authenticated") {
      router.push("/login");
    }
  }, [session.status, router]);

  return (
    <div className="flex relative">
      <div className="w-72 fixed sidebar">
        <Sidebar />
      </div>
      <div className="bg-white min-h-screen md:ml-72 w-full p-5">
        <p>Home Page</p>
      </div>
    </div>
  );
};

export default Home;
