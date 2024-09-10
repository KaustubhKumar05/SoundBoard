import React from "react";
import useAppStore from "../../store/app";
import useBoardStore from "../../store/board";
import { BoardMetadata } from "../Board/BoardMetadata";
import { AddPad } from "./AddPad";
import { UpdatePad } from "./UpdatePad";
import { Settings } from "./Settings";
import { BoardList } from "./BoardList";
import { DeleteBoard } from "./DeleteBoard";
import { AddBoard } from "./AddBoard";
import { Separator } from "./Separator";
import { ToggleMode } from "./ToggleMode";
import { ANIMATION, MODE, STANDARD_LENGTH } from "../../constants";
// import { Todos } from "./Todos";

export const Config = () => {
  const currentMode = useAppStore((store) => store.currentMode);
  const selectedPad = useBoardStore((store) => store.selectedPad);
  return (
    <section
      className="h-screen w-96 bg-white absolute top-0 p-4 flex flex-col justify-center"
      style={{
        transition: ANIMATION,
        right: currentMode === MODE.BOARD ? "0" : `-${STANDARD_LENGTH}px`,
      }}
    >
      <BoardList />
      <Separator />
      <BoardMetadata />
      <Separator />
      {selectedPad ? <UpdatePad /> : <AddPad />}
      <Separator />
      <div className="flex gap-4">
        <ToggleMode grow={true} />
        <AddBoard />
        <DeleteBoard />
      </div>
      <Separator />
      <Settings />
      {/* <Todos /> */}
    </section>
  );
};
