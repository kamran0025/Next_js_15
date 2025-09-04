"use client";
import { deletePost } from "@/action/deletePost";
import { ALLPOSTSAPIRESPONSE } from "@/app/profile/page";
import { Bookmark } from "@/assets/bookmark";
import { Heart } from "@/assets/heart";
import { MessageCircle } from "@/assets/messageCircle";
import { MoreHorizontal } from "@/assets/moreHorizontal";
import { Send } from "@/assets/send";
import { Trash2 } from "@/assets/transh2";
import { useRouter } from 'next/navigation';
import { use, useState } from "react";
interface Comment {
  user: string;
  text: string;
}

// Define types for the component props
interface InstagramPostProps {
  username: string;
  avatarUrl: string;
  postImageUrl: string;
  initialLikes: number;
  caption: string;
  timestamp: string;
  initialComments: Comment[];
  postApiResponse: Promise<ALLPOSTSAPIRESPONSE>; // Optional prop for post data
}

export const InstagramPost: React.FC<InstagramPostProps> = ({
  username,
  avatarUrl,
  initialLikes,
  caption,
  timestamp,
  initialComments,
  postApiResponse,
}) => {
  const postData = use(postApiResponse);
  const router = useRouter();
  const [likes, setLikes] = useState<number>(initialLikes);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState<string>("");
  const [showDeleteOption, setShowDeleteOption] = useState<boolean>(false); // State for delete option visibility

  // Handle liking/unliking the post
  const handleLike = (): void => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  };

  // Handle adding a new comment
  const handleAddComment = (): void => {
    if (newComment.trim()) {
      setComments([...comments, { user: "You", text: newComment.trim() }]);
      setNewComment("");
    }
  };

  // Handle deleting a comment
  const handleDeleteComment = (indexToDelete: number): void => {
    setComments(comments.filter((_, index) => index !== indexToDelete));
  };

  const handleMoreOptionsClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent event from bubbling up to parent divs
    setShowDeleteOption(!showDeleteOption);
  };

  const handleDeletePost = async () => {
    await deletePost(postData._id)
    router.push("/profile");
  }

  return (
    <div className="bg-white rounded-lg shadow-md max-w-xl mx-auto border border-gray-200 relative">
      {/* Post Header */}
      <div className="flex items-center p-4">
        <img
          src={avatarUrl}
          alt={`${username}'s avatar`}
          className="w-10 h-10 rounded-full object-cover mr-3 border border-gray-300"
          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src =
              "https://placehold.co/40x40/cccccc/333333?text=AV";
          }}
        />
        <div className="flex-grow">
          <p className="font-semibold text-gray-800">{username}</p>
        </div>
        <div className="flex items-center p-4">
          <MoreHorizontal
            className="text-gray-500 cursor-pointer"
            onClick={handleMoreOptionsClick} // Add click handler
          />
        </div>
      </div>
      {showDeleteOption && (
        <div className="absolute right-7 top-12 mt-0 w-32 bg-white rounded-md shadow-lg py-1 z-20 border border-gray-200">
          <button
            onClick={handleDeletePost}
            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer"
          >
            Delete
          </button>
        </div>
      )}
      {/* Post Image */}
      <div className="w-full bg-gray-100 flex items-center justify-center overflow-hidden">
        <img
          src={postData.imageUrl}
          alt="Post content"
          className="w-full object-cover"
          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src =
              "https://placehold.co/600x600/e0e0e0/555555?text=Post+Image";
          }}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center p-4">
        <div className="flex space-x-4">
          <Heart
            className={`cursor-pointer ${
              isLiked ? "fill-red-500 text-red-500" : "text-gray-700"
            }`}
            size={24}
            onClick={handleLike}
          />
          <MessageCircle className="text-gray-700 cursor-pointer" size={24} />
          <Send className="text-gray-700 cursor-pointer" size={24} />
        </div>
        <div>
          <Bookmark className="text-gray-700 cursor-pointer" size={24} />
        </div>
      </div>

      {/* Likes Count */}
      <div className="px-4 pb-2">
        <p className="font-semibold text-sm text-gray-800">{likes} likes</p>
      </div>

      {/* Caption */}
      <div className="px-4 pb-2">
        <p className="text-sm text-gray-800">
          <span className="font-semibold">{username}</span> {caption}
        </p>
      </div>

      {/* Comments Section */}
      <div className="px-4 pb-2">
        {comments.length > 0 && (
          <p className="text-sm text-gray-500 mb-1 cursor-pointer">
            View all {comments.length} comments
          </p>
        )}
        {comments.map((comment, index) => (
          <div
            key={index}
            className="flex justify-between items-center text-sm text-gray-800 group"
          >
            <p>
              <span className="font-semibold">{comment.user}</span>{" "}
              {comment.text}
            </p>
            {/* Delete button for comments */}
            <Trash2
              className="text-gray-400 hover:text-red-500 cursor-pointer ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              size={16}
              onClick={() => handleDeleteComment(index)}
            />
          </div>
        ))}
      </div>

      {/* Add Comment Input */}
      <div className="flex items-center p-4 border-t border-gray-200">
        <input
          type="text"
          placeholder="Add a comment..."
          className="flex-grow border-none focus:ring-0 focus:outline-none text-sm py-1 px-2 rounded-full bg-gray-100 mr-3"
          value={newComment}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewComment(e.target.value)
          }
          onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") {
              handleAddComment();
            }
          }}
        />
        <button
          onClick={handleAddComment}
          className="text-blue-500 font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!newComment.trim()}
        >
          Post
        </button>
      </div>

      {/* Timestamp */}
      <div className="px-4 pb-4">
        <p className="text-xs text-gray-400 uppercase">{timestamp}</p>
      </div>
    </div>
  );
};
