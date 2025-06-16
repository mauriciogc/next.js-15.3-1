//src/app/blog/[slug]/page.tsx
type BlogPostProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function BlogPost({ params }: BlogPostProps) {
  const { slug } = await params;
  return (
    <main className="flex flex-col justify-center items-center min-h-screen gap-4">
      <h1 className="text-3xl font-bold">Blog Post</h1>
      <p className="text-lg">Slug: {slug}</p>
    </main>
  );
}
