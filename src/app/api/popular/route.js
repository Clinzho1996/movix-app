// pages/api/popular.js
import axios from "axios";
import { NextResponse } from "next/server";

const handler = async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_MOVIE_DB_API_KEY}`
    );

    // console.log("TMDb API response:", response.data.results); // Log the response data

    return new NextResponse(response.data.results, { status: 200 });
  } catch (error) {
    console.error("Error fetching popular movies:", error.message);
    return new NextResponse("Error fetching data", { status: 500 });
  }
};

export { handler as GET };
