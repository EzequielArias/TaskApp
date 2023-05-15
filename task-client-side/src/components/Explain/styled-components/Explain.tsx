import styled from "styled-components";

export const ExplainContainer = styled.div`
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
`;
export const Title = styled.h3`
  font-weight : 800;
  margin-top: 1em;
  text-align: center;
  font-size: 1.8em;
`;
export const LandingText = styled.span`
  margin: 2em;
  letter-spacing: 3px;
  font-family: "Roboto Mono", monospace;
  text-align : center;
`;

export const ExplainArticlesContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const Articles = styled.article`
  text-align: center;

  & p {
    font-family: 'Roboto', sans-serif;
    margin : 15px;
  }

  & i {
    font-size: 55px;
    color : white;
    display : flex;

    align-items : center;
    justify-content : center;
  }
  & svg {
    background-color : purple;
    padding : 5px;
    border-radius : 18px;
  }
`;
