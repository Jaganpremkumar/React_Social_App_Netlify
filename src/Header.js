import { useContext } from "react";
import { FaLaptop, FaTabletAlt, FaMobileAlt } from "react-icons/fa";
import DataContext from "./Context/DataContext";

const Header = ({ title }) => {
  // useContext hook
  const { width } = useContext(DataContext);

  return (
    <header className="Header">
      <h1>{title}</h1>

      {/* Using Ternary Operator */}

      {width < 768 ? (
        <FaMobileAlt />
      ) : width < 992 ? (
        <FaTabletAlt />
      ) : (
        <FaLaptop />
      )}
    </header>
  );
};

export default Header;
