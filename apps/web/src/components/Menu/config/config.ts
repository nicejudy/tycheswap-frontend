import { ContextApi } from '@pancakeswap/localization'
import { SUPPORTED_CHAIN_IDS as POOL_SUPPORTED_CHAINS } from '@pancakeswap/pools'
import { SUPPORTED_CHAIN_IDS as POSITION_MANAGERS_SUPPORTED_CHAINS } from '@pancakeswap/position-managers'
import { SUPPORTED_CHAIN_IDS as IFO_SUPPORTED_CHAINS } from '@pancakeswap/ifos'
import {
  NftIcon,
  NftFillIcon,
  DropdownMenuItemType,
  DropdownMenuItems,
  EarnFillIcon,
  EarnIcon,
  MenuItemsType,
  MoreIcon,
  PancakeProtectorIcon,
  SwapFillIcon,
  SwapIcon,
  PoolIcon,
  FarmIcon,
  CupIcon,
} from '@pancakeswap/uikit'
import {
  FIXED_STAKING_SUPPORTED_CHAINS,
  LIQUID_STAKING_SUPPORTED_CHAINS,
  SUPPORT_BUY_CRYPTO,
  SUPPORT_FARMS,
  SUPPORT_ONLY_BSC,
} from 'config/constants/supportChains'
import { getPerpetualUrl } from 'utils/getPerpetualUrl'
import { nftsBaseUrl } from 'views/Nft/market/constants'

export type ConfigMenuDropDownItemsType = DropdownMenuItems & { hideSubNav?: boolean }
export type ConfigMenuItemsType = Omit<MenuItemsType, 'items'> & { hideSubNav?: boolean; image?: string } & {
  items?: ConfigMenuDropDownItemsType[]
}

const addMenuItemSupported = (item, chainId) => {
  if (!chainId || !item.supportChainIds) {
    return item
  }
  if (item.supportChainIds?.includes(chainId)) {
    return item
  }
  return {
    ...item,
    disabled: true,
  }
}

const config: (
  t: ContextApi['t'],
  isDark: boolean,
  languageCode?: string,
  chainId?: number,
) => ConfigMenuItemsType[] = (t, isDark, languageCode, chainId) =>
  [
    {
      label: t('Swap'),
      icon: SwapIcon,
      fillIcon: SwapFillIcon,
      href: '/',
      showItemsOnMobile: false,
      items: [
      ].map((item) => addMenuItemSupported(item, chainId)),
    },
    {
      label: t('Pool'),
      icon: PoolIcon,
      fillIcon: PoolIcon,
      href: '/liquidity',
      showItemsOnMobile: false,
      items: [
      ].map((item) => addMenuItemSupported(item, chainId)),
    },
    {
      label: t('Farms'),
      href: '/farms',
      icon: FarmIcon,
      fillIcon: FarmIcon,
      supportChainIds: SUPPORT_FARMS,
      items: [
      ].map((item) => addMenuItemSupported(item, chainId)),
    },
    {
      label: t('Loyalty'),
      href: '/loyalty',
      icon: CupIcon,
      fillIcon: CupIcon,
      supportChainIds: SUPPORT_FARMS,
      items: [
      ].map((item) => addMenuItemSupported(item, chainId)),
    },
  ].map((item) => addMenuItemSupported(item, chainId))

export default config
