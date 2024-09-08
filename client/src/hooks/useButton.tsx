import React, { useEffect, useRef } from "react";
import { ButtonConfig } from "../types";
import useBoardStore from "../store";
import * as Tone from "tone";

export const useButton = (buttonConfig: ButtonConfig) => {
  const isInputActive = useBoardStore((store) => store.isInputActive);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    const synth = new Tone.Synth().toDestination();
    const loop = !!buttonConfig.interval;
    const button = document.getElementById(buttonConfig.id);
    const classesToToggle = loop
      ? ["bg-purple-200", "bg-purple-100", "scale-105"]
      : ["bg-red-200", "bg-red-100", "scale-105"];

    const removeFocus = (e) => {
      if (
        e.key === buttonConfig.keyBinding &&
        !isInputActive &&
        !intervalRef.current
      ) {
        synth.triggerRelease();
        setTimeout(() => {
          classesToToggle.forEach((className) =>
            button?.classList.toggle(className)
          );
        }, 200);
      }
    };

    const keyBindingHandler = (e) => {
      if (e.key === buttonConfig.keyBinding && !isInputActive) {
        // Prevent repeating when key is held down
        if (e.repeat) return;

        if (loop) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
            classesToToggle.forEach((className) =>
              button?.classList.toggle(className)
            );
            // Stop the loop when pressed again
            return;
          }

          intervalRef.current = setInterval(() => {
            synth.triggerAttackRelease(
              buttonConfig.note,
              buttonConfig.duration
            );
            // Active styling
            classesToToggle.forEach((className) =>
              button?.classList.toggle(className)
            );

            setTimeout(() => {
              classesToToggle.forEach((className) =>
                button?.classList.toggle(className)
              );
            }, 200);
          }, (buttonConfig.interval || 1) * 1000);
        } else {
          // Active styling
          classesToToggle.forEach((className) =>
            button?.classList.toggle(className)
          );
          synth.triggerAttack(buttonConfig.note);
        }
      }
    };

    window.addEventListener("keydown", keyBindingHandler);
    window.addEventListener("keyup", removeFocus);
    return () => {
      window.removeEventListener("keydown", keyBindingHandler);
      window.removeEventListener("keyup", removeFocus);
      synth.dispose();
    };
  }, [isInputActive]);
  return <></>;
};
