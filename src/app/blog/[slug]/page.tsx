// app/blog/[slug]/page.tsx
import { getPost } from '@/services/posts';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);

  return {
    title: post.title,
    description: post.body.slice(0, 150),
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);

  return (
    <article className="container">
      <h1 className="title">{post.title}</h1>
      <p>{post.body}</p>
    </article>
  );
}
