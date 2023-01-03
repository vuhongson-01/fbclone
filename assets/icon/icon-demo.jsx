import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const Demo = props => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M6.98906 3.0375L6.50156 4.5H3C1.34531 4.5 0 5.84531 0 7.5V19.5C0 21.1547 1.34531 22.5 3 22.5H21C22.6547 22.5 24 21.1547 24 19.5V7.5C24 5.84531 22.6547 4.5 21 4.5H17.4984L17.0109 3.0375C16.7062 2.11875 15.8484 1.5 14.8781 1.5H9.12188C8.15156 1.5 7.29375 2.11875 6.98906 3.0375ZM12 18C9.51562 18 7.5 15.9844 7.5 13.5C7.5 11.0156 9.51562 9 12 9C14.4844 9 16.5 11.0156 16.5 13.5C16.5 15.9844 14.4844 18 12 18Z"
      fill="black"
    />
  </Svg>
);
export default Demo;
