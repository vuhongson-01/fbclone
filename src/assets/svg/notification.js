import * as React from "react";
import Svg, { Path } from "react-native-svg";
const NotifyIcon = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} {...props}>
    <Path
      fill="none"
      fillRule="evenodd"
      stroke="#4A4A4A"
      d="m12.927 3.566-.46-.066.032-.464L12.5 3V2a.5.5 0 1 0-1 0v1l.001.036.033.464-.46.066A6.501 6.501 0 0 0 5.5 10v6.5H4a1.5 1.5 0 0 0 0 3h16a1.5 1.5 0 0 0 0-3h-1.5V10a6.501 6.501 0 0 0-5.573-6.434zM10 20a2 2 0 1 0 4 0"
    />
  </Svg>
);
export default NotifyIcon;
