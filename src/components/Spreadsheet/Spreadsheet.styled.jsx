import styled from "styled-components";

export const StyledSheet = styled.div`
  display: grid;
  grid-template-columns: 32px repeat(
      ${props => props.numberOfColumns - 1},
      90px
    );
`;