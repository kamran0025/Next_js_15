"use client";
import PostCard from "./postCard";
import { Grid } from "@/assets/grid";
import { Bookmark } from "@/assets/bookmark";
import { User } from "@/assets/user";
import { MoreHorizontal } from "@/assets/moreHorizontal";
import { ALLPOSTSAPIRESPONSE } from "@/app/profile/page";
import { use } from "react";
import { useRouter } from "next/navigation";

interface InstagramProfilePageProps {
  username: string;
  avatarUrl: string;
  bio: string;
  postsCount: number;
  followersCount: number;
  followingCount: number;
  posts: Promise<ALLPOSTSAPIRESPONSE[]>;
}

const InstagramProfilePage: React.FC<InstagramProfilePageProps> = ({
  username,
  avatarUrl,
  bio,
  postsCount,
  followersCount,
  followingCount,
  posts,
}) => {
  const postData = use(posts);
  const router = useRouter();
  return (
    <div className="bg-white max-w-2xl w-full border border-gray-200 shadow-md rounded-lg pb-2 px-2">
      {/* Profile Header */}
      <div className="relative group">
        <div className="absolute inset-0 bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-[85%] transition-opacity duration-300 flex items-center justify-center z-10 rounded-lg">
          <p className="text-lg font-semibold">This part is not clickable</p>
        </div>

        <div className="flex flex-col sm:flex-row items-center p-6 border-b border-gray-200">
          <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-8">
            <img
              src={avatarUrl}
              alt={`${username}'s avatar`}
              className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-2 border-gray-300"
              onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src =
                  "https://placehold.co/128x128/cccccc/333333?text=AV";
              }}
            />
          </div>
          <div className="text-center sm:text-left flex-grow">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
              <h1 className="text-2xl font-light text-gray-800 mb-2 sm:mb-0">
                {username}
              </h1>
              <div className="flex space-x-2 justify-center sm:justify-start">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md font-semibold text-sm hover:bg-blue-600 transition duration-200">
                  Follow
                </button>
                <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md font-semibold text-sm hover:bg-gray-300 transition duration-200">
                  Message
                </button>
                <button className="bg-gray-200 text-gray-800 px-2 py-2 rounded-md hover:bg-gray-300 transition duration-200">
                  <MoreHorizontal size={20} />
                </button>
              </div>
            </div>

            <div className="flex justify-center sm:justify-start space-x-6 mb-4 text-gray-800">
              <div className="text-center">
                <span className="font-semibold">{postsCount}</span> posts
              </div>
              <div className="text-center">
                <span className="font-semibold">{followersCount}</span>{" "}
                followers
              </div>
              <div className="text-center">
                <span className="font-semibold">{followingCount}</span>{" "}
                following
              </div>
            </div>

            <p className="text-sm text-gray-800">{bio}</p>
          </div>
        </div>
      </div>
      {/* Navigation Tabs (Optional, for future expansion) */}
      <div className="flex justify-around border-b border-gray-200 text-gray-500 text-sm font-semibold">
        <button className="flex items-center cursor-pointer space-x-2 py-3 px-4 border-b-2 border-black text-black">
          <Grid size={16} />
          <span>POSTS</span>
        </button>
        <button className="flex items-center space-x-2 py-3 px-4 cursor-not-allowed hover:text-gray-700">
          <Bookmark size={16} />
          <span>SAVED</span>
        </button>
        <button className="flex items-center space-x-2 py-3 px-4 cursor-not-allowed hover:text-gray-700">
          <User size={16} />
          <span>TAGGED</span>
        </button>
      </div>

      {/* Post Grid */}
      <div className="grid grid-cols-3 gap-1 p-1">
        {postData.map((post) => (
          <div
            key={post._id}
            className="relative w-full aspect-square bg-gray-100 overflow-hidden group"
            onClick={() => {
              router.push(`/profile/${post._id}`);
            }}
          >
            <PostCard imageUrl={post.imageUrl} alt={"Failed to load image."} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default InstagramProfilePage;
