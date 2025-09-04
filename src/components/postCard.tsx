import { Heart } from "@/assets/heart";
import { MessageCircle } from "@/assets/messageCircle";

interface PostCardProps {
  imageUrl: string;
  alt: string;
}

const PostCard: React.FC<PostCardProps> = ({ imageUrl, alt }) => {
  return (
    <>
      <img
        src={imageUrl}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src =
            "https://placehold.co/300x300/e0e0e0/555555?text=Post";
        }}
      />
      {/* Optional: Overlay for likes/comments on hover */}
      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="text-white text-lg font-semibold">
          <Heart size={20} className="inline-block mr-1" /> 123{" "}
          <MessageCircle size={20} className="inline-block ml-3 mr-1" /> 45
        </span>
      </div>
    </>
  );
};

export default PostCard;
