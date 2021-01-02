import styled from 'styled-components';
import { Button, Card, Input } from '@material-ui/core';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const StyledButton = styled(Button)`
  && {
    margin-top: 20px;
  }
`;

export const IconButton = styled.div`
  display: flex;
  justify-content: center;
  border-radius: 5px;
  color: gray;
  cursor: pointer;

  :hover {
    background: whitesmoke;
  }
`;

export const List = styled.ul`
  list-style-type: none;
  margin-top: 16px;
  margin-right: 20px;
  padding: 0;

  li {
    display: grid;
    grid-template-columns: repeat(4, 150px) 40px 40px;
    text-align: start;
    padding-bottom: 4px;
  }
`;

export const ListHeader = styled.div`
  text-transform: uppercase;
  font-weight: bold;
  padding-bottom: 8px;
`;
