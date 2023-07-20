import axios from "axios";
import { NextResponse } from "next/server";

const handler = async (req, res) => {
  try {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.MOVIE_DB_API_KEY}`;

    const response = await axios.get(url);
    return new NextResponse(response.data, { status: 200 });
  } catch (error) {
    console.error("Error fetching top-rated movies:", error.message);
    return new NextResponse("Error fetching top-rated movies.", {
      status: 500,
    });
  }
};

export { handler as GET };
