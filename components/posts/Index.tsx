import { Post } from "../../typings";
import DefaultPosts from "./components/DefaultPosts";
import FeaturedPost from "./components/FeaturedPost";
import { useState, useCallback, useEffect } from "react";

export default function Posts({ posts }: { posts: Post[] }) {
  let clonedPosts: Post[] = [...posts];
  let featuredPost: Post = clonedPosts.shift()!;

  const isBreakpoint = useMediaQuery(1025);

  return (
    <div className="">
      {isBreakpoint ? (
        <div>
          <DefaultPosts posts={posts}></DefaultPosts>
        </div>
      ) : (
        <div>
          <FeaturedPost post={featuredPost}></FeaturedPost>
          <DefaultPosts posts={clonedPosts}></DefaultPosts>
        </div>
      )}
    </div>
  );
}

const useMediaQuery = (width: number) => {
  const [targetReached, setTargetReached] = useState(false);

  const updateTarget = useCallback((e: { matches: any }) => {
    if (e.matches) {
      setTargetReached(true);
    } else {
      setTargetReached(false);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const media = window.matchMedia(`(max-width: ${width}px)`);
      media.addEventListener("change", (e) => updateTarget(e));

      // Check on mount (callback is not called until a change occurs)
      if (media.matches) {
        setTargetReached(true);
      }

      return () => media.removeEventListener("change", (e) => updateTarget(e));
    }
  }, []);

  return targetReached;
};
