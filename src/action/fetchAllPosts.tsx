"use server";

export const fetchAllPosts = async () => {
  const response = await fetch("http://localhost:8000/fetchAllPosts");
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  return response.json();
};
