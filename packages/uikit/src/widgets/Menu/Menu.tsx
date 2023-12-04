import { useIsMounted } from "@pancakeswap/hooks";
import throttle from "lodash/throttle";
import React, { useEffect, useRef, useState, useMemo } from "react";
import { styled } from "styled-components";
import BottomNav from "../../components/BottomNav";
import { Box } from "../../components/Box";
import Flex from "../../components/Box/Flex";
import { AtomBox } from "../../components/AtomBox";
import CakePrice from "../../components/CakePrice/CakePrice";
import Footer from "../../components/Footer";
import LangSelector from "../../components/LangSelector/LangSelector";
import MenuItems from "../../components/MenuItems/MenuItems";
import { SubMenuItems } from "../../components/SubMenuItems";
import { PageOverlay } from "../../components/PageOverlay";
import { HamburgerCloseIcon, HamburgerIcon } from "../../components/Svg";
import { useMatchBreakpoints } from "../../contexts";
import Panel from "./components/Panel";
import Logo from "./components/Logo";
import MenuButton from "./components/MenuButton";
import { MENU_HEIGHT, MOBILE_MENU_HEIGHT, TOP_BANNER_HEIGHT, TOP_BANNER_HEIGHT_MOBILE, SIDEBAR_WIDTH_REDUCED, SIDEBAR_WIDTH_FULL } from "./config";
import { MenuContext } from "./context";
import { NavProps } from "./types";

const TopGradient = styled.div`
  position: fixed;
  width: 800px;
  height: 800px;
  border-radius: 400px;
  top: -500px;
  right: -300px;
  background: ${({ theme }) => theme.colors.gradientBottom};
  filter: blur(256px);
`

const BottomGradient = styled.div`
  position: fixed;
  width: 800px;
  height: 800px;
  border-radius: 400px;
  bottom: -400px;
  left: 40px;
  background: ${({ theme }) => theme.colors.gradientBottom};
  filter: blur(256px);
`

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  display: grid;
  grid-template-rows: auto 1fr;
`;

const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: ${MENU_HEIGHT}px;
  background-color: ${({ theme }) => theme.nav.background};
  border-bottom: 1px solid ${({ theme }) => theme.colors.cardBorder};
  transform: translate3d(0, 0, 0);

  padding-left: 16px;
  padding-right: 16px;
`;

const FixedContainer = styled("div").withConfig({
  shouldForwardProp: (props) => !["showMenu"].includes(props),
})<{ showMenu: boolean; height: number }>`
  position: fixed;
  top: ${({ showMenu, height }) => (showMenu ? 0 : `-${height}px`)};
  left: 0;
  transition: top 0.2s;
  height: ${({ height }) => `${height}px`};
  width: 100%;
  z-index: 20;
`;

const TopBannerContainer = styled.div<{ height: number }>`
  height: ${({ height }) => `${height}px`};
  min-height: ${({ height }) => `${height}px`};
  max-height: ${({ height }) => `${height}px`};
  width: 100%;
`;

const BodyWrapper = styled(Box)`
  position: relative;
  display: flex;
  max-width: 100vw;
`;

const Inner = styled.div<{ isPushed: boolean; showMenu: boolean }>`
  flex-grow: 1;
  transition: margin-top 0.2s, margin-left 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translate3d(0, 0, 0);
  max-width: 100%;
  ${({ theme }) => theme.mediaQueries.lg} {
    margin-left: ${({ isPushed }) => `${isPushed ? SIDEBAR_WIDTH_FULL + 10 : SIDEBAR_WIDTH_REDUCED}px`};
    max-width: ${({ isPushed }) => `calc(100% - ${isPushed ? SIDEBAR_WIDTH_FULL + 10 : SIDEBAR_WIDTH_REDUCED}px)`};
  }
`;

const MobileOnlyOverlay = styled(PageOverlay)`
  position: fixed;
  height: 100%;

  ${({ theme }) => theme.mediaQueries.lg} {
    display: none;
  }
`;

