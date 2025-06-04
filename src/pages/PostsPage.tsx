import { useState } from "react";
import { PostForm } from "@/components/PostForm";
import { PostList } from "@/components/PostList";
import type { Post } from "@/types";

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);

  const handleAddPost = (newPost: Post) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Posts</h1>
      <div className="grid md:grid-cols-[1fr_1fr] gap-8">
        <div className="order-2 md:order-1">
          <PostList posts={posts} />
        </div>
        <div className="order-1 md:order-2">
          <PostForm onAddPost={handleAddPost} />
        </div>
      </div>
    </div>
  );
}