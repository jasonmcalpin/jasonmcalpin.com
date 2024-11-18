import axios from 'axios';
import Link from 'next/link';
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

interface HomeProps {
  posts: Post[];
}

const fetchPosts = async (): Promise<Post[]> => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_DATA_ACCESS}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const Home: React.FC<HomeProps> = async () => {
  const posts = await fetchPosts();

  return (
    <>
      <Header />
      <div>
        <h1>Blog Posts</h1>
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <Link href={`/posts/${post.slug}`}>
                {post.title.rendered}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </>
  );
};

export default Home;