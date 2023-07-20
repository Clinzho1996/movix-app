"use client";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FiHeart, FiHeartFill } from "react-icons/fi";
import { AiFillHeart } from "react-icons/ai";
import Trending from "./trending/page";
import TrendingCategory from "@/components/TrendingCategory";

const Home = () => {
  const session = useSession();
  const router = useRouter();

  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked((prevIsClicked) => !prevIsClicked);
  };

  useEffect(() => {
    // This code will run after the component has mounted (client-side)
    // Check session status and redirect to login if not authenticated
    if (session.status !== "authenticated") {
      router.replace("/login");
    }
  }, [session.status, router]);

  return (
    <div className="flex relative">
      <div className="w-72 fixed sidebar z-10">
        <Sidebar />
      </div>
      {/* Home Page View */}
      <div className="bg-[#21201E] min-h-screen md:ml-72 w-full">
        <div
          className="bg-white w-full p-5 relative top-0 left-0 z-0"
          style={{
            backgroundImage: `url("/banner.png")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            minHeight: "20vh",
          }}
        >
          <Navbar />
          <div className="mt-[15%]">
            <h2 className="text-white text-4xl font-bold">Insider</h2>
            <div className="flex flex-col justify-start align-middle">
              <p className="text-white text-sm mt-3">
                2021 | Comedy, Horror | 1 Season
              </p>
            </div>
            <div className="flex flex-row gap-3 justify-start mt-8 mb-3 align-middle items-center">
              <button className="text-white bg-purple-800 p-3 w-[150px] rounded-md cursor-pointer h-13">
                Watch Now
              </button>
              <div className="bg-gray-300 p-3 rounded-md">
                {isClicked ? (
                  <AiFillHeart
                    className="text-purple-800 text-2xl h-13 w-13 rounded-md cursor-pointer"
                    onClick={handleClick}
                  />
                ) : (
                  <FiHeart
                    className="text-purple-800 text-2xl h-13 w-13 rounded-md cursor-pointer"
                    onClick={handleClick}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Trending */}
        <div className="p-5">
          <h2 className="text-white text-2xl">Trending</h2>
          <TrendingCategory />
        </div>
        <div className="p-5">
          <h2 className="text-white text-2xl">Continue Watching</h2>
          <TrendingCategory />
        </div>
        <div className="p-5">
          <h2 className="text-white text-2xl">Latest Releases</h2>
          <TrendingCategory />
        </div>
      </div>
    </div>
  );
};

export default Home;
