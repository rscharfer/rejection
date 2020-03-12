import { describe } from "riteway";
import render from "riteway/render-component";

import Score from "./Score";

describe("Score()", async assert => {
  const $ = render(<Score score={23} />);
  assert({
    given: "total score prop is 23",
    should: "should render a 23",
    actual: parseInt(
      $("#score")
        .html()
        .trim()
    ),
    expected: 23
  });
});
