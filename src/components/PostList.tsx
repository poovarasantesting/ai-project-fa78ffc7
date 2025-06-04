import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function PostList({ posts }: { posts: Post[] }) {
  if (posts.length === 0) {
    return <div className="text-center py-8 text-gray-500">No posts yet. Create your first post!</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Recent Posts</h2>
      {posts.map((post) => (
        <Card key={post.id} className="w-full">
          <CardHeader>
            <CardTitle>{post.title}</CardTitle>
            <p className="text-sm text-gray-500">
              {new Date(post.date).toLocaleDateString()}
            </p>
          </CardHeader>
          <CardContent>
            <p>{post.content}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}