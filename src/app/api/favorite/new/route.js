import connect from "@/utils/db";
import Favorite from "@/models/Favorite";

export const POST = async (request) => {
  const { userId, movieid, name, image, genre } = await request.json();

  try {
    await connect();

    // Verify that the required fields (userId and creator) are provided
    if (!userId || !name) {
      return new Response("User ID and Name are required.", { status: 400 });
    }

    // Convert the genre array to a comma-separated string
    const genreString = genre ? genre.join(", ") : "";

    const newFavorite = new Favorite({
      creator: userId,
      movieid,
      name,
      image,
      genre: genreString,
    });

    // Save the newFavorite document to the database
    const savedFavorite = await newFavorite.save();

    // Return a success response with the created favorite
    return new Response(JSON.stringify(savedFavorite), { status: 201 });
  } catch (error) {
    console.error("Error creating a new favorite:", error);
    return new Response("Failed to create a new favorite", { status: 500 });
  }
};
