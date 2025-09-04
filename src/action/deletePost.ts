"use server";

export const deletePost = async (id: string) => {
  const response = await fetch(`http://localhost:8000/deletePost/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch photo");
  }
  return response.json();
};
