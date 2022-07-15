import { urlFor } from "../../../sanity";
import { Post } from "../../../typings";

export default function PostAuthorBox({ post }: { post: Post }) {
  return (
    <div className="flex">
      <div className="pr-4">
        {post.author.image ? (
          <img
            className="h-10 w-10 rounded-full"
            src={urlFor(post.author.image).url()!}
            alt=""
          />
        ) : (
          <img
            className="h-10 w-10 rounded-full"
            src="/images/author-image-unavailable.jpg"
            alt=""
          />
        )}
      </div>
      <div>
        <p className="text-md">{post.author.name}</p>
        <p className="text-xs">
          {new Date(post._createdAt).toLocaleDateString()} · {1} min read
        </p>
      </div>
    </div>
  );
}
