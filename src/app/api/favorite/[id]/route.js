import { NextResponse } from "next/server";

export const DELETE = async (request, { params }) => {
  const { movieid } = params;

  try {
    await connect();

    await Post.findByIdAndDelete(movieid);

    return new NextResponse("Movie has been deleted from favorite", {
      status: 200,
    });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
