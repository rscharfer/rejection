import { describe } from "riteway";
import render from "riteway/render-component";
import { App } from "./App";

describe("<App/>", async assert => {
  const createApp = score => render(<App score={score} />);

// make sure it renders a <Score/> component?
  {
    const $ = createApp(5);

    assert({
      given: "<App/>",
      should: "have two <input/> fields",
      actual: $("input").length,
      expected: 2
    });
    assert({
      given: "<App/>",
      should: "have two buttons",
      actual: $("button").length,
      expected: 2
    });
  }
});
