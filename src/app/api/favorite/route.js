import connect from "@/utils/db";
import Favorite from "@/models/Favorite";

export const GET = async (request) => {
  try {
    await connect();
    const favorites = await Favorite.find({}).populate("creator");
    return new Response(JSON.stringify(favorites), { status: 201 });
  } catch (error) {
    return new Response("Failed to fetch favorite movies", { status: 500 });
  }
};

