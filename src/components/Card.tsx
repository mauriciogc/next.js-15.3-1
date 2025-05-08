//src/components/Card.tsx

interface CardProps {
  title: string;
  imageUrl: string;
  age: string;
}

const Card = ({ title, imageUrl, age }: CardProps) => {
  return (
    <div className="relative rounded shadow-md overflow-hidden">
      <img src={imageUrl} alt={title} className="w-full h-auto object-cover" />

      <div className="text-gray-800 p-2 text-md text-center font-bold truncate">
        {title} <span className="text-gray-500 font-normal">({age})</span>
      </div>
    </div>
  );
};

export default Card;
