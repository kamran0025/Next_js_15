import { InstagramPost } from "@/components/instagramPost";
import React from "react";
import { ALLPOSTSAPIRESPONSE } from "../page";
import { fetchPost } from "@/action/fetchPost";

type PostProps = {
  params: Promise<{ id: string }>;
};

const Post: React.FC<PostProps> = async ({ params }) => {
  const id  = (await params).id;
  console.log({ id });
    const postApiResponse: Promise<ALLPOSTSAPIRESPONSE> = fetchPost(id)
  
  return (
      <InstagramPost
        username="traveler_explorer"
        avatarUrl="https://placehold.co/100x100/A0B0C0/FFFFFF?text=User"
        postImageUrl="https://placehold.co/600x600/87CEEB/FFFFFF?text=Beautiful+Landscape"
        initialLikes={1234}
        caption="Exploring the breathtaking beauty of the mountains! What an incredible view. #nature #mountains #travel"
        timestamp="1 DAY AGO"
        initialComments={[
          { user: "nature_lover", text: "Stunning photo!" },
          { user: "adventure_seeker", text: "Wish I was there!" },
          { user: "photo_enthusiast", text: "Amazing shot!" },
        ]}
        postApiResponse={postApiResponse}
      />
  );
};

export default Post;
