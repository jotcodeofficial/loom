import Image from "next/image";
import Link from "next/link";
import { urlFor } from "../../../sanity";
import { Post } from "../../../typings";
import PostAuthorBox from "./PostAuthorBox";

export default function DefaultPosts({ posts }: { posts: Post[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6 md:max-w-4xl lg:max-w-6xl  mx-auto">
      {posts.map((post) => (
        <Link key={post._id} href={`/post/${post.slug.current}`}>
          <div className="group cursor-pointer overflow-hidden">
            {post.mainImage ? (
              <div className="relative">
                <img
                  className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out"
                  src={urlFor(post.mainImage).url()!}
                  alt=""
                />
                <span className="absolute top-3 right-3  h-5 w-15 inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-blue-900 text-white">
                  {"category 1".toUpperCase()}
                </span>
              </div>
            ) : (
              <div className="relative">
                <span className="absolute top-0 right-0 block h-1.5 w-1.5 transform -translate-y-1/2 translate-x-1/2 rounded-full ring-2 ring-white bg-gray-300" />
                <img
                  src="/images/image-unavailable.png"
                  alt=""
                  className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out"
                />
              </div>
            )}

            <div className="flex justify-between mt-4">
              <div>
                <p className="text-2xl font-bold mb-4">
                  {post.title.length > 66
                    ? post.title.substring(0, 66) + "..."
                    : post.title}
                </p>
                <p className="text-xl mb-4 text-slate-600">
                  {post.description.length > 158
                    ? post.description.substring(0, 158) + "..."
                    : post.description}
                </p>
                <PostAuthorBox post={post}></PostAuthorBox>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
