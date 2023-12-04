import React from "react";
import styled, { keyframes, DefaultTheme } from "styled-components";
import { MENU_HEIGHT } from "../config";

export interface Props {
  secondary?: boolean;
  isActive?: boolean;
  theme: DefaultTheme;
}

export interface LabelProps {
  isActive?: boolean;
}

const rainbowAnimation = keyframes`
  0%,
  100% {
    background-position: 0 0;
  }
  50% {
    background-position: 100% 0;
  }
`;

const LinkLabel = styled.div<LabelProps>`
  color: ${({ theme, isActive }) => (isActive ? theme.colors.primary : theme.colors.primaryBright)};
  transition: color 0.4s;
  flex-grow: 1;
`;

const MenuEntry = styled.a<Props>`
  cursor: pointer;
  display: flex;
  align-items: center;
  height: ${MENU_HEIGHT}px;
  padding: ${({ secondary }) => (secondary ? "0 32px" : "0 16px")};
  font-size: ${({ secondary }) => (secondary ? "14px" : "16px")};
  background-color: ${({ isActive, theme }) => (isActive ? theme.colors.secondary : "transparent")};
  color: ${({ theme }) => theme.colors.textSubtle};
  // box-shadow: ${({ isActive, theme }) => (isActive ? `inset 4px 0px 0px ${theme.colors.primary}` : "none")};
  border-radius: 8px;

  a {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  // svg {
  //   fill: ${({ theme }) => theme.colors.textSubtle};
  // }

  &:hover {
    background-color: ${({ isActive, theme }) => (isActive ? theme.colors.secondary : theme.colors.tertiary)};
  }

  // Safari fix
  flex-shrink: 0;

  &.rainbow {
    background-clip: text;
    animation: ${rainbowAnimation} 3s ease-in-out infinite;
    background: ${({ theme }) => theme.colors.gradientBubblegum};
    background-size: 400% 100%;
  }
`;
MenuEntry.defaultProps = {
  secondary: false,
  isActive: false,
  role: "button",
};

// const LinkLabelMemo = React.memo(LinkLabel, (prev, next) => prev.isPushed === next.isPushed);

export { MenuEntry, LinkLabel };
