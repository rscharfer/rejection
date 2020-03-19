import { describe } from "riteway";
import render from "riteway/render-component";
// write a component that wraps another component
// write the componoent to get wrapped

// render the wrapper
// see if the wrapped component is there

const withGreen = Component => props => (
  <div style={{ color: "green" }}>
    <Component {...props} />
  </div>
);

const Title = ({ text }) => <h1>{text}</h1>;

const GreenComponent = withGreen(Title);

const $ = render(<GreenComponent text="Here is the text!" />);

describe("withGreen()", async assert => {
  assert({
    given: "a component",
    should: "return a component with the given wrapped inside",
    actual: $("h1")
      .html()
      .trim(),
    expected: "Here is the text!"
  });
});

// write a component that takes a component and returns a component with
// a font-weight of 100

const withLightFont = Component => props => (
  <div style={{ font: 100 }}>
    <Component {...props} />
  </div>
);

describe("withLightFont", async assert => {
  const DesignedComponent = withLightFont(withGreen(Title));
  const $ = render(<DesignedComponent text="How do you do?" />);

  assert({
    given: "a component wrapped by two layers of wrapper",
    should: "still see the component",
    actual: $('h1').html().trim(),
    expected: "How do you do?"
  });
});
