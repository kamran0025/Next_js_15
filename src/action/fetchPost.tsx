'use server';

export const fetchPost = async (id: string) => {
  const response = await fetch(`http://localhost:8000/fetchPost/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch photo');
  }
  return response.json();
};
