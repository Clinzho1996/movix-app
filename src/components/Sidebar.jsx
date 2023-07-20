"use client";
import Link from "next/link";
import React from "react";
import {
  MdCalendarMonth,
  MdHeartBroken,
  MdHome,
  MdNotStarted,
  MdOutlineCancel,
  MdTrendingUp,
} from "react-icons/md";
import LogoutButton from "./Logout";
import { AiFillHeart } from "react-icons/ai";
import { GoHomeFill } from "react-icons/go";

const Sidebar = () => {
  const handleLogout = () => {
    router.replace("/login");
  };
  const menu = [
    {
      id: 1,
      title: "Home",
      path: "/",
      icon: <GoHomeFill />,
    },
    {
      id: 2,
      title: "Favorites",
      path: "/favorites",
      icon: <AiFillHeart />,
    },
    {
      id: 3,
      title: "Trending",
      path: "/trending",
      icon: <MdTrendingUp />,
    },
    {
      id: 4,
      title: "Coming Soon",
      path: "/coming",
      icon: <MdCalendarMonth />,
    },
    // Add more genre links here
  ];
  return (
    <div className="h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10 pl-5 bg-[#21201E] shadow-lg shadow-purple-500">
      <>
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className="items-center gap-3 mt-4 flex text-2xl font-extrabold tracking-tight text-white"
          >
            <MdNotStarted className="text-[#fff] text-[60px]" />
            <span className="text-white">Movix</span>
          </Link>
          <button
            type="button"
            className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
          >
            <MdOutlineCancel />
          </button>
        </div>
        <div className="mt-10">
          <div>
            {menu.map((link) => (
              <Link
                href={`${link.path}`}
                key={link.id}
                className="flex flex-row items-center mt-5"
              >
                <span className="capitalize text-gray-400 ml-3">
                  {link.icon}
                </span>
                <span className="capitalize text-gray-400 ml-3">
                  {link.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
        <div className="absolute bottom-5">
          <LogoutButton onLogout={handleLogout} />
        </div>
      </>
    </div>
  );
};

export default Sidebar;
