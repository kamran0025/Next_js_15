import { fetchAllPosts } from "@/action/fetchAllPosts";
import InstagramProfilePage from "@/components/instagramProfilePage";
import React from "react";

export interface PostThumbnail {
  id: string;
  imageUrl: string;
  alt: string;
}

export interface ALLPOSTSAPIRESPONSE {
  _id: string;
  username: string;
  imageUrl: string;
  caption: string;
  createdAt: string;
}

// Main Profile component to render the InstagramProfilePage
const Profile: React.FC = async () => {
  const postApiResponse: Promise<ALLPOSTSAPIRESPONSE[]> = fetchAllPosts()

  return (
    <InstagramProfilePage
      username="explorer_journey"
      avatarUrl="https://placehold.co/128x128/6A5ACD/FFFFFF?text=User"
      bio="Adventure seeker | Photographer | Sharing moments from around the world. 🌍✈️"
      postsCount={150}
      followersCount={12345}
      followingCount={789}
      posts={postApiResponse}
    />
  );
};

export default Profile;
