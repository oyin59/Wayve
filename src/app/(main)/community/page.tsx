"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PlaceImage from "@/components/PlaceImage";
export default function CommunityPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("For You");
  const posts = [
    {
      id: 1,
      username: "oyinlola",
      initials: "O",
      time: "2h ago",
      place: "Pink Bear",
      area: "Wuse",
      image: "/images/pink-bear.jpg",
      caption:
        "This place is actually so cute 😭 Perfect for a girls' day or a little solo date.",
      likes: 24,
      comments: 6,
      verified: true,
    },
    {
      id: 2,
      username: "abujaspots",
      initials: "A",
      time: "5h ago",
      place: "Café de Vie",
      area: "Maitama",
      image: "/images/cafe-de-vie.jpg",
      caption:
        "If you want somewhere quiet to catch up with a friend, add this to your list.",
      likes: 41,
      comments: 9,
      verified: true,
    },
    {
      id: 3,
      username: "toluexplores",
      initials: "T",
      time: "Yesterday",
      place: "Nosta",
      area: "Wuse",
      image: "/images/nosta.jpg",
      caption:
        "The ambience >>>. Would definitely come back here for dinner.",
      likes: 67,
      comments: 14,
      verified: false,
    },
  ];
  const trending = [
    {
      id: 4,
      username: "abujadiaries",
      initials: "A",
      time: "1h ago",
      place: "Eli & Lulu's",
      area: "Maitama",
      image: "/images/eli-lulus.jpg",
      caption:
        "Everyone keeps talking about this place so obviously I had to see what the hype was about.",
      likes: 92,
      comments: 21,
      verified: false,
    },
    {
      id: 5,
      username: "theabujaedit",
      initials: "T",
      time: "3h ago",
      place: "Akara Café",
      area: "Wuse",
      image: "/images/akara-cafe.jpg",
      caption:
        "A cute little breakfast stop if you're around this side of town.",
      likes: 73,
      comments: 12,
      verified: true,
    },
  ];
  const following = [
    {
      id: 6,
      username: "oyinlola",
      initials: "O",
      time: "30m ago",
      place: "Café Flour",
      area: "Wuse",
      image: "/images/cafe-flour.jpg",
      caption:
        "Adding another café to the Abuja list because apparently I never get tired of finding them.",
      likes: 18,
      comments: 4,
      verified: false,
    },
  ];
  let displayedPosts = posts;
  if (activeTab === "Trending") {
    displayedPosts = trending;
  }
  if (activeTab === "Following") {
    displayedPosts = following;
  }
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-brown pb-24">
      {/* Header */}
      <header className="px-5 pt-8 pb-4 max-w-md mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-serif text-3xl font-bold">
              Community
            </h1>
            <p className="text-sm text-brown/55 mt-1">
              See where Abuja is going.
            </p>
          </div>
          <button
            onClick={() => router.push("/create-post")}
            className="w-11 h-11 rounded-full bg-brown text-white flex items-center justify-center text-xl shadow-sm"
          >
            +
          </button>
        </div>
      </header>
      {/* Tabs */}
      <div className="px-5 max-w-md mx-auto">
        <div className="bg-white rounded-2xl p-1 flex">
          {["For You", "Trending", "Following"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2.5 rounded-xl text-sm transition ${
                activeTab === tab
                  ? "bg-brown text-white font-semibold"
                  : "text-brown/55"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      {/* Feed */}
      <main className="max-w-md mx-auto px-5 mt-6 space-y-5">
        {displayedPosts.map((post) => (
          <article
            key={post.id}
            className="bg-white rounded-3xl overflow-hidden shadow-sm"
          >
            {/* User */}
            <div className="px-4 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#303820] flex items-center justify-center font-semibold">
                  {post.initials}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <p className="font-semibold text-sm">
                      @{post.username}
                    </p>
                    {post.verified && (
                      <span className="text-[10px]">
                        ✓
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-brown/45">
                    {post.time}
                  </p>
                </div>
              </div>
              <button className="text-brown/40 text-lg">
                •••
              </button>
            </div>
            {/* Image */}
            <div className="relative w-full aspect-[4/3] bg-[#D9B574]">
              <PlaceImage src={post.image} alt={post.place} fallback={null} />
            </div>
            {/* Post content */}
            <div className="px-4 py-4">
              {/* Place */}
              <button
                onClick={() =>
                  router.push("/businesses")
                }
                className="text-left"
              >
                <p className="text-xs text-brown/50">
                  📍 {post.area}
                </p>
                <h2 className="font-serif text-lg font-bold">
                  {post.place}
                </h2>
              </button>
              {/* Caption */}
              <p className="text-sm leading-6 mt-2 text-brown/80">
                {post.caption}
              </p>
              {/* Actions */}
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-5">
                  <button className="flex items-center gap-1.5 text-sm">
                    ♡
                    <span>{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-1.5 text-sm">
                    💬
                    <span>{post.comments}</span>
                  </button>
                  <button className="text-sm">
                    ↗
                  </button>
                </div>
                <button className="text-lg">
                  ♡
                </button>
              </div>
            </div>
          </article>
        ))}
        {/* Empty Following State */}
        {displayedPosts.length === 0 && (
          <div className="bg-white rounded-3xl p-8 text-center">
            <div className="text-3xl mb-3">
              ✦
            </div>
            <h2 className="font-serif text-xl font-bold">
              Your feed is waiting
            </h2>
            <p className="text-sm text-brown/55 mt-2 leading-6">
              Follow people who discover places you love
              and their posts will show up here.
            </p>
            <button
              onClick={() => setActiveTab("For You")}
              className="mt-5 bg-brown text-white rounded-xl px-5 py-2.5 text-sm font-medium"
            >
              Explore Community
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
