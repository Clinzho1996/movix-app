"use client";
import React, { useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { FiHeart } from "react-icons/fi";
import axios from "axios";
import Sidebar from "@/components/Sidebar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; // Fixed import typo
import MovieDetailsPopup from "@/components/MovieDetailsPopup";
import useSWR from "swr";

const Favorites = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [genres, setGenres] = useState({});
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [isFavorite, setIsFavorite] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  const API_KEY = process.env.NEXT_PUBLIC_MOVIE_DB_API_KEY;

  //NEW WAY TO FETCH DATA
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, mutate, error, isLoading } = useSWR(
    `/api/favorite?username=${session?.data?.user.name}`,
    fetcher
  );

  useEffect(() => {
    async function fetchFavoriteMovies() {
      try {
        const response = await fetch("/api/favorite", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch favorite movies");
        }

        const data = await response.json();

        // Process favorite movies data
        const favoritesMap = data.reduce((acc, movie) => {
          acc[movie.id] = true;
          return acc;
        }, {});

        setFavoriteMovies(data);
        setIsFavorite(favoritesMap);
        setLoading(false);

        setGenres(data.genre);
      } catch (error) {
        console.error(error);
        setFavoriteMovies([]);
        setIsFavorite({});
      }
    }

    if (session?.user?.id) {
      // Only fetch favorite movies if the user is logged in and has an ID
      fetchFavoriteMovies();
    }
  }, [session]);

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
    fetchGenres();
  }, []);

  // Function to handle opening the popup and setting the selected movie ID
  const handleMovieClick = (movieId) => {
    setSelectedMovieId(movieId);
    setShowPopup(true);
  };

  // Function to handle closing the popup
  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleDelete = async (movieid) => {
    console.log("Deleting movie with ID:", movieid);
    try {
      await fetch(`/api/favorite/${movieid}`, {
        method: "DELETE",
      });
      mutate();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="flex relative">
        <div className="w-72 fixed sidebar">
          <Sidebar />
        </div>
        <div className="bg-[#21201E] min-h-screen md:ml-72 w-full">
          <div className="p-5">
            <h2 className="text-white text-2xl font-bold">
              {session?.user?.name} Favorites
            </h2>
            <div className="flex flex-wrap gap-5">
              {favoriteMovies.map((movie) => (
                <div key={movie.id}>
                  {/* Movie Card */}
                  <div
                    className="flex-shrink-0 relative w-[250px] rounded-lg border-gray-300 border-2 border-solid h-[280px] m-2 cursor-pointer"
                    style={{
                      backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movie?.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      minHeight: "20vh",
                    }}
                    onClick={() => handleMovieClick(movie.id)}
                  >
                    <div className="bg-gray-300 p-2 rounded-md w-[38px] flex flex-row justify-end mt-2 absolute top-2 right-2">
                      {/* Add/Remove from Favorites */}
                      {isFavorite[movie.movieid] ? (
                        <AiFillHeart
                          className="text-purple-800 text-xl h-13 w-13 rounded-md cursor-pointer"
                          onClick={() => handleDelete(movie.movieid)}
                        />
                      ) : (
                        <AiFillHeart />
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
                      <h2 className="text-black text-[16px] font-bold">
                        {movie?.name}
                      </h2>
                    </div>
                  </div>

                  {showPopup && (
                    <MovieDetailsPopup
                      movieId={selectedMovieId}
                      onClose={handleClosePopup}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Favorites;
