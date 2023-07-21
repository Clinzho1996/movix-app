"use client";
import React, { useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { FiHeart } from "react-icons/fi";
import axios from "axios";
import Sidebar from "@/components/Sidebar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Favorites = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [genres, setGenres] = useState({});
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  const API_KEY = process.env.NEXT_PUBLIC_MOVIE_DB_API_KEY;

  const fetchFavoriteMovies = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/account/18247746/favorite/movies?api_key=${API_KEY}&language=en-US&session_id=${session.id}&sort_by=created_at.desc&page=1`
      );

      setFavoriteMovies(response.data.results);
    } catch (error) {
      console.error("Error fetching favorite movies:", error);
    }
  };

  useEffect(() => {
    if (status === "loading") {
      // If the session status is still loading, return a loading state
      return <div>Loading...</div>;
    } else {
      // Fetch the list of favorite movies if the user is authenticated
      fetchFavoriteMovies();
    }
  }, [session, status]);

  const fetchGenres = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
      );
      const genresData = response.data.genres;
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

  const handleAddToFavorites = async (movie) => {
    // Implement the logic to add/remove the movie from favorites
    // based on the current state of the movie's favorite status.
  };

  const getGenreNames = (genreIds) => {
    return genreIds.map((genreId) => genres[genreId]).join(", ");
  };

  const handleMovieClick = (movieId) => {
    // Implement the logic to handle clicking on a movie
    // For example, show movie details or navigate to its page.
  };

  return (
    <div className="flex relative">
      <div className="w-72 fixed sidebar">
        <Sidebar />
      </div>
      <div className="bg-[#21201E] min-h-screen md:ml-72 w-full">
        <div className="p-5">
          <h2 className="text-white text-2xl font-bold">
            {session?.user?.name} Favorites
          </h2>
          {favoriteMovies.map((movie) => (
            <div key={movie.id}>
              {/* Movie Card */}
              <div
                className="flex-shrink-0 relative w-[250px] rounded-lg border-gray-300 border-2 border-solid h-[280px] m-2 cursor-pointer"
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movie?.poster_path})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  minHeight: "20vh",
                }}
                onClick={() => handleMovieClick(movie.id)}
              >
                <div className="bg-gray-300 p-2 rounded-md w-[38px] flex flex-row justify-end mt-2 absolute top-2 right-2">
                  {/* Add/Remove from Favorites */}
                  {isFavorite[movie.id] ? (
                    <AiFillHeart
                      className="text-purple-800 text-xl h-13 w-13 rounded-md cursor-pointer"
                      onClick={() => handleAddToFavorites(movie)}
                    />
                  ) : (
                    <FiHeart
                      className="text-purple-800 text-xl h-13 w-13 rounded-md cursor-pointer"
                      onClick={() => handleAddToFavorites(movie)}
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
                  <h2 className="text-black text-[16px] font-bold">
                    {movie?.title}
                  </h2>
                  <div className="flex flex-col justify-start align-middle">
                    <p className="text-black text-sm mt-1">{`${getGenreNames(
                      movie.genre_ids
                    )}`}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
