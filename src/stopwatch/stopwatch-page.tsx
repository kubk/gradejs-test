import * as React from "react";
import { useState } from "react";
import { observer } from "mobx-react-lite";
import { createStopwatchStore } from "./stopwatch-store";

export const Stopwatch = observer(() => {
  const [stopwatch] = useState(createStopwatchStore);
  const { start, form } = stopwatch;

  return (
    <div>
      <div id="counter">{stopwatch.count}</div>
      <div id="controls">
        <fieldset>
          <legend>Setup</legend>
          <button
            id="start"
            disabled={stopwatch.isTicking}
            onClick={() => start()}
          >
            start
          </button>
          <button id="pause" onClick={() => stopwatch.pause()}>
            pause
          </button>
          <button id="reset" onClick={() => stopwatch.reset()}>
            reset
          </button>
        </fieldset>
        <fieldset>
          <legend>Count</legend>
          <button id="countup" onClick={() => stopwatch.updateCountUp(true)}>
            count up
          </button>
          <button id="countdown" onClick={() => stopwatch.updateCountUp(false)}>
            count down
          </button>
        </fieldset>
        <fieldset>
          <legend>Set to</legend>
          <input id="value" {...form.count} />
          <br />
          <button
            id="setto"
            onClick={() => {
              stopwatch.updateCount();
            }}
          >
            set value
          </button>
        </fieldset>
        <fieldset>
          <legend>Speed ms.</legend>
          <input id="speed" {...form.tickSpeed} />
          <br />
          <button
            id="setspeed"
            onClick={() => {
              stopwatch.updateTickSpeed();
            }}
          >
            set speed
          </button>
        </fieldset>
        <fieldset>
          <legend>Step</legend>
          <input {...form.step} />
          <br />
          <button
            onClick={() => {
              stopwatch.updateStep();
            }}
          >
            set step
          </button>
        </fieldset>
      </div>
    </div>
  );
});
