import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Pencil, Trash2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      if (!id) return;

      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/posts/${id}`);
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error('Error fetching post:', error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [id, navigate]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/posts/${id}/delete/`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to delete post');
      navigate('/');
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Error deleting post. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh] text-gray-400">
        Loading post...
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center py-12 text-gray-300">
        <h2 className="text-2xl font-semibold">Post not found</h2>
        <Link to="/" className="text-blue-500 hover:underline mt-4 inline-block">
          Return to home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 text-gray-100">
      <article className="mb-10">
        <h1 className="text-3xl font-semibold mb-3">{post.title}</h1>
        <div className="text-sm text-gray-400 mb-6">
          Posted by {post.username} on {format(new Date(post.created_at), 'MMMM d, yyyy')}
        </div>
        <div className="prose prose-invert prose-sm max-w-none leading-relaxed text-gray-200">
          {post.content.split('\n').map((paragraph: any, index: number) => (
            <p key={index} className="mb-4">
              {paragraph}
            </p>
          ))}
        </div>
      </article>

      {user && user.username === post.username && (
        <div className="flex space-x-3">
          <Link
            to={`/post/${post.id}/edit`}
            className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-sm font-medium text-white rounded-lg transition"
          >
            <Pencil className="w-4 h-4 mr-2" />
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className="flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-sm font-medium text-white rounded-lg transition"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
