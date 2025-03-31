import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../contexts/AuthContext';

const postSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255, 'Title is too long'),
  content: z.string().min(1, 'Content is required'),
});

type PostFormData = z.infer<typeof postSchema>;

export function CreatePost() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
  });

  const onSubmit = async (data: PostFormData) => {
    if (!user) {
      alert('You must be logged in to create a post.');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Missing token. Please log in again.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/posts/create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const text = await response.text();
      if (!response.ok) {
        console.error('❌ Create post failed:', text);
        alert('Failed to create post. Are you logged in?');
        return;
      }

      navigate('/');
    } catch (error) {
      console.error('🚨 Error creating post:', error);
      alert('Error creating post. Please try again.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 text-gray-100">
      <h1 className="text-3xl font-semibold mb-8">Create New Post</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-300">
            Title
          </label>
          <input
            type="text"
            id="title"
            {...register('title')}
            className="p-2 pl-3 mt-1 block w-full rounded-xl bg-[#1e1e1e] border border-[#2b2b2b] text-gray-100 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter your title"
          />
          {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>}
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-300">
            Content
          </label>
          <textarea
            id="content"
            rows={8}
            {...register('content')}
            className="p-2 pl-3 mt-1 block w-full rounded-xl bg-[#1e1e1e] border border-[#2b2b2b] text-gray-100 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500"
            placeholder="Write something deep..."
          />
          {errors.content && <p className="text-sm text-red-500 mt-1">{errors.content.message}</p>}
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl text-sm font-medium transition"
        >
          Publish Post
        </button>
      </form>
    </div>
  );
}
