// import React from 'react'
import Explain from "../../components/Explain/Explain";
import {
  Header,
  HeaderContent,
  HeaderItemH1,
} from "./styled-components/Landing";

const Landing = () => {
  return (
    <>
      <Header>
        <HeaderContent>
          <HeaderItemH1>Organizador de Tareas</HeaderItemH1>
        </HeaderContent>
      </Header>
      <Explain />
    </>
  );
};

export default Landing;
