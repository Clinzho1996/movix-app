import React, { useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { FiHeart } from "react-icons/fi";
import Slider from "react-slick";
import axios from "axios"; // Import axios to make API requests
import MovieDetailsPopup from "./MovieDetailsPopup";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TopRated = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState({}); // Track favorites using movie IDs
  const [showPopup, setShowPopup] = useState(false); // State to show/hide the movie details popup
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [genres, setGenres] = useState({}); // State to store the genres data

  const API_KEY = process.env.NEXT_PUBLIC_MOVIE_DB_API_KEY;
  const BASE_URL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`;

  const fetchMovie = async () => {
    try {
      const response = await axios.get(BASE_URL);
      const movieData = response.data.results;
      setMovies(movieData.slice(0, 30)); // Set the first 10 fetched movie data to the state
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

  // Function to get genre names from genre IDs
  const getGenreNames = (genreIds) => {
    return genreIds.map((genreId) => genres[genreId]).join(", ");
  };

  const handleAddToFavorites = (movie) => {
    setIsFavorite((prevFavorites) => ({
      ...prevFavorites,
      [movie.id]: !prevFavorites[movie.id],
    }));
  };

  // Function to handle opening the popup and setting the selected movie ID
  const handleMovieClick = (movieId) => {
    setSelectedMovieId(movieId);
    setShowPopup(true);
  };

  // Function to handle closing the popup
  const handleClosePopup = () => {
    setShowPopup(false);
  };

  if (loading) {
    // Add a loading state if necessary
    return <div>Loading...</div>;
  }

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5, // Number of movies to show in the slider at once
    slidesToScroll: 1,
    autoplay: true, // Enable autoplay for automatic scrolling
    autoplaySpeed: 3000, //  // Custom right arrow component
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
                {isFavorite[movie.id] ? (
                  <AiFillHeart
                    className="text-purple-800 text-xl h-13 w-13 rounded-md cursor-pointer"
                    onClick={(event) => {
                      event.stopPropagation(); // Prevent click event from bubbling up
                      handleAddToFavorites(movie);
                    }}
                  />
                ) : (
                  <FiHeart
                    className="text-purple-800 text-xl h-13 w-13 rounded-md cursor-pointer"
                    onClick={(event) => {
                      event.stopPropagation(); // Prevent click event from bubbling up
                      handleAddToFavorites(movie);
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
      {/* Render the MovieDetailsPopup when showPopup is true */}
      {showPopup && (
        <MovieDetailsPopup
          movieId={selectedMovieId}
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
};

export default TopRated;
