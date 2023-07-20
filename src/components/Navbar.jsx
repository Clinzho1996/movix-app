import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiSearch } from "react-icons/fi";
import { Md10K, MdNotifications } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  // State to control the visibility of the search field
  const [showSearchField, setShowSearchField] = useState(false);

  // Function to toggle the visibility of the search field
  const toggleSearchField = () => {
    setShowSearchField((prevState) => !prevState);
  };

  // Function to get the name initials from the user's name
  const getNameInitials = (name) => {
    if (!name) return "";
    const initials = name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("");
    return initials.toUpperCase();
  };

  // If the session is still loading, show a loading message or spinner
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-row justify-between mt-3 text-white">
      <div className="flex flex-row gap-5">
        <Link href="/movies">Movies</Link>
        <Link href="/series">Series</Link>
        <Link href="/documentaries">Documentaries</Link>
      </div>
      <div className="flex flex-row gap-5 align-middle">
        <FiSearch
          className="text-xl cursor-pointer"
          onClick={toggleSearchField}
        />
        <MdNotifications className="text-xl" />
        <div className="flex flex-row justify-between gap-3 align-middle">
          {session?.user?.image ? (
            <Image
              src={session.user.image}
              alt="profile"
              width={30}
              height={30}
              className="rounded-full mt-[-8px]"
            />
          ) : (
            <div className="rounded-full mt-[-8px] h-8 w-8 flex items-center justify-center text-sm bg-purple-800 text-white">
              {getNameInitials(session?.user?.name)}
            </div>
          )}
          <h3 className="text-sm">{session?.user?.name}</h3>
        </div>
      </div>
      {showSearchField && (
        <div className="absolute align-middle items-center right-20 top-14 bg-[#21201E] p-2 rounded-md w-[60%] border-2">
          {/* Your search field content here */}
          <input
            type="text"
            placeholder="Search movies here..."
            className=" p-1 rounded-md bg-transparent w-full"
          />
        </div>
      )}
    </div>
  );
};

export default Navbar;
