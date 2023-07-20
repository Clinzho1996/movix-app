"use client";
// components/LogoutButton.js
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { MdLogout } from "react-icons/md";

const LogoutButton = () => {
  const session = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    onLogout();
  };

  return (
    <>
      {session.status === "authenticated" && (
        <button
          className="flex flex-row items-center mt-5"
          onClick={handleLogout}
        >
          <MdLogout className="capitalize text-gray-400 ml-3" />
          <span className="capitalize text-gray-400 ml-3">Logout</span>
        </button>
      )}
    </>
  );
};

export default LogoutButton;
