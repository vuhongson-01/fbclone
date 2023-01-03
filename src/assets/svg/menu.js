import * as React from "react";
import Svg, { Circle } from "react-native-svg";
const MenuIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width="24px"
    height="24px" 
    data-name="Layer 1"
    viewBox="0 0 64 64"
    {...props}
  >
    <Circle cx={8.02} cy={32} r={8} fill="#010101" />
    <Circle cx={32.16} cy={32} r={8} fill="#010101" />
    <Circle cx={55.98} cy={32} r={8} fill="#010101" />
  </Svg>
);
export default MenuIcon;

