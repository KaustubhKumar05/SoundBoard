import React from "react";
import { BoardMetadata } from "./BoardMetadata";
import { AddPad } from "./AddPad";
import { UpdatePad } from "./UpdatePad";
import { Settings } from "./Settings";
// import { Todos } from "./Todos";

export const Config = () => {
  return (
    <section className="config h-screen w-96 bg-white fixed right-0 p-4 flex flex-col justify-center">
      <BoardMetadata />
      <Settings />
      <AddPad />
      <UpdatePad />
      {/* <Todos /> */}
    </section>
  );
};
