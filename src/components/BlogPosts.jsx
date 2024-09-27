import React from "react";
import { useMediaQuery } from 'react-responsive';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

import BlogPost from './BlogPost.jsx';

const queryClient = new QueryClient();

const GetBlogPosts = () => {
  // const [posts, setPosts] = useState([]);

  const perPage = 4;
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  async function fetchPosts() {
    const response = await fetch(`https://tyleringram.com/blog/wp-json/wp/v2/posts?per_page=${perPage}&_embed`);
    if (!response.ok) {
      throw new Error('Network fetch failed');
    }
    return response.json();
  }

  const { data, error, isLoading } = useQuery('posts', fetchPosts);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching posts: {error}</div>;

  return (
    <>
      <h2>Lastest Posts</h2>
        {isMobile ? (
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={10}
            slidesPerView={1}
            loop={true}
            pagination={{ clickable: true }}
            navigation={true}
          >
            {!error && data.map((post) => (
              <SwiperSlide
                key={post.id}
              >
                <BlogPost post={post} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="blogposts__content">
            {!error && data.length > 0 && data.map((post) => (
             <BlogPost key={post.id} post={post} />
            ))}
          </div>
        )}
    </>
  );
};

function BlogPosts() {
  return (
    <QueryClientProvider client={queryClient}>
      <GetBlogPosts />
    </QueryClientProvider>
  );
}

export default BlogPosts;