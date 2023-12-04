import React, { createElement } from "react";
import styled from "styled-components";
import Logo from "../components/Logo";
// import { useLocation } from "react-router-dom";
import { SvgProps } from "../../../components/Svg";
import Accordion from "./Accordion";
import { MenuEntry, LinkLabel } from "./MenuEntry";
import MenuLink from "./MenuLink";
import { PanelProps, PushedProps } from "../types";
import MenuItem from "../../../components/MenuItem";
import isTouchDevice from "../../../util/isTouchDevice";

export const MenuDivider = styled.hr`
  border-color: ${({ theme }) => theme.colors.cardBorder};
  border-style: solid;
  border-width: 2px 0 0;
  margin: 32px 0;
`;

interface Props extends PanelProps, PushedProps {
  isMobile: boolean;
}

const Container1 = styled.div`
  display: flex;
  // flex-direction: column;
  // Safari fix
  flex-shrink: 0;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
`;

const PanelBody: React.FC<Props> = ({ isPushed, pushNav, isMobile, links, activeItem, activeSubItem }) => {
  // const location = useLocation();

  // Close the menu when a user clicks a link on mobile
  const handleClick = isMobile ? () => pushNav(false) : undefined;

  return (
    <Container>
      <Logo href="/" />
      <MenuDivider />
      {links.map(({ label, items: menuItems = [], href, icon, disabled }) => {
        // const calloutClass = entry.calloutClass ? entry.calloutClass : undefined;
        const statusColor = menuItems?.find((menuItem) => menuItem.status !== undefined)?.status?.color;
        const linkProps = isTouchDevice() && menuItems && menuItems.length > 0 ? {} : { href };
        const isActive = href === activeItem;

        return (
          <Accordion
              key={href}
              isPushed={isPushed}
              pushNav={pushNav}
              icon={icon}
              label={label}
              href={href}
              statusColor={statusColor}
              isDisabled={disabled}
              className={undefined}
              isActive={isActive}
              hasSubItems={menuItems.length > 0}
            >
              {isPushed &&
                menuItems.map((item) => (
                    <MenuItem key={item.href} href={item.href} variant="subMenu" isActive={item.href === activeSubItem} statusColor={statusColor} isDisabled={disabled}>
                      {item.label}
                    </MenuItem>
                ))}
            </Accordion>
        );
      })}
    </Container>
  );
};

export default PanelBody;
