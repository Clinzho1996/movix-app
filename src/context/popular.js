import axios from "axios";

export const getPopularMovies = async (req, res) => {
  try {
    const options = {
      url: "https://api.themoviedb.org/3/movie/popular",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYTAwZTNkMmE4ODMwNjdkNWM2NGMzYjU3ZDNkOTlmNyIsInN1YiI6IjY0MGYxYTM3ZWRlMWIwMDBhMmExNjEzOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8BVsBo6RPlDSRlYoWlRydyS4XEw7felpg50mX6HAsmk",
      },
    };

    const response = await axios.request(options);
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
