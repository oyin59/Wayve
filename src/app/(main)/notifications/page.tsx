"use client";

import { useRouter } from "next/navigation";
export default function NotificationsPage() {
  const router = useRouter();
  const notifications = [
    {
      id: 1,
      type: "like",
      icon: "♡",
      title: "Someone liked your review",
      text: "Ada liked your review of Pink Bear.",
      time: "10m ago",
    },
    {
      id: 2,
      type: "comment",
      icon: "💬",
      title: "New comment on your review",
      text: "Chiamaka commented on your review of Café de Vie.",
      time: "1h ago",
    },
    {
      id: 3,
      type: "follow",
      icon: "＋",
      title: "New follower",
      text: "Tomi started following you.",
      time: "3h ago",
    },
    {
      id: 4,
      type: "wayve",
      icon: "✦",
      title: "A new spot for you",
      text: "Wayve found a place in Abuja you might like.",
      time: "Yesterday",
    },
  ];
  return (
    <div className="min-h-screen bg-[#FCF1D0] text-[#432F2E] pb-24">

      {/* Header */}
      <header className="max-w-md mx-auto px-6 pt-8 pb-5">
        <button
          onClick={() => router.back()}
          className="mb-5 text-sm text-[#432F2E]/60"
        >
          ← Back
        </button>
        <h1 className="font-serif text-3xl font-semibold">
          Notifications
        </h1>
        <p className="text-sm text-[#432F2E]/60 mt-1">
          Stay up to date with your Wayve activity.
        </p>
      </header>
      {/* Notifications */}
      <main className="max-w-md mx-auto px-6">
        <div className="space-y-3">
          {notifications.map((notification) => (
            <button
              key={notification.id}
              className="w-full text-left bg-white/70 rounded-2xl p-4 border border-[#E6D56D]/60 flex gap-4"
            >
              <div className="w-11 h-11 shrink-0 rounded-full bg-[#C4DAE8] flex items-center justify-center text-lg">
                {notification.icon}
              </div>
              <div className="flex-1">
                <div className="flex justify-between gap-3">
                  <p className="font-semibold text-sm">
                    {notification.title}
                  </p>
                  <span className="text-xs text-[#432F2E]/40 whitespace-nowrap">
                    {notification.time}
                  </span>
                </div>
                <p className="text-sm text-[#432F2E]/65 mt-1 leading-relaxed">
                  {notification.text}
                </p>
              </div>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
