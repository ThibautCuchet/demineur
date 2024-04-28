import { toast } from "@/components/ui/use-toast";
import { createGrid, revealNeighbors } from "@/lib/generator";
import { GameContext, GameStatus, Grid } from "@/types/game";
import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";

const gameContext = createContext<GameContext | null>(null);

const useGame = () => {
  const context = useContext(gameContext);

  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }

  return context;
};

const GameProvider: FC<PropsWithChildren> = ({ children }) => {
  const [grid, setGrid] = useState<Grid>(createGrid(10, 10, 20));
  const [status, setStatus] = useState<GameStatus>("playing");

  const newGrid = (width: number, height: number, mines: number) => {
    setGrid(createGrid(height, width, mines));
    setStatus("playing");
  };

  const checkWin = () => {
    if (
      grid.every((row) =>
        row.every((cell) =>
          cell.isMine ? cell.state === "flagged" : cell.state === "revealed"
        )
      )
    ) {
      setStatus("won");
      toast({
        title: "Congratulations!",
        description: "You won the game",
      });
    }
  };

  const reveal = (x: number, y: number) => {
    if (grid[x][y].state === "revealed") return;
    if (grid[x][y].state === "flagged") return;

    if (grid[x][y].isMine) {
      setStatus("lost");
      toast({
        title: "Oh no!",
        description: "You lost the game",
      });
    }

    const newGrid = [...grid];
    newGrid[x][y].state = "revealed";

    if (newGrid[x][y].value === 0) {
      revealNeighbors(newGrid, x, y, true);
    }

    setGrid(newGrid);
    checkWin();
  };

  const toggleFlag = (x: number, y: number) => {
    if (grid[x][y].state === "revealed") return;

    const newGrid = [...grid];
    newGrid[x][y].state =
      newGrid[x][y].state === "flagged" ? "hidden" : "flagged";

    setGrid(newGrid);
    checkWin();
  };

  return (
    <gameContext.Provider
      value={{
        grid,
        newGrid,
        reveal,
        toggleFlag,
        status,
      }}
    >
      {children}
    </gameContext.Provider>
  );
};

export { GameProvider, useGame };
