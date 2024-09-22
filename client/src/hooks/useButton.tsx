import React, { useEffect, useRef } from "react";
import useAppStore from "../store/app";
import { ButtonConfig } from "../types";
import * as Tone from "tone";

export const useButton = (buttonConfig: ButtonConfig) => {
  const isInputActive = useAppStore((store) => store.isInputActive);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const synth = new Tone.Synth().toDestination();
    const loop = !!buttonConfig.interval;
    const button = document.getElementById(buttonConfig.id);
    const classesToToggle = loop
      ? ["bg-purple-200", "scale-105"]
      : ["bg-red-200", "scale-105"];

    const removeFocus = (e:KeyboardEvent) => {
      if (
        e.key === buttonConfig.keyBinding &&
        !isInputActive &&
        !intervalRef.current
      ) {
        synth.triggerRelease();
        setTimeout(() => {
          classesToToggle.forEach((className) =>
            button?.classList.remove(className)
          );
        }, 200);
      }
    };

    const keyBindingHandler = (e: KeyboardEvent) => {
      // e.repeat is ignored to prevent repetition when a key is held down
      if (
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey ||
        e.metaKey ||
        e.repeat ||
        e.key === "CapsLock"
      ) {
        return;
      }
      if (e.key === buttonConfig.keyBinding && !isInputActive) {
        if (loop) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
            classesToToggle.forEach((className) =>
              button?.classList.add(className)
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
              button?.classList.add(className)
            );

            setTimeout(() => {
              classesToToggle.forEach((className) =>
                button?.classList.remove(className)
              );
            }, 200);
          }, (buttonConfig.interval || 1) * 1000);
        } else {
          // Active styling
          classesToToggle.forEach((className) =>
            button?.classList.add(className)
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
