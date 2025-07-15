//src/services/products.ts
export async function getPhoto(slug: string) {
  const res = await fetch(`https://fakestoreapi.com/products/${slug}`, {
    next: { revalidate: 60 }, //1 min.
  });
  const data = await res.json();

  return data;
}
