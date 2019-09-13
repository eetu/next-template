import React from 'react';
import styled from 'styled-components';

import Login from '../login/login';

const StyledPage = styled.div`
  && {
    margin: 0 auto;
    background-color: #fafafa;
    width: 25rem;
    padding: 1rem;

    && div:first-child {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }
  }
`;

interface PageProps {
  title: string;
  children?: React.ReactNode;
}

const Page: React.FunctionComponent<PageProps> = (props: PageProps) => {
  const { title } = props;

  return (
    <StyledPage>
      <div>
        <h1>{title}</h1>
        <Login />
      </div>
      {props.children}
    </StyledPage>
  );
};

export default Page;
