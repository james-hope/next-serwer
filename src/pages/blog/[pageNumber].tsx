import { fetchPost } from "@/api/api";
import Post from "@/components/Post";
import styles from "@/styles/Home.module.css";
import { Inter } from "next/font/google";
import { GetStaticPaths, GetStaticProps } from "next";
import { PostT } from "@/types/types";

const inter = Inter({ subsets: ["latin"] });

type Props = {
  pageNumber: number;
  postPerPage: PostT[];
};

const BlogPost = ({ pageNumber, postPerPage }: Props) => {
  return (
    <main className={`${styles.main} ${inter.className}`}>
      <div className={`${inter.className} ${styles.center} text`}>
        To jest strona nr {pageNumber}
      </div>

      <div className="posts">
        {postPerPage?.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </main>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  // @ts-ignore
  const allPaths = [...Array(5).keys()].map((el) => ({
    params: { pageNumber: String(el) },
  }));

  return {
    paths: allPaths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const {
    // @ts-ignore
    params: { pageNumber },
  } = ctx;

  const postPerPage = await fetchPost(pageNumber as string);

  return {
    props: { pageNumber, postPerPage },
  };
};

export default BlogPost;
