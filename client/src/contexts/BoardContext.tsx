import { createContext, ReactNode, useContext, useState } from "react";

// interface
interface BoardContextProps {}
interface BoardProviderProps {
  children: ReactNode;
}

const BoardContext = createContext<BoardContextProps | null>(null);

export const BoardProvider: React.FC<BoardProviderProps> = ({ children }) => {
  const value: BoardContextProps = {};

  return (
    <BoardContext.Provider value={value}>{children}</BoardContext.Provider>
  );
};

export const useBoard = (): BoardContextProps => {
  const context = useContext(BoardContext);

  if (!context) {
    throw new Error("useBoard must be used withing a  !");
  }

  return context;
};
