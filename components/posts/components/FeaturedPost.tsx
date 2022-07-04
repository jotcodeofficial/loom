import Link from "next/link";
import { urlFor } from "../../../sanity";
import { Post } from "../../../typings";
import PostAuthorBox from "./PostAuthorBox";

export default function FeaturedPost({ post }: { post: Post }) {
  return (
    <div className="p-2 md:p-6 max-w-6xl mx-auto">
      <Link key={post._id} href={`/post/${post.slug.current}`}>
        <div className="group cursor-pointer overflow-hidden flex">
          <div className="relative w-2/3">
            {post.mainImage ? (
              <div className="">
                <img
                  className="h-96 w-full object-cover"
                  src={urlFor(post.mainImage).url()!}
                  alt=""
                />
                <span className="absolute top-3 right-3  h-5 w-15 inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-blue-900 text-white">
                  <b> {"category 1".toUpperCase()} </b>
                </span>
              </div>
            ) : (
              <div className="">
                <span className="absolute top-0 right-0 block h-1.5 w-1.5 transform -translate-y-1/2 translate-x-1/2 rounded-full ring-2 ring-white bg-gray-300" />
                <img
                  src="/images/image-unavailable.png"
                  alt=""
                  className="h-96 w-full object-cover"
                />
              </div>
            )}
          </div>
          <div className="flex w-1/3 pl-6">
            <div>
              <p className="text-4xl font-bold mb-4">
                {post.title.length > 66
                  ? post.title.substring(0, 66) + "..."
                  : post.title}
              </p>
              <p className="text-xl text-slate-600 mb-4">
                {post.description.length > 158
                  ? post.description.substring(0, 158) + "..."
                  : post.description}
              </p>

              <PostAuthorBox post={post}></PostAuthorBox>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
