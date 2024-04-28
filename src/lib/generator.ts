import { Grid } from "@/types/game";

const newEmptyGrid = (height: number, width: number): Grid =>
  Array.from({ length: width }, () =>
    Array.from({ length: height }, () => ({
      value: 0,
      state: "hidden",
      isMine: false,
    }))
  );

const assignMines = (grid: Grid, mines: number, size: number): Grid => {
  if (mines === 0) return grid;

  const position = Math.floor(Math.random() * size);
  const x = Math.floor(position / grid[0].length);
  const y = position % grid[0].length;

  if (grid[x][y].isMine) return assignMines(grid, mines, size);

  grid[x][y].isMine = true;
  return assignMines(grid, mines - 1, size);
};

const findNeighbors = (grid: Grid, x: number, y: number): number => {
  if (x < 0 || y < 0 || x >= grid.length || y >= grid[0].length) return 0;
  return grid[x][y].isMine ? 1 : 0;
};

const countNeighbors = (grid: Grid, x: number, y: number): number => {
  return (
    findNeighbors(grid, x - 1, y - 1) +
    findNeighbors(grid, x - 1, y) +
    findNeighbors(grid, x - 1, y + 1) +
    findNeighbors(grid, x, y - 1) +
    findNeighbors(grid, x, y + 1) +
    findNeighbors(grid, x + 1, y - 1) +
    findNeighbors(grid, x + 1, y) +
    findNeighbors(grid, x + 1, y + 1)
  );
};

const createGrid = (height: number, width: number, mines: number): Grid => {
  const emptyGrid = newEmptyGrid(height, width);

  const gridWithBombs = assignMines(emptyGrid, mines, height * width);

  const grid = gridWithBombs.map((row, x) =>
    row.map((cell, y) => ({
      ...cell,
      value: cell.isMine ? -1 : countNeighbors(gridWithBombs, x, y),
    }))
  );

  return grid;
};

const revealNeighbors = (
  grid: Grid,
  x: number,
  y: number,
  first: boolean = false
): void => {
  if (x < 0 || y < 0 || x >= grid.length || y >= grid[0].length) return;
  if (!first && grid[x][y].state === "revealed") return;

  grid[x][y].state = "revealed";

  if (grid[x][y].value === 0) {
    revealNeighbors(grid, x - 1, y - 1);
    revealNeighbors(grid, x - 1, y);
    revealNeighbors(grid, x - 1, y + 1);
    revealNeighbors(grid, x, y - 1);
    revealNeighbors(grid, x, y + 1);
    revealNeighbors(grid, x + 1, y - 1);
    revealNeighbors(grid, x + 1, y);
    revealNeighbors(grid, x + 1, y + 1);
  }
};

export { createGrid, revealNeighbors };
