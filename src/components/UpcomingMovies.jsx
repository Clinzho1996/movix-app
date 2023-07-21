"use client";
import React, { useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { FiHeart } from "react-icons/fi";
import Slider from "react-slick";
import axios from "axios";
import MovieDetailsPopup from "./MovieDetailsPopup";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; // Import the router from next

const UpcomingMovies = () => {
  const router = useRouter(); // Get the router instance
  const session = useSession();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [genres, setGenres] = useState({});

  const API_KEY = process.env.NEXT_PUBLIC_MOVIE_DB_API_KEY;
  const BASE_URL = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`;

  const fetchMovie = async () => {
    try {
      const response = await axios.get(BASE_URL);
      const movieData = response.data.results;
      setMovies(movieData.slice(0, 30));
      setLoading(false);
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

  const getGenreNames = (genreIds) => {
    return genreIds.map((genreId) => genres[genreId]).join(", ");
  };

  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    const favoriteMap = favoriteMovies.reduce((acc, movie) => {
      acc[movie.id] = true;
      return acc;
    }, {});
    setIsFavorite(favoriteMap);
  }, [favoriteMovies]);

  const handleFavoriteClick = async (movieId) => {
    if (!session.data) {
      // If the user is not authenticated, redirect to the login page
      router.push("/login");
      return;
    }

    const movieIndex = favoriteMovies.findIndex(
      (movie) => movie.id === movieId
    );
    const isAlreadyFavorite = movieIndex !== -1;

    const requestBody = {
      media_type: "movie",
      media_id: movieId,
      favorite: !isAlreadyFavorite,
    };

    try {
      await axios.post(
        `https://api.themoviedb.org/3/account/18247746/favorite?api_key=${API_KEY}&session_id=${session.id}`,
        requestBody
      );

      if (isAlreadyFavorite) {
        const updatedFavoriteMovies = [...favoriteMovies];
        updatedFavoriteMovies.splice(movieIndex, 1);
        setFavoriteMovies(updatedFavoriteMovies);
      } else {
        const movieToAdd = movies.find((movie) => movie.id === movieId);
        if (movieToAdd) {
          setFavoriteMovies((prevFavoriteMovies) => [
            ...prevFavoriteMovies,
            movieToAdd,
          ]);
        }
      }

      setIsFavorite((prevIsFavorite) => ({
        ...prevIsFavorite,
        [movieId]: !isAlreadyFavorite,
      }));
    } catch (error) {
      console.error("Error updating favorite movies:", error);
    }
  };

  const handleMovieClick = (movieId) => {
    setSelectedMovieId(movieId);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div>
      <Slider {...sliderSettings}>
        {movies.map((movie) => (
          <div key={movie.id}>
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
                {/* Use the onClick event directly on the icon components */}
                {isFavorite[movie.id] ? (
                  <AiFillHeart
                    className="text-purple-800 text-xl h-13 w-13 rounded-md cursor-pointer"
                    onClick={(event) => {
                      event.stopPropagation(); // Prevent click event from bubbling up
                      handleFavoriteClick(movie.id);
                    }}
                  />
                ) : (
                  <FiHeart
                    className="text-purple-800 text-xl h-13 w-13 rounded-md cursor-pointer"
                    onClick={(event) => {
                      event.stopPropagation(); // Prevent click event from bubbling up
                      handleFavoriteClick(movie.id);
                    }}
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
      </Slider>
      {showPopup && (
        <MovieDetailsPopup
          movieId={selectedMovieId}
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
};

export default UpcomingMovies;
