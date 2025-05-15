import { getSeries } from '@/services/tmdbService';
import List from '@/components/List';

export default async function WrapperList({ type = 'tv' }: { type?: string }) {
  const media = await getSeries(type);
  return <List list={media} />;
}
