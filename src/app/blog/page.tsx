// src/app/blog/page.tsx
import { formatDate } from '../_utils/formatDate';

export default function BlogPage() {
  const date = formatDate('2025-06-17T00:00:00Z');
  return (
    <div className="container">
      <p>Última actualización: {date}</p>
    </div>
  );
}
