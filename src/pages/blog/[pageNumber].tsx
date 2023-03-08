import { fetchPost } from "@/api/api";
import Post from "@/components/Post";
import styles from "@/styles/Home.module.css";
import { Inter } from "next/font/google";
import { GetStaticPaths, GetStaticProps } from "next";
import { PostT } from "@/types/types";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

type Props = {
  pageNumber: number;
  postPerPage: PostT[];
  timeStamp: string;
};

const BlogPost = ({ pageNumber, postPerPage, timeStamp }: Props) => {
  const router = useRouter();

  const handleClick = async () => {
    await fetch(`https://localhost:3000/api/revalidate?secret=zupa`);
  };

  if (router.isFallback) {
    return <p>zupazupazupa</p>;
  }

  return (
    <main className={`${styles.main} ${inter.className}`}>
      <div className={`${inter.className} ${styles.center} text`}>
        To jest strona nr {pageNumber}
      </div>
      <p style={{ fontSize: 40 }}>timeStamp: {timeStamp}</p>
      <button onClick={handleClick}>REVALIDUJ</button>

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
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const {
    // @ts-ignore
    params: { pageNumber },
  } = ctx;

  const postPerPage = await fetchPost(pageNumber as string);
  const timeStamp = new Date();

  return {
    props: { pageNumber, postPerPage, timeStamp },
  };
};

export default BlogPost;
