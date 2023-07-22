import mongoose from "mongoose";

const { Schema } = mongoose;

const favoriteMovieSchema = new Schema(
  {
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false, // Consider making this field not required
    },
    genre: {
      type: String,
      required: false, // Consider making this field not required
    },
  },
  { timestamps: true }
);

// If the FavoriteMovie collection does not exist, create a new one.
export default mongoose.models.FavoriteMovie ||
  mongoose.model("FavoriteMovie", favoriteMovieSchema);
