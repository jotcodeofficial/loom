import { GetStaticProps } from "next";
import Header from "../../components/Header";
import { sanityClient, urlFor } from "../../sanity";
import { Post } from "../../typings";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import the FontAwesomeIcon component
import {
  faTwitter,
  faFacebookSquare,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons"; // import the icons you need

interface Props {
  post: Post;
}

function Post({ post }: Props) {
  return (
    <main>
      <Header />
      <div className="bg-slate-100 h-screen">
        <div className="max-w-3xl mx-auto p-5">
          <article>
            <div className="mb-4 mt-4 text-sm">CATEGORY</div>
            <h1 className="text-5xl mb-6">
              <b>{post.title}</b>
            </h1>
            <h2 className="text-2xl mb-6 text-slate-600 font-light">
              {post.description}
            </h2>
            <div className="flex justify-between">
              <div className="flex items-center space-x-2 mb-6">
                <img
                  className="h-10 w-10 rounded-full"
                  src={urlFor(post.author.image).url()!}
                  alt=""
                />
                <div>
                  {" "}
                  <p className="font-extralight text-sm">
                    <b>{post.author.name}</b>
                  </p>
                  <p className="font-extralight text-sm">
                    {new Date(post._createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                Share:{" "}
                <div className="flex items-center ml-2 space-x-2">
                  <FontAwesomeIcon
                    className="w-6 h-6 cursor-pointer"
                    icon={faTwitter}
                  ></FontAwesomeIcon>
                  <FontAwesomeIcon
                    className="w-6 h-6 cursor-pointer"
                    icon={faFacebookSquare}
                  ></FontAwesomeIcon>
                  <FontAwesomeIcon
                    className="w-6 h-6 cursor-pointer"
                    icon={faLinkedin}
                  ></FontAwesomeIcon>
                </div>
              </div>
            </div>
            <img
              className="w-full"
              src={urlFor(post.mainImage).url()!}
              alt=""
            />
          </article>
        </div>
      </div>
    </main>
  );
}

export default Post;

// get all the slugs for the different pages
export const getStaticPaths = async () => {
  const query = `
  *[_type == "post"]{
    _id,
    slug {
      current
    }
  }`;

  const posts = await sanityClient.fetch(query);

  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

// gets the information for each page using each slug
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `
    *[_type == "post" && slug.current == $slug][0]{
      _id,
      _createdAt,
      title,
      author-> {
        name,
        image
      },
      'comments': *[
        _type == "comment" &&
        post._ref == ^._id &&
        approved == true],
      description,
      mainImage,
      slug,
      body
    }`;

  const post = await sanityClient.fetch(query, {
    slug: params?.slug,
  });

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
    revalidate: 600, // every 10 mins update cache
  };
};
