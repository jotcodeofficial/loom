import { GetStaticProps } from "next";
import { hostname } from "os";
import Header from "../../components/Header";
import { sanityClient, urlFor } from "../../sanity";
import { Post } from "../../typings";

interface Props {
  post: Post;
}

function Post({ post }: Props) {
  console.log(post);
  return (
    <main>
      <Header />
      <div className="bg-slate-100 h-screen">
        <div className="max-w-3xl mx-auto p-5">
          <article>
            <div className="mb-4">
              <span>CATEGIRY</span>
            </div>
            <h1 className="text-5xl mb-4">{post.title}</h1>
            <h2 className="text-3xl mb-4 text-slate-600 font-light">
              {post.description}
            </h2>
            <img
              className="w-full"
              src={urlFor(post.mainImage).url()!}
              alt=""
            />
            <div>
              <img
                className="h-10 w-10 rounded-full"
                src={urlFor(post.author.image).url()!}
                alt=""
              />
              <p className="font-extralight text-sm">
                Blog post by {post.author.name} - Published at{" "}
                {new Date(post._createdAt).toLocaleDateString()}
              </p>
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
