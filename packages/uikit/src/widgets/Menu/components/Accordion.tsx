import React, { ReactNode, createElement, useContext, useState } from "react";
import styled from "styled-components";
import { MENU_HEIGHT } from "../config";
import { LinkLabel, MenuEntry } from "./MenuEntry";
import { PushedProps } from "../types";
import { ArrowDropDownIcon, ArrowDropUpIcon } from "../../../components/Svg";
import MenuItem from "../../../components/MenuItem";
import { Colors } from "../../../theme";
import { MenuContext } from "../context";

interface Props extends PushedProps {
  label: string;
  href: string;
  statusColor: keyof Colors | undefined;
  isDisabled?: boolean;
  icon: React.ElementType | undefined;
  initialOpenState?: boolean;
  className?: string;
  children: ReactNode;
  isActive?: boolean;
  hasSubItems: boolean;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  // Safari fix
  flex-shrink: 0;
`;

const AccordionContent = styled.div<{ isOpen: boolean; isPushed: boolean; maxHeight: number }>`
  max-height: ${({ isOpen, maxHeight }) => (isOpen ? `${maxHeight}px` : 0)};
  transition: max-height 0.3s ease-out;
  overflow: hidden;
  // border-color: ${({ isOpen, isPushed }) => (isOpen && isPushed ? "rgba(133, 133, 133, 0.1)" : "transparent")};
  // border-style: solid;
  border-width: 1px 0;
`;

const Accordion: React.FC<Props> = ({
  label,
  href,
  statusColor,
  isDisabled,
  icon,
  isPushed,
  pushNav,
  children,
  className,
  isActive,
  hasSubItems,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    if (isPushed) {
      setIsOpen((prevState) => !prevState);
    } else {
      pushNav(true);
      setIsOpen(true);
    }
  };

  let iconWidth = "20px"
  let marginRight = "20px"

  switch (href) {
    case '/liquidity':
      iconWidth = "16px"
      marginRight = "24px"
      break
    case '/farms':
      iconWidth = "22px"
      marginRight = "18px"
      break
    case '/loyalty':
      iconWidth = "22px"
      marginRight = "18px"
      break
    default:
      iconWidth = "20px"
      marginRight = "20px"
      break
  }

  const { linkComponent } = useContext(MenuContext);

  const itemLinkProps: any = href
    ? {
        as: linkComponent,
        href,
      }
    : {
        as: "div",
      };

  return (
    <Container>
      <MenuEntry onClick={handleClick} className={className} isActive={isActive} {...itemLinkProps}>
        {(icon && createElement(icon as any, { color: isActive ? "textActive" : "textSubtle", marginRight: marginRight, width: iconWidth }))}
        {hasSubItems ? <LinkLabel isActive={isActive}>{label}</LinkLabel>
         : 
         <MenuItem href={href} variant="default" isActive={isActive} statusColor={statusColor} isDisabled={isDisabled}>
          {label}
        </MenuItem>}
        {hasSubItems && (isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />)}
      </MenuEntry>
      <AccordionContent
        isOpen={isOpen}
        isPushed={isPushed}
        maxHeight={React.Children.count(children) * MENU_HEIGHT}
      >
        {children}
      </AccordionContent>
    </Container>
  );
};

export default Accordion;
