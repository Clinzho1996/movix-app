"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { FiHeart } from "react-icons/fi";

const TrendingCategory = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleClick = () => {
    setIsClicked((prevIsClicked) => !prevIsClicked);
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("/api/popular");
        console.log("Response:", response.data); // Add this line for debugging
        setMovies(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error); // Add this line for debugging
        setError("Error fetching movies.");
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !movies || movies.length === 0) {
    return <div>Error loading movies or no movies to display.</div>;
  }

  return (
    <div className="flex flex-row gap-5 items-center mt-3">
      {movies.map((movie) => (
        <div
          className="relative w-[250px] rounded-lg border-gray-300 border-2 border-solid h-[280px]"
          style={{
            backgroundImage: `url(${movie.poster_path})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            minHeight: "20vh",
          }}
          key={movie.id}
        >
          <div className="bg-gray-300 p-2 rounded-md w-[38px] flex flex-row justify-end mt-2 ml-2 absolute top-2 right-2">
            {isClicked ? (
              <AiFillHeart
                className="text-purple-800 text-xl h-13 w-13 rounded-md cursor-pointer"
                onClick={handleClick}
              />
            ) : (
              <FiHeart
                className="text-purple-800 text-xl h-13 w-13 rounded-md cursor-pointer"
                onClick={handleClick}
              />
            )}
          </div>
          <div
            className="p-4 absolute bottom-0 w-full"
            style={{
              borderRadius: "0px 0px 4px 4px",
              opacity: 0.95,
              background:
                "linear-gradient(148deg, #FFF 0%, rgba(255, 255, 255, 0.00) 100%)",
              backdropFilter: "blur(10px)",
            }}
          >
            <h2 className="text-black text-[16px] font-bold">{movie.title}</h2>
            <div className="flex flex-col justify-start align-middle">
              <p className="text-black text-sm mt-1">rating | genre</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrendingCategory;
