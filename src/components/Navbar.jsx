"use client";
import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FiSearch } from "react-icons/fi";
import { Md10K, MdNotifications } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <div className="flex flex-row justify-between mt-3 text-white">
      <div className="flex flex-row gap-5">
        <Link href="/movies">Movies</Link>
        <Link href="/series">Series</Link>
        <Link href="/documentaries">Documentaries</Link>
      </div>
      <div className="flex flex-row gap-5 align-middle">
        <FiSearch className="text-xl" />
        <MdNotifications className="text-xl" />
        <div className="flex flex-row justify-between gap-3 align-middle">
          <Image
            src={session?.user.image}
            alt="profile"
            width={30}
            height={30}
            className="rounded-full mt-[-8px]"
          />
          <h3 className="text-sm">{session?.user.name}</h3>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
