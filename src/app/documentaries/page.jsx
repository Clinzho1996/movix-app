"use client";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FiHeart, FiHeartFill } from "react-icons/fi";
import { AiFillHeart } from "react-icons/ai";
import TrendingCategory from "@/components/TrendingCategory";
import axios from "axios";
import PopularMovies from "@/components/Series";
import TopRated from "@/components/TopRated";
import UpcomingMovies from "@/components/UpcomingMovies";
import format from "date-fns/format";

const Documentaries = () => {
  const session = useSession();
  const router = useRouter();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [genres, setGenres] = useState({}); // Store genre names using their IDs

  // Use an array of objects to track favorite status for each movie
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  const handleFavoriteClick = (movieId) => {
    // Find the movie in the favoriteMovies state by its ID
    const movieIndex = favoriteMovies.findIndex(
      (movie) => movie.id === movieId
    );

    if (movieIndex !== -1) {
      // Movie is already in favorites, remove it
      const updatedFavoriteMovies = [...favoriteMovies];
      updatedFavoriteMovies.splice(movieIndex, 1);
      setFavoriteMovies(updatedFavoriteMovies);
    } else {
      // Movie is not in favorites, add it
      const movieToAdd = movies.find((movie) => movie.id === movieId);
      if (movieToAdd) {
        setFavoriteMovies((prevFavoriteMovies) => [
          ...prevFavoriteMovies,
          movieToAdd,
        ]);
      }
    }
  };

  // Function to format the release date in "28th June, 2023" format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "do MMMM, yyyy");
  };

  useEffect(() => {
    // This code will run after the component has mounted (client-side)
    // Check session status and redirect to login if not authenticated
    if (session.status !== "authenticated") {
      router.replace("/login");
    }
  }, [session.status, router]);

  const API_KEY = process.env.NEXT_PUBLIC_MOVIE_DB_API_KEY;
  const BASE_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

  const fetchMovie = async () => {
    try {
      const response = await axios.get(BASE_URL);
      const movieData = response.data.results;
      setMovies(movieData); // Set the fetched movie data to the state
      setLoading(false); // Mark loading as complete
    } catch (error) {
      console.error("Error fetching movie:", error);
    }
  };

  const fetchGenres = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
      );
      const genresData = response.data.genres;
      // Convert genre IDs to their corresponding names and store in the state
      const genresMap = {};
      genresData.forEach((genre) => {
        genresMap[genre.id] = genre.name;
      });
      setGenres(genresMap);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  useEffect(() => {
    fetchMovie();
    fetchGenres();
  }, []);

  // Get a random movie from the fetched movies
  const randomMovie = movies[Math.floor(Math.random() * movies.length)];

  // Function to get genre names from genre IDs
  const getGenreNames = (genreIds) => {
    return genreIds.map((genreId) => genres[genreId]).join(", ");
  };

  return (
    <div className="flex relative">
      <div className="w-72 fixed sidebar z-10">
        <Sidebar />
      </div>
      {/* Home Page View */}
      <div className="bg-[#21201E] min-h-screen md:ml-72 w-full">
        {randomMovie && (
          <div
            className="bg-white w-full p-5 relative top-0 left-0"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${randomMovie.backdrop_path})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              minHeight: "20vh",
            }}
            key={randomMovie.id}
          >
            <Navbar />
            <div className="mt-[15%]">
              <h2 className="text-white text-4xl font-bold z-10">
                {randomMovie.title}
              </h2>
              <div className="flex flex-col justify-start align-middle">
                <p className="text-white text-sm mt-3">
                  {`Release Date: ${formatDate(randomMovie.release_date)} `} |
                  <span className="ml-1">
                    {getGenreNames(randomMovie.genre_ids)}
                  </span>
                </p>
              </div>
              <div className="flex flex-row gap-3 justify-start mt-8 mb-3 align-middle items-center">
                <button className="text-white bg-purple-800 p-3 w-[150px] rounded-md cursor-pointer h-13">
                  Watch Now
                </button>
                <div className="bg-gray-300 p-3 rounded-md">
                  {/* Display different heart icons based on favorite status */}
                  {favoriteMovies.some(
                    (movie) => movie.id === randomMovie.id
                  ) ? (
                    <AiFillHeart
                      className="text-purple-800 text-2xl h-13 w-13 rounded-md cursor-pointer"
                      onClick={() => handleFavoriteClick(randomMovie.id)}
                    />
                  ) : (
                    <FiHeart
                      className="text-purple-800 text-2xl h-13 w-13 rounded-md cursor-pointer"
                      onClick={() => handleFavoriteClick(randomMovie.id)}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Top Rated */}
        <div className="p-5">
          <h2 className="text-white text-2xl font-bold">
            Top Rated Documentaries
          </h2>
          <TopRated />
        </div>
        {/* Now Playing */}
        <div className="p-5">
          <h2 className="text-white text-2xl font-bold"> Now Playing</h2>
          <PopularMovies />
        </div>

        {/* Popular Movies */}
        <div className="p-5">
          <h2 className="text-white text-2xl font-bold">
            Popular Documentaries
          </h2>
          <TrendingCategory />
        </div>
        {/* Upcoming Movies */}
        <div className="p-5">
          <h2 className="text-white text-2xl font-bold">
            Upcoming Documentaries
          </h2>
          <UpcomingMovies />
        </div>
      </div>
    </div>
  );
};

export default Documentaries;
