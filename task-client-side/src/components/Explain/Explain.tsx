import {
  ExplainArticlesContainer,
  Articles,
  ExplainContainer,
  Title,
  LandingText,
} from "./styled-components/Explain";
import { BsShieldFillCheck } from 'react-icons/bs'
import { AiOutlineBook, AiFillWechat } from 'react-icons/ai'

const ArticlesData = [
  {
    icon : <AiOutlineBook/>,
    description : 'Administra tus actividades de manera eficiente'
  },
  {
    icon : <AiFillWechat/>,
    description : 'Chatea y consulta con tus amigos de como resolver un pendiente! Proximamente'
  },
  {
    icon : <BsShieldFillCheck/>,
    description : 'Tus datos estan seguros en nuestro sitio'
  }
]


const Explain = () => {
  return (
    <ExplainContainer>
      <Title>El secreto del exito es ordenar tu tiempo</Title>
      <LandingText>
        Un organizador de tareas es tu mejor aliado para mantener el control y
        la productividad en tu vida. Te permite gestionar tus responsabilidades
        de manera eficiente, establecer prioridades claras y asegurarte de que
        nada importante se te escape.
      </LandingText>

      <ExplainArticlesContainer>
        {
          ArticlesData.map(ar => {
            return (
              <Articles>
                <i>{ar.icon}</i>
                <p>{ar.description}</p>
              </Articles>
            )
          })
        }
      </ExplainArticlesContainer>
    </ExplainContainer>
  );
};

export default Explain;
