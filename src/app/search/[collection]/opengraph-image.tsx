import OpengraphImage from 'src/components/opengraph-image';
import { getCollection } from 'src/lib/shopify';

export default async function Image({
  params
}: {
  params: { collection: string };
}) {
  const collection = await getCollection(params.collection);
  const title = collection?.seo?.title || collection?.title;

  return await OpengraphImage({ title });
}
