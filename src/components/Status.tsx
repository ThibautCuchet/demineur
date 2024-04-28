import { useGame } from "@/context/game";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Gamepad } from "lucide-react";

const StatusPanel = () => {
  const { grid } = useGame();

  const flagged = grid.flat().filter((cell) => cell.state === "flagged").length;
  const mines = grid.flat().filter((cell) => cell.isMine).length;

  return (
    <fieldset className="grid gap-6 rounded-lg border p-4 w-full">
      <legend className="-ml-1 px-1 text-sm font-medium">Game status</legend>
      <div className="flex justify-between gap-3">
        <span>Mines </span>
        <Badge variant="outline">{mines}</Badge>
      </div>
      <div className="flex justify-between gap-3">
        <span>Remaining </span>
        <Badge variant="outline">{mines - flagged}</Badge>
      </div>
      <div className="flex justify-between gap-3">
        <span>Flagged </span>
        <Badge variant="outline">{flagged}</Badge>
      </div>
    </fieldset>
  );
};

export default function Status() {
  return (
    <>
      <div className="hidden flex-col items-start gap-8 md:flex">
        <StatusPanel />
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <div className="flex w-full justify-end md:hidden">
            <Button type="button" variant="outline" size="icon">
              <Gamepad className="h-4 w-4" />
            </Button>
          </div>
        </DialogTrigger>
        <DialogContent>
          <div className="py-4">
            <StatusPanel />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
