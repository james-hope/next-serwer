import { PostT } from "@/types/types";
import { fetchPost } from "@/api/api";
import Post from "@/components/Post";
import styles from "@/styles/Home.module.css";
import { Inter } from "next/font/google";
import { GetServerSideProps } from "next";

const inter = Inter({ subsets: ["latin"] });

type Props = {
  pageNumber: number;
  postsPerPage: PostT[];
};

const BlogPost = ({ pageNumber, postsPerPage }: Props) => {
  return (
    <main className={`${styles.main} ${inter.className}`}>
      <div className={`${inter.className} ${styles.center} text`}>
        To jest strona nr {pageNumber}
      </div>

      <div className="posts">
        {postsPerPage?.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const {
    query: { pageNumber },
  } = ctx;

  const postsPerPage = await fetchPost(pageNumber as string);

  return {
    props: { postsPerPage, pageNumber },
  };
};

export default BlogPost;
