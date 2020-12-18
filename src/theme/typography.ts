import styled from 'styled-components';
import {Link as RouterLink} from 'react-router-dom'

import * as colors from './color';
import { fontFamily, fontWeight } from './font';

export const H1 = styled.h1`
  font-family: ${fontFamily.primary};
  font-weight: ${fontWeight.bold};
  color: ${colors.black};
`;

export const H2 = styled.h2`
  font-family: ${fontFamily.primary};
  font-weight: bold;
  color: ${colors.black};
`;

export const Link = styled.a`
  text-decoration: underline;
`;

export const StyledLink = styled(RouterLink)`
  margin-bottom: 16px;
  text-decoration: none;
  color: ${colors.plantGreen};
`
