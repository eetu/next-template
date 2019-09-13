import dynamic from 'next/dynamic';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';

import Page from '../src/components/page/page';
import { fetchContentTypes, fetchEntriesForContentType } from '../src/util/content';

// eslint-disable-next-line react/display-name
const PostWithCustomLoading = dynamic(() => import('../src/components/post/post'), { loading: () => <p>...</p> });

const Posts: React.FunctionComponent = () => {
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    const getPosts = async (): Promise<void> => {
      const contentTypes = await fetchContentTypes();
      const allPosts = await fetchEntriesForContentType(contentTypes.find(c => c.sys.id === 'post'));
      setPosts(
        allPosts.map(a => ({
          title: a.fields.title,
          date: a.fields.date,
          url: a.fields.url,
          imageUrl: a.fields.image.fields.file.url,
        })),
      );
    };
    getPosts();
  }, []);
  return (
    <>
      <Head>
        <title>Posts</title>
      </Head>
      <Page title="Posts">
        {posts.map((post, index) => (
          <PostWithCustomLoading key={index} {...post} />
        ))}
        <Link href="/">
          <a>Frontpage</a>
        </Link>
      </Page>
    </>
  );
};

export default Posts;
