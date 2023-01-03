import * as React from "react";
import Svg, { Path } from "react-native-svg";
const LikedIcon = (props) => (
  <Svg
  width="22px"
  height="24px" 
  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" {...props}>
    <Path fill="#1565C0" d="M0 7.5v7a.5.5 0 0 0 .5.5H5V7H.5a.5.5 0 0 0-.5.5z" />
    <Path
      fill="#BBDEFB"
      d="M14 6h-4V3c0-1.103-.897-2-2-2H6.5a.5.5 0 0 0-.5.5v2.367L4.066 7.252A.493.493 0 0 0 4 7.5v7a.5.5 0 0 0 .5.5h8.025a2 2 0 0 0 1.827-1.188l1.604-3.609A.491.491 0 0 0 16 10V8c0-1.103-.897-2-2-2z"
    />
  </Svg>
);
export default LikedIcon;
