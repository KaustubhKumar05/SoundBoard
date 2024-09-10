import React from "react";
import { BoardMetadata } from "../Board/BoardMetadata";
import { AddPad } from "./AddPad";
import { UpdatePad } from "./UpdatePad";
import { Settings } from "./Settings";
import { BoardList } from "./BoardList";
import { DeleteBoard } from "./DeleteBoard";
import { AddBoard } from "./AddBoard";
import useBoardStore from "../../store";
import { Separator } from "./Separator";
// import { Todos } from "./Todos";

export const Config = () => {
  const selectedPad = useBoardStore((store) => store.selectedPad);
  return (
    <section className="config h-screen w-96 bg-white fixed right-0 p-4 flex flex-col justify-center">
      <BoardList />
      <Separator />
      <BoardMetadata />
      <Separator />
      {selectedPad ? <UpdatePad /> : <AddPad />}
      <Separator />
      <div className="flex gap-4">
        <AddBoard />
        <DeleteBoard />
      </div>
      <Separator />
      <Settings />
      {/* <Todos /> */}
    </section>
  );
};
