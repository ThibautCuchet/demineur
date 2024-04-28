type GameContext = {
  grid: Grid;
  newGrid: (width: number, height: number, mines: number) => void;
  reveal: (x: number, y: number) => void;
  toggleFlag: (x: number, y: number) => void;
  status: GameStatus;
};

type Grid = Cell[][];

type Cell = {
  value: number;
  state: "hidden" | "revealed" | "flagged";
  isMine: boolean;
};

type GameStatus = "playing" | "won" | "lost";

export type { GameContext, Grid, Cell, GameStatus };