const Menu: React.FC<React.PropsWithChildren<NavProps>> = ({
  linkComponent = "a",
  banner,
  rightSide,
  isDark,
  toggleTheme,
  currentLang,
  setLang,
  cakePriceUsd,
  links,
  subLinks,
  footerLinks,
  activeItem,
  activeSubItem,
  langs,
  buyCakeLabel,
  buyCakeLink,
  children,
  chainId,
}) => {
  const { isMobile } = useMatchBreakpoints();
  const isMounted = useIsMounted();
  const [isPushed, setIsPushed] = useState(!isMobile);
  const [showMenu, setShowMenu] = useState(true);
  const refPrevOffset = useRef(typeof window === "undefined" ? 0 : window.pageYOffset);

  const topBannerHeight = isMobile ? TOP_BANNER_HEIGHT_MOBILE : TOP_BANNER_HEIGHT;

  const totalTopMenuHeight = isMounted && banner ? MENU_HEIGHT + topBannerHeight : MENU_HEIGHT;

  useEffect(() => {
    const handleScroll = () => {
      const currentOffset = window.pageYOffset;
      const isBottomOfPage = window.document.body.clientHeight === currentOffset + window.innerHeight;
      const isTopOfPage = currentOffset === 0;
      // Always show the menu when user reach the top
      if (isTopOfPage) {
        setShowMenu(true);
      }
      // Avoid triggering anything at the bottom because of layout shift
      else if (!isBottomOfPage) {
        if (currentOffset < refPrevOffset.current || currentOffset <= totalTopMenuHeight) {
          // Has scroll up
          setShowMenu(true);
        } else {
          // Has scroll down
          setShowMenu(false);
        }
      }
      refPrevOffset.current = currentOffset;
    };
    const throttledHandleScroll = throttle(handleScroll, 200);

    window.addEventListener("scroll", throttledHandleScroll);
    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
    };
  }, [totalTopMenuHeight]);

  // Find the home link if provided
  const homeLink = links.find((link) => link.label === "Home");

  const subLinksWithoutMobile = useMemo(() => subLinks?.filter((subLink) => !subLink.isMobileOnly), [subLinks]);
  const subLinksMobileOnly = useMemo(() => subLinks?.filter((subLink) => subLink.isMobileOnly), [subLinks]);
  const providerValue = useMemo(() => ({ linkComponent }), [linkComponent]);
  return (
    <MenuContext.Provider value={providerValue}>
      <AtomBox
        asChild
        minHeight={{
          xs: "auto",
          md: "100vh",
        }}
      >
        <Wrapper>
          {/* <FixedContainer showMenu={showMenu} height={totalTopMenuHeight}> */}
            {/* {banner && isMounted && <TopBannerContainer height={topBannerHeight}>{banner}</TopBannerContainer>} */}
            {/* <StyledNav> */}
              {/* <Flex>
              <MenuButton aria-label="Toggle menu" onClick={() => setIsPushed((prevState: boolean) => !prevState)} mr="24px">
                {isPushed ? (
                  <HamburgerCloseIcon width="24px" color="textSubtle" />
                ) : (
                  <HamburgerIcon width="24px" color="textSubtle" />
                )}
              </MenuButton>
              </Flex> */}
              {/* <Flex alignItems="center" height="100%">
                <AtomBox mr="12px" display={{ xs: "none", lg: "block" }}>
                  <CakePrice chainId={chainId} showSkeleton={false} cakePriceUsd={cakePriceUsd} />
                </AtomBox>
                <Box mt="4px">
                  <LangSelector
                    currentLang={currentLang}
                    langs={langs}
                    setLang={setLang}
                    buttonScale="xs"
                    color="textSubtle"
                    hideLanguage
                  />
                </Box>
                {rightSide}
              </Flex> */}
            {/* </StyledNav> */}
          {/* </FixedContainer> */}
          {/* {subLinks ? (
            <Flex justifyContent="space-around" overflow="hidden">
              <SubMenuItems
                items={subLinksWithoutMobile}
                mt={`${totalTopMenuHeight + 1}px`}
                activeItem={activeSubItem}
              />

              {subLinksMobileOnly && subLinksMobileOnly?.length > 0 && (
                <SubMenuItems
                  items={subLinksMobileOnly}
                  mt={`${totalTopMenuHeight + 1}px`}
                  activeItem={activeSubItem}
                  isMobileOnly
                />
              )}
            </Flex>
          ) : (
            <div />
          )} */}
          <TopGradient />
          <BottomGradient />
          <BodyWrapper mt={!subLinks ? `${totalTopMenuHeight + 1}px` : "0"}>
            <Panel
              rightSide={rightSide}
              isPushed={isPushed}
              isMobile={isMobile}
              showMenu={showMenu}
              isDark={isDark}
              toggleTheme={toggleTheme}
              langs={langs}
              setLang={setLang}
              currentLang={currentLang}
              cakePriceUsd={cakePriceUsd}
              pushNav={setIsPushed}
              links={links}
              activeItem={activeItem}
              activeSubItem={activeSubItem}
            />
            <Inner isPushed={isPushed} showMenu={showMenu}>
              <MenuButton aria-label="Toggle menu" onClick={() => setIsPushed((prevState: boolean) => !prevState)} mr="24px">
                {isPushed ? (
                  <HamburgerCloseIcon width="24px" color="textSubtle" />
                ) : (
                  <HamburgerIcon width="24px" color="textSubtle" />
                )}
              </MenuButton>
              {children}
            </Inner>
            <MobileOnlyOverlay show={isPushed} onClick={() => setIsPushed(false)} role="presentation" />
          </BodyWrapper>
        </Wrapper>
      </AtomBox>
      {/* <Footer
        chainId={chainId}
        items={footerLinks}
        isDark={isDark}
        toggleTheme={toggleTheme}
        langs={langs}
        setLang={setLang}
        currentLang={currentLang}
        cakePriceUsd={cakePriceUsd}
        buyCakeLabel={buyCakeLabel}
        buyCakeLink={buyCakeLink}
        mb={[`${MOBILE_MENU_HEIGHT}px`, null, "0px"]}
      /> */}
      {/* <AtomBox display={{ xs: "block", md: "none" }}>
        <BottomNav items={links} activeItem={activeItem} activeSubItem={activeSubItem} />
      </AtomBox> */}
    </MenuContext.Provider>
  );
};

export default Menu;