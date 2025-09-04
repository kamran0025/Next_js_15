"use client";

import createPostAction from "@/action/createPost";
import React, { useActionState } from "react";

const CreatePostForm: React.FC = () => {
  const initialState = { success: false, message: "" };
  const [state, formAction, isPending] = useActionState(
    createPostAction,
    initialState
  );
  return (
      <div className="bg-white rounded-lg shadow-md max-w-2xl w-full p-6 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Create New Post
        </h2>
        <form action={formAction} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username" // Name attribute is crucial for form data
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Your username"
            />
          </div>
          <div>
            <label
              htmlFor="imageUrl"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Image Url
            </label>
            <input
              type="text"
              id="imageUrl"
              name="imageUrl" // Name attribute is crucial for form data
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Please Add a valid image URL"
            />
          </div>

          <div>
            <label
              htmlFor="caption"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Caption
            </label>
            <textarea
              id="caption"
              name="caption"
              rows={3}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Write your caption here..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
            disabled={isPending}
          >
            {isPending ? "Creating..." : "Create Post"}
          </button>
        </form>
        {state.message && (
          <p
            className={`text-sm pt-1 ${
              state.success ? "text-green-600" : "text-red-600"
            }`}
          >
            {state.message}
          </p>
        )}
      </div>
  );
};

export default CreatePostForm;
