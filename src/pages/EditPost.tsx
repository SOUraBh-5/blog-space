import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../contexts/AuthContext';

const postSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255, 'Title is too long'),
  content: z.string().min(1, 'Content is required'),
});

type PostFormData = z.infer<typeof postSchema>;

export function EditPost() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
  });

  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await fetch(`blog-backend-production-09df.up.railway.app/api/posts/${id}/`);
        const data = await res.json();
        if (data.username !== user?.username) {
          navigate('/');
          return;
        }
        reset({ title: data.title, content: data.content });
      } catch (error) {
        console.error('Error loading post:', error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    }

    if (id && user) fetchPost();
  }, [id, user, navigate, reset]);

  const onSubmit = async (data: PostFormData) => {
    const token = localStorage.getItem('token');
    if (!token || !id) return;

    try {
      const res = await fetch(`blog-backend-production-09df.up.railway.app/api/posts/${id}/edit/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('Update failed');
      navigate(`/post/${id}`);
    } catch (err) {
      console.error('Error updating post:', err);
      alert('Error updating post.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh] text-gray-400">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-semibold text-white mb-8">Edit Post</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm text-gray-300 mb-1">
            Title
          </label>
          <input
            id="title"
            type="text"
            {...register('title')}
            className="w-full bg-transparent border border-gray-600 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.title && (
            <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="content" className="block text-sm text-gray-300 mb-1">
            Content
          </label>
          <textarea
            id="content"
            rows={8}
            {...register('content')}
            className="w-full bg-transparent border border-gray-600 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.content && (
            <p className="text-sm text-red-500 mt-1">{errors.content.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition"
        >
          Update Post
        </button>
      </form>
    </div>
  );
}
