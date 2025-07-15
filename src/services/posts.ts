//src/services/posts.ts
const postCache = new Map<string, Record<string, string>>();
//
export async function getPost(slug: string) {
  if (postCache.has(slug)) {
    return postCache.get(slug);
  }
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${slug}`,
    {
      next: { revalidate: 60 }, //1 min.
    }
  );
  const data = await res.json();
  postCache.set(slug, data);
  console.log(data);
  return data;
}
