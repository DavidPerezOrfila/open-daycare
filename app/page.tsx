import { getHomeFeedPageData } from "@/app/_data";
import { FeedHeader } from "@/components/feed/feed-header";
import { PostCard } from "@/components/feed/post-card";
import { QuickComposer } from "@/components/feed/quick-composer";
import { Sidebar } from "@/components/layout/sidebar";

export default function Home() {
  const { teacher, classroom, navItems, posts } = getHomeFeedPageData();

  return (
    <div className="flex min-h-screen flex-col bg-[#F6ECDF] md:flex-row">
      <Sidebar teacher={teacher} classroom={classroom} navItems={navItems} />

      <main className="min-w-0 flex-1 md:h-screen md:overflow-y-auto">
        <div className="mx-auto w-full max-w-[760px] px-4 pt-6 pb-14 md:px-10 md:pt-[34px] md:pb-20">
          <FeedHeader teacher={teacher} classroom={classroom} />
          <QuickComposer teacher={teacher} />

          <div className="mb-3.5 flex items-center gap-3.5">
            <span className="text-[12.5px] font-extrabold tracking-[0.8px] text-[#8A7C6D]">
              PUBLICADO HOY
            </span>
            <span className="h-px flex-1 bg-[#E7DAC8]" />
          </div>

          <div className="flex flex-col gap-4">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
