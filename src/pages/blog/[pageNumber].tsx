import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { PostT } from "@/types/types";
import { fetchPost } from "@/api/api";
import Post from "@/components/Post";
import styles from "@/styles/Home.module.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const BlogPost = () => {
  const router = useRouter();
  const [posts, setPosts] = useState<PostT[]>([]);

  const {
    query: { pageNumber },
  } = router;

  useEffect(() => {
    const performFetch = async () => {
      const thePosts = await fetchPost(pageNumber as string);
      setPosts(thePosts);
    };
    !posts.length && performFetch();
  }, [pageNumber, posts.length]);

  return (
    <main className={`${styles.main} ${inter.className}`}>
      <div className={`${inter.className} ${styles.center} text`}>
        To jest strona nr {pageNumber}
      </div>

      <div className="posts">
        {posts?.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </main>
  );
};

export default BlogPost;
