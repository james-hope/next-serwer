import { PostT } from "@/types/types";

type Props = {
  post: PostT;
};

const Post = ({ post }: Props) => {
  return (
    <>
      <div className="post" key={post.name}>
        <p className="title">
          Post {post.id}/{500}
        </p>
        <p className="title">
          Strona {post.postId}/{100}
        </p>
        <p className="author">
          Autor: {post.email.slice(0, post.email.indexOf("@"))}
        </p>
        <p>{post.body}</p>
      </div>
    </>
  );
};

export default Post;
