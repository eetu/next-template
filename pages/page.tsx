import { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';

import PagePage from '../src/components/page/page';
import { fetchContentTypes, fetchEntriesForContentType } from '../src/util/content';

interface PageProps {
  title?: string;
  slug?: string;
}

const Page: NextPage<PageProps> = (props: PageProps) => {
  const { title } = props;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <PagePage title={title} />
    </>
  );
};

Page.getInitialProps = async ({ query }): Promise<PageProps> => {
  const contentTypes = await fetchContentTypes();
  const pages = await fetchEntriesForContentType(contentTypes.find(c => c.sys.id === 'page'));
  const page = pages.find(p => p.fields.slug === query.slug);
  return page ? { title: page.fields.title, slug: page.fields.slug } : {};
};

export default Page;
