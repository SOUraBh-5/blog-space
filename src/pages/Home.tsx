import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

interface Post {
  id: string;
  title: string;
  content: string;
  created_at: string;
  username: string;
}

export function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch('blog-backend-production-09df.up.railway.app/api/posts/');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error loading posts:', error);
      }
    }
    fetchPosts();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-[#f4f4f5] mb-8">Latest Posts</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link
            to={`/post/${post.id}`}
            key={post.id}
            className="p-6 bg-[#262628] border border-[#333] rounded-2xl shadow hover:shadow-lg transition-all"
          >
            <h2 className="text-xl font-semibold text-[#f4f4f5] mb-2">{post.title}</h2>
            <p className="text-sm text-gray-400 mb-2">
              By {post.username} • {format(new Date(post.created_at), 'MMMM d, yyyy')}
            </p>
            <p className="text-gray-300 line-clamp-3">{post.content}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
