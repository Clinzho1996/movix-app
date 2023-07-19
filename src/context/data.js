// data.js

const movieData = [
  {
    id: 1,
    title: "Movie 1",
    genre: "Action",
    year: 2021,
    icon: "film", // Font Awesome icon name for movie
    banner: "https://example.com/movie1-banner.jpg", // Replace with the actual image URL
  },
  {
    id: 2,
    title: "Movie 2",
    genre: "Comedy",
    year: 2019,
    icon: "film",
    banner: "https://example.com/movie2-banner.jpg", // Replace with the actual image URL
  },
  {
    id: 3,
    title: "Movie 3",
    genre: "Drama",
    year: 2020,
    icon: "film",
    banner: "https://example.com/movie3-banner.jpg", // Replace with the actual image URL
  },
  // Add more movie data here
];

const navLinks = [
  {
    id: 1,
    title: "Home",
    path: "/",
    icon: "home", // Font Awesome icon name for home
  },
  {
    id: 2,
    title: "Movies",
    path: "/movies",
    icon: "film",
  },
  {
    id: 3,
    title: "TV Shows",
    path: "/tv-shows",
    icon: "tv",
  },
  {
    id: 4,
    title: "Favorites",
    path: "/favorites",
    icon: "heart",
  },
];

const sidebarLinks = [
  {
    id: 1,
    title: "Action",
    path: "/genre/action",
    icon: "rocket",
  },
  {
    id: 2,
    title: "Comedy",
    path: "/genre/comedy",
    icon: "laugh",
  },
  {
    id: 3,
    title: "Drama",
    path: "/genre/drama",
    icon: "theater-masks",
  },
  // Add more genre links here
];

export { movieData, navLinks, sidebarLinks };
