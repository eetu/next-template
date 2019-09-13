import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

import Page from '../src/components/page/page';

const StyledLinks = styled.div`
  display: flex;
  flex-direction: column;
`;

const IndexPage: React.FunctionComponent = () => {
  return (
    <>
      <Head>
        <title>Hello World!</title>
      </Head>
      <Page title="Hello W0rld!">
        <StyledLinks>
          <Link href="/posts">
            <a>Posts</a>
          </Link>
          <Link href="/page?slug=hello">
            <a>Hello</a>
          </Link>
          <Link href="/page?slug=foobar">
            <a>Foobar</a>
          </Link>
        </StyledLinks>
      </Page>
    </>
  );
};

export default IndexPage;
