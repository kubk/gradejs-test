import { makeAutoObservable } from "mobx";
import { ChangeEvent } from "react";

const createInputField = (value: number) => {
  return makeAutoObservable(
    {
      value: value,
      onChange(event: ChangeEvent<HTMLInputElement>) {
        this.value = +event.currentTarget.value;
      },
    },
    {},
    { autoBind: true }
  );
};

export const createStopwatchStore = () => {
  return makeAutoObservable(
    {
      countUp: true,
      tickSpeed: 200,
      step: 1,
      count: 0,
      lastIntervalId: null as number | null,
      form: {
        count: createInputField(0),
        tickSpeed: createInputField(200),
        step: createInputField(1),
      },
      start() {
        if (this.lastIntervalId) {
          return;
        }
        this.lastIntervalId = window.setInterval(this.nextStep, this.tickSpeed);
      },
      get isTicking() {
        return !!this.lastIntervalId;
      },
      pause() {
        if (this.lastIntervalId) {
          clearInterval(this.lastIntervalId);
          this.lastIntervalId = null;
        }
      },
      reset() {
        this.count = 0;
      },
      updateCountUp(isCountUp: boolean) {
        this.countUp = isCountUp;
      },
      nextStep() {
        if (this.countUp) {
          this.count += this.step;
        } else {
          this.count -= this.step;
        }
      },
      updateTickSpeed() {
        this.tickSpeed = this.form.tickSpeed.value;
        this.pause();
        this.start();
      },
      updateCount() {
        this.count = this.form.count.value;
      },
      updateStep() {
        this.step = this.form.step.value;
      },
    },
    {},
    { autoBind: true }
  );
};
