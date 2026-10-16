import BottomNav from "@/components/BottomNav";

// Every screen in this group gets the bottom tab bar, rendered once here
// instead of being imported into each page like in the React version.
export default function MainLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      {children}
      <BottomNav />
    </>
  );
}
