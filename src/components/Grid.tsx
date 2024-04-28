import { useGame } from "@/context/game";
import { Cell as CellType } from "@/types/game";

const baseClassNames =
  "aspect-square flex items-center justify-center border border-black bg-white";

const Cell = ({ cell, x, y }: { cell: CellType; x: number; y: number }) => {
  const { reveal, toggleFlag, status } = useGame();

  if (status === "lost" || status === "won") {
    return (
      <div className={baseClassNames}>
        {cell.isMine ? (cell.state === "revealed" ? "💥" : "💣") : cell.value}
      </div>
    );
  }

  if (cell.state !== "revealed") {
    return (
      <button
        className={baseClassNames}
        onClick={() => reveal(x, y)}
        onContextMenu={(e) => {
          console.log("right click");
          e.preventDefault();
          toggleFlag(x, y);
        }}
      >
        {cell.state === "flagged" ? "🚩" : null}
      </button>
    );
  }

  return <div className={baseClassNames}>{cell.value}</div>;
};

export default function Grid() {
  const { grid } = useGame();

  return (
    <div
      className="grid gap-1 w-fit "
      style={{
        gridTemplateColumns: `repeat(${grid.length}, minmax(${
          750 / grid.length
        }px, 1fr)`,
      }}
    >
      {grid.map((row, rowIndex) =>
        row.map((cell, cellIndex) => (
          <Cell
            key={`${rowIndex}-${cellIndex}`}
            cell={cell}
            x={rowIndex}
            y={cellIndex}
          />
        ))
      )}
    </div>
  );
}
