import * as contentful from 'contentful';

const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

export const fetchContentTypes = async (): Promise<contentful.ContentType[]> => {
  const types = await client.getContentTypes();
  if (types.items) return types.items;
  console.log('Error getting Content Types.');
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fetchEntriesForContentType = async (contentType): Promise<contentful.Entry<any>[]> => {
  const entries = await client.getEntries({
    // eslint-disable-next-line @typescript-eslint/camelcase
    content_type: contentType.sys.id,
  });
  if (entries.items) return entries.items;
  console.log(`Error getting Entries for ${contentType.name}.`);
};
