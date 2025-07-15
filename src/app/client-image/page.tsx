import { Img } from '@/components/img';

const imageSources = [
  'https://image.tmdb.org/t/p/w500/tUae3mefrDVTgm5mRzqWnZK6fOP.jpg', // válida
  'https://image.tmdb.org/t/p/w500/no-existe2.jpg', // inválida para probar error
];

export default function ClientImagePage() {
  return (
    <div className="max-w-7xl w-full mx-auto px-4 py-6">
      <div className="grid grid-cols-2 gap-6">
        {imageSources.map((src, index) => (
          <Img key={index} url={src} />
        ))}
      </div>
    </div>
  );
}
