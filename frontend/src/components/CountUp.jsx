import React, { useState } from "react";
import { useSpring, animated } from "@react-spring/web";

const CountUp = ({ endValue }) => {
  const [count, setCount] = useState(0);

  const props = useSpring({
    from: { number: 0 },
    to: { number: endValue },
    delay: 200,
    config: { duration: 1000 },
    onRest: () => setCount(endValue),
  });

  return <animated.div>{props.number.to((n) => n.toFixed(1))}</animated.div>;
};

export default CountUp;
