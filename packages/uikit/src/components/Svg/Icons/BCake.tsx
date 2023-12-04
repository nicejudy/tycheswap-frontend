import React from "react";
import { useTheme } from "styled-components";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<React.PropsWithChildren<SvgProps>> = (props) => {
  const theme = useTheme();
  const primaryColor = theme.isDark ? "#372F47" : "#EEEAF4";
  const secondaryColor = theme.isDark ? "#B8ADD2" : "#7A6EAA";

  return (
    <Svg viewBox="0 0 24 24" {...props}>
      <circle cx="12" cy="12" r="12" fill={primaryColor} />
      <path
        d="M12.9023 18.5358C12.5947 18.79 12.1475 18.6559 11.9912 18.2889L11.2409 16.5267C12.2516 16.1535 13.198 15.6516 14.0736 15.066C14.0736 15.066 14.3143 16.4198 14.0159 17.1971C13.8234 17.6983 13.317 18.1932 12.9023 18.5358ZM7.46821 12.7559L5.71151 12.0087C5.34217 11.8516 5.2091 11.4009 5.46753 11.0939C5.8131 10.6833 6.30926 10.1845 6.80856 9.99345C7.58256 9.69734 8.92963 9.92466 8.92963 9.92466C8.34377 10.7998 7.84161 11.7457 7.46821 12.7559ZM17.7497 6.25043C17.7497 6.25043 14.5629 4.88562 10.919 8.52832C9.50905 9.93753 8.66567 11.4883 8.11844 12.846C7.93818 13.3286 8.0605 13.8563 8.41459 14.2166L9.78589 15.5808C10.14 15.9411 10.6679 16.057 11.1507 15.8768C12.7722 15.2589 14.2444 14.3049 15.4706 13.0777C19.1145 9.43562 17.7497 6.25043 17.7497 6.25043ZM13.198 10.7998C12.6959 10.2979 12.6959 9.48066 13.198 8.97875C13.7002 8.47684 14.5178 8.47684 15.02 8.97875C15.5157 9.48066 15.5221 10.2979 15.02 10.7998C14.5178 11.3017 13.7002 11.3017 13.198 10.7998Z"
        fill={secondaryColor}
      />
      <path
        d="M8.02787 14.9887C7.7864 14.7473 7.45181 14.5904 7.12483 14.6888C6.37557 14.9144 5.82983 15.6094 5.82983 16.4318L5.82983 18.2517H7.65074C8.47355 18.2517 9.1689 17.7063 9.39456 16.9574C9.49304 16.6306 9.336 16.2962 9.09453 16.0548L8.02787 14.9887Z"
        fill={secondaryColor}
      />
    </Svg>
  );
};

export default Icon;
