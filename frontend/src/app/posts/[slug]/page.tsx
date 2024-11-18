'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { usePathname, useSearchParams } from 'next/navigation'
import Header from '@/app/components/Header/Header';
import Footer from '@/app/components/Footer/Footer';

require('dotenv').config();

interface Post {
  id: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  slug: string;
}

const PostPage: React.FC = () => {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {


    if (!pathname || !searchParams) return;
    if (!searchParams) return;

    const fetchPost = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_DATA_ACCESS}?slug=${searchParams}`);
        setPost(response.data[0]);
      } catch (error) {
        console.error('Error fetching post:', error);
        setError('Failed to load post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [pathname, searchParams]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!post) {
    return <div>Post not found.</div>;
  }

  return (
    <>
      <Header />
      <div>
        <h1>{post.title.rendered}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
      </div>
      <Footer />
    </>
  );
};

export default PostPage;