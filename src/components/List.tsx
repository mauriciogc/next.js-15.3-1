// src/components/List.tsx

'use client';

interface List {
  id: number;
  name: string;
  first_air_date: string;
  original_title: string;
  release_date: string;
  poster_path: string;
  overview: string;
}

export default function List({ list }: { list: List[] }) {
  return (
    <div className="grid grid-cols-4 md:grid-cols-8 gap-3 p-4">
      {list.map((item) => (
        <div key={item.id} className="p-2">
          <img
            src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
            alt={item.name}
            className=" w-full h-auto object-cover border-8 border-slate-600"
          />
          <div className="text-gray-100 text-sm">
            <div className="truncate ">{item.name || item.original_title}</div>
            <div className="text-gray-400 ">
              (
              {item.first_air_date?.split('-')[0] ||
                item.release_date?.split('-')[0]}
              )
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
