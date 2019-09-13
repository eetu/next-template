import * as React from 'react';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';

const StyledPost = styled.div`
  width: 100%;
  margin-bottom: 1.5rem;
  border-radius: 4px;
  background-color: white;

  box-shadow: 2.5px 2.5px 5px 1px rgba(100, 100, 100, 0.25);

  div:first-child {
    padding: 0.5rem 1rem;
  }

  div:last-child {
    padding: 0.5rem 1rem;

    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

interface ImageProps {
  imageUrl: string;
}

const StyledImage = styled.div<ImageProps>`
  ${(props: ImageProps): FlattenSimpleInterpolation =>
    css`
      background-image: url(${props.imageUrl});
    `}

  width: 100%;
  height: 10rem;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const StyledDate = styled.span`
  font-size: 0.5rem;
  color: grey;
`;

interface PostProps {
  title: string;
  date: string;
  imageUrl: string;
  url: string;
}

const Post: React.FunctionComponent<PostProps> = (props: PostProps) => {
  const { title, date, imageUrl, url } = props;
  console.log(imageUrl);
  return (
    <StyledPost>
      <div>{title}</div>
      <StyledImage imageUrl={imageUrl} />
      <div>
        <a href={url}>{url}</a>
        <StyledDate>{date}</StyledDate>
      </div>
    </StyledPost>
  );
};

export default Post;
