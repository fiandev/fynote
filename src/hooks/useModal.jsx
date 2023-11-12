import React, { useContext, useEffect, useState } from "react";

export const GlobalModalContext = React.createContext("light");

export const GlobalModalProvider = ({ children }) => {
  const [modalOpened, setModalOpened] = useState(
    localStorage.getItem("modalOpened") || "light",
  );
  // let isDark = localStorage.getItem("modalOpened") === "dark";

  useEffect(() => {}, [modalOpened]);

  return (
    <GlobalModalContext.Provider value={[modalOpened, setModalOpened]}>
      {modalOpened && Modal}
      {children}
    </GlobalModalContext.Provider>
  );
};

export const useModal = () => {
  const [modalOpened, setModalOpened] = useContext(GlobalModalContext);

  if (!modalOpened)
    console.log(
      "usemodalOpened must be used inside a GlobalmodalOpenedProvider",
    );

  return [modalOpened, setModalOpened];
};
