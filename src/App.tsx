import Grid from "./components/Grid";
import Settings from "./components/Settings";
import Status from "./components/Status";
import { GameProvider } from "./context/game";

export default function App() {
  return (
    <div className="grid h-screen w-full">
      <div className="flex flex-col p-4 gap-2 md:flex-row">
        <GameProvider>
          <div className="flex flex-row-reverse gap-2 md:flex-col">
            <Settings />
            <Status />
          </div>
          <div className="flex h-full flex-1 flex-col justify-center items-center rounded-xl bg-muted/50 p-4 lg:col-span-2">
            <Grid />
          </div>
        </GameProvider>
      </div>
    </div>
  );
}
