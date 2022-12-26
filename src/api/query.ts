import { createClient } from 'urql';
import { subGraphUrl } from 'config';

const client = createClient({ url: subGraphUrl});
export const query = async (query: string) => {
  const data = await client.query(query).toPromise();
  return data;
};
