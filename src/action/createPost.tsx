"use server";
type ActionState = {
  success: boolean;
  message: string;
};

export default async function createPostAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const username = formData.get("username") as string;
  const caption = formData.get("caption") as string;
  const imageUrl = formData.get("imageUrl") as File; // This will be the File object

  if (!username || !caption || !imageUrl) {
    return {
      success: false,
      message: "Username, Caption, and an Image Url are required.",
    };
  }
  const res = await fetch("http:localhost:8000/posts", {
    method: "POST",
    body: JSON.stringify({
      username,
      caption,
      imageUrl,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const response = await res.json();

  console.log("Response from server:", response.message);

  await new Promise((resolve) => setTimeout(resolve, 1500));

  if (response?.postId) {
    return { success: true, message: "Post created successfully!" };
  } else {
    return {
      success: false,
      message: response.message || "Failed to create post. Please try again.",
    };
  }
}
