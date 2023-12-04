import React from "react";
import styled from "styled-components";
import { CogIcon } from "../../../components/Svg";
import IconButton from "../../../components/Button/IconButton";
import { MENU_HEIGHT } from "../config";
import { PanelProps, PushedProps } from "../types";
import CakePrice from "../../../components/CakePrice/CakePrice";
// import ThemeSwitcher from "./ThemeSwitcher";
import SocialLinks from "../../../components/Footer/Components/SocialLinks";
// import LangSelector from "./LangSelector";

interface Props extends PanelProps, PushedProps {}

const Container = styled.div`
  flex: none;
  padding: 8px 0;
  // background-color: ${({ theme }) => theme.nav.background};
  // border-top: solid 2px rgba(133, 133, 133, 0.1);
`;

const SettingsEntry = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${MENU_HEIGHT}px;
  padding: 0 8px;
`;

const SocialEntry = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  // height: ${MENU_HEIGHT}px;
  padding: 16px 0 0;
  margin-bottom: 20px;
`;

const PanelFooter: React.FC<Props> = ({
  rightSide,
  isPushed,
  pushNav,
  toggleTheme,
  isDark,
  cakePriceUsd,
  currentLang,
  langs,
  setLang,
}) => {
  if (!isPushed) {
    return (
      <Container>
        <IconButton variant="text" onClick={() => pushNav(true)}>
          <CogIcon />
        </IconButton>
      </Container>
    );
  }

  return (
    <Container>
      <SocialEntry>
        {rightSide}
        {/* <CakePrice cakePriceUsd={cakePriceUsd} /> */}
        <SocialLinks />
      </SocialEntry>
    </Container>
  );
};

export default PanelFooter;
