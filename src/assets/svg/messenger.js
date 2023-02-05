import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath, Rect} from 'react-native-svg';
const MessengerIcon = props => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...{width: props.width, height: props.height}}>
    <G clipPath="url(#clip0_917_243)">
      <Path
        d="M12.0258 0.375C5.46187 0.375 0.375 5.17219 0.375 11.6517C0.375 15.0408 1.76766 17.9695 4.03453 19.9927C4.42594 20.3447 4.34531 20.5486 4.41188 22.7222C4.41712 22.8744 4.45953 23.0231 4.53541 23.1552C4.6113 23.2873 4.71835 23.3988 4.84723 23.48C4.97612 23.5613 5.12292 23.6097 5.27482 23.6212C5.42673 23.6326 5.57914 23.6067 5.71875 23.5458C8.19891 22.4536 8.23078 22.3673 8.65125 22.4817C15.8367 24.4594 23.625 19.8609 23.625 11.6517C23.625 5.17219 18.5902 0.375 12.0258 0.375ZM19.0214 9.05297L15.5995 14.4703C15.4703 14.674 15.3004 14.8488 15.1005 14.9838C14.9005 15.1188 14.6749 15.211 14.4376 15.2547C14.2004 15.2984 13.9567 15.2927 13.7218 15.2378C13.4869 15.1829 13.2658 15.0801 13.0725 14.9358L10.35 12.8981C10.2283 12.8068 10.0803 12.7575 9.92813 12.7575C9.77599 12.7575 9.62796 12.8068 9.50625 12.8981L5.83266 15.6844C5.34234 16.0561 4.70016 15.4688 5.03062 14.9498L8.4525 9.5325C8.58167 9.32874 8.75155 9.15386 8.95148 9.01884C9.15142 8.88382 9.37709 8.79156 9.61436 8.74786C9.85162 8.70416 10.0954 8.70995 10.3303 8.76487C10.5652 8.8198 10.7862 8.92267 10.9795 9.06703L13.7011 11.1042C13.8228 11.1955 13.9708 11.2448 14.123 11.2448C14.2751 11.2448 14.4231 11.1955 14.5448 11.1042L18.2203 8.32078C18.7097 7.94672 19.3519 8.53359 19.0214 9.05297Z"
        fill="black"
        {...{fill: props.fill}}
      />
    </G>
    <Defs>
      <ClipPath id="clip0_917_243">
        <Rect width={24} height={24} fill="none" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default MessengerIcon;
