//src/app/media/[...slug]/page.tsx

export default async function MediaPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  return (
    <div>
      <p>Tarjetas de {slug.join('/')}</p>
    </div>
  );
}
