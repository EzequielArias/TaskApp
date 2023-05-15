import HeaderNav from "../../components/HeaderNav/HeaderNav";
import { TaskItem, HomeContainer, TaskInput, TaskItemContainer } from './styled-components/Home'

const Home = () => {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <HeaderNav />
      <HomeContainer>

      <h1
        style={{
          width: "100%",
          textAlign: "center",
          fontFamily: "Roboto Mono",
          marginTop: "1em",
          marginBottom : "1em",
          fontSize : "2em"
        }}
      >
        Tus tareas
      </h1>
        <TaskItemContainer>

        <TaskItem>Terminar de migrar bases de datos<TaskInput/></TaskItem>

        </TaskItemContainer>
        
        </HomeContainer>
    </div>
  );
};

export default Home;
