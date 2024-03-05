import * as React from 'react';
import styled from '../../styled-components';

export const LogoImgEl = styled.img`
  max-height: ${props => props.theme.logo.maxHeight};
  max-width: ${props => props.theme.logo.maxWidth};
  width: 60%;
  display: block;
  clip-path: circle();
  margin: 10px auto;
`;

export const LogoWrap = styled.div`
  text-align: center;
`;

const Link = styled.a`
  display: inline-block;
`;

// eslint-disable-next-line react/display-name
export const LinkWrap = url => Component => <Link href={url}>{Component}</Link>;
