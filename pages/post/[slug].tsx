import { GetStaticProps } from "next";
import Header from "../../components/Header";
import { sanityClient, urlFor } from "../../sanity";
import { Post } from "../../typings";
import PortableText from "react-portable-text";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import the FontAwesomeIcon component
import {
  faTwitter,
  faFacebookSquare,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons"; // import the icons you need
import PostAuthorBox from "../../components/posts/components/PostAuthorBox";

function Post({ post }: { post: Post }) {
  return (
    <main>
      <Header />
      <div className="bg-slate-100 min-h-screen">
        <div className="max-w-3xl mx-auto p-5">
          <article>
            <div className="mb-4 mt-4 text-sm">CATEGORY</div>

            <h1 className="text-5xl font-bold mb-6">
              {post.title.length > 66
                ? post.title.substring(0, 66) + "..."
                : post.title}
            </h1>
            <h2 className="text-2xl mb-6 text-slate-600 font-light">
              {post.description.length > 158
                ? post.description.substring(0, 158) + "..."
                : post.description}
            </h2>
            <div className="flex justify-between">
              <div className="flex items-center space-x-2 mb-6">
                <PostAuthorBox post={post}></PostAuthorBox>
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
            {post.showThumbnailInPost === true && (
              <img
                className="w-full"
                src={urlFor(post.mainImage).url()!}
                alt=""
              />
            )}

            <div className="">
              <PortableText
                dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
                projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
                content={post.body}
                serializers={{
                  normal: (props: any) => <p className="my-5" {...props} />,
                  h1: (props: any) => (
                    <h1 className="text-4xl font-bold my-5" {...props} />
                  ),
                  h2: (props: any) => (
                    <h2 className="text-3xl font-bold my-5" {...props} />
                  ),
                  h3: (props: any) => (
                    <h2 className="text-2xl font-bold my-5" {...props} />
                  ),
                  li: ({ children }: any) => (
                    <li className="ml-4 list-disc">{children}</li>
                  ),
                  link: ({ href, children }: any) => (
                    <a
                      href={href}
                      target="_blank"
                      className="text-blue-500 hover:underline"
                    >
                      {children}
                    </a>
                  ),
                }}
              />
            </div>
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
  *[_type == "post"] {
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
      body,
      showThumbnailInPost,
      "numberOfCharacters": length(pt::text(body)),
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
