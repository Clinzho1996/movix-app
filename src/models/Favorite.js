import mongoose from "mongoose";

const { Schema } = mongoose;

const favoriteMovieSchema = new Schema(
  {
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    movieid: {
      type: String,
      require: false,
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
let FavoriteMovieModel;
try {
  FavoriteMovieModel =
    mongoose.models.FavoriteMovie ||
    mongoose.model("FavoriteMovie", favoriteMovieSchema);
} catch (error) {
  // Handle any errors that occurred during model creation
  console.error("Error creating FavoriteMovie model:", error.message);
}

export default FavoriteMovieModel;
