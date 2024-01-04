import { useContext } from "react";
import QuioscoContext from "/src/context/QuioscoProvider.jsx";

const useQuiosco = () => {
  return useContext(QuioscoContext);
};

export default useQuiosco;
