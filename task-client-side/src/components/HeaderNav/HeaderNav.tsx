import { Navigation, ItemList, MenuBars } from "./styled-components/HeaderNav";
import { IoIosNotifications } from "react-icons/io";
import { FaTasks, FaUserFriends, FaBars } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { useState } from "react";

const bars: any = [
  {
    title: "Notificaciones",
    icon: <IoIosNotifications />,
  },
  {
    title: "Tareas",
    icon: <FaTasks />,
  },
  {
    title: "Amigos",
    icon: <FaUserFriends />,
  },
  {
    title: "Perfil",
    icon: <CgProfile />,
  },
];

const HeaderNav = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSideBar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Navigation>
      <MenuBars onClick={handleSideBar}>
        <FaBars />
      </MenuBars>
      {bars.map((item: any) => {
        return (
          <ItemList>
            <i>{item.icon}</i>
            <span style={isOpen ? { display: "block" } : { display: "none" }}>
              {item.title}
            </span>
          </ItemList>
        );
      })}
    </Navigation>
  );
};

export default HeaderNav;
