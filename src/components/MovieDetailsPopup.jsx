import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { MdClose } from "react-icons/md";

const MovieDetailsPopup = ({ movieId, onClose }) => {
  const [movieDetails, setMovieDetails] = useState(null);

  const API_KEY = process.env.NEXT_PUBLIC_MOVIE_DB_API_KEY;
  const MOVIE_DETAILS_URL = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`;
  const MOVIE_CREDITS_URL = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}`;

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const [detailsResponse, creditsResponse] = await Promise.all([
          axios.get(MOVIE_DETAILS_URL),
          axios.get(MOVIE_CREDITS_URL),
        ]);

        const castWithImages = creditsResponse.data.cast
          .slice(0, 5)
          .map((actor) => ({
            ...actor,
            image: `https://image.tmdb.org/t/p/w500/${actor.profile_path}`,
          }));

        setMovieDetails({
          ...detailsResponse.data,
          cast: castWithImages,
        });
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [MOVIE_DETAILS_URL, MOVIE_CREDITS_URL]);

  if (!movieDetails) {
    return <div>Loading movie details...</div>;
  }

  return (
    <div className="movie-details-popup w-[80%] items-center align-middle justify-center bg-gray-700 p-5 rounded-lg relative">
      {/* Display the movie details, cast, rating, and a "Watch Now" button */}
      {/* Implement the layout and content as desired */}
      <button
        className="close-btn absolute right-4 top-2 bg-purple-700 p-2 rounded-full"
        onClick={onClose}
      >
        <MdClose className="text-2xl text-white " />
      </button>
      <div className="flex flex-row gap-5">
        <div className="flex-2">
          <Image
            src={`https://image.tmdb.org/t/p/w500/${movieDetails?.poster_path}`}
            alt="movie image"
            width={250}
            height={300}
            className="rounded-md"
          />
        </div>
        <div className="mt-5 pr-20">
          <h2 className="text-3xl font-bold text-white">
            {movieDetails.title}
          </h2>
          <p className="text-gray-200">{movieDetails.overview}</p>
          <p className="mt-3 text-white">
            <span className="text-xl font-bold text-white mr-2">
              Vote Average:
            </span>
            {movieDetails.vote_average}
          </p>
          <h3 className="mt-5 font-bold text-2xl text-white">Cast:</h3>
          <div className="flex flex-row mb-3">
            <ul className="flex gap-5">
              {movieDetails.cast.map((actor) => (
                <li
                  key={actor.id}
                  className="flex flex-row gap-2 items-center text-gray-200"
                >
                  <Image
                    src={actor.image}
                    alt="actor"
                    className="rounded-full"
                    width={50}
                    height={50}
                  />
                  {actor.name}
                </li>
              ))}
            </ul>
          </div>
          <button className="text-white bg-purple-800 p-3 w-[150px] rounded-md cursor-pointer h-13">
            Watch Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPopup;
