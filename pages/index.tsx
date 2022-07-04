import Head from "next/head";
import Header from "../components/Header";
import Posts from "../components/posts/Index";
import { sanityClient, urlFor } from "../sanity";
import { Post } from "../typings";

interface Props {
  posts: Post[];
}

export default function Home({ posts }: Props) {
  return (
    <div className="">
      <Head>
        <title>Loom Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header></Header>
      <div className="pt-5 bg-slate-100 h-screen">
        <Posts posts={posts}></Posts>
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  const query = `*[_type == "post"]{
    _id,
    title,
    author -> {
    name,
    image
  },
  description,
  mainImage,
  slug
  }`;

  const posts = await sanityClient.fetch(query);

  return {
    props: { posts },
  };
};
