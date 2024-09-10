import React from "react";
import { Button } from "./Button";
import { ButtonConfig } from "../../types";

export const Section = ({ pads }: { pads: ButtonConfig[] }) => {
  return (
    <section
      className={
        "board gap-2 grid bg-white p-2 rounded-lg border border-pink-100"
      }
      style={{
        gridTemplateColumns: `repeat(${Math.ceil(pads.length / 3)}, 1fr)`,
        gridTemplateRows: `repeat(${Math.ceil(pads.length % 3)}, 3fr)`,
      }}
    >
      {pads.map((button) => (
        <Button config={button} key={button.id} id={button.id} />
      ))}
    </section>
  );
};
