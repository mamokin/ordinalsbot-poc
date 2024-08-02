const ROOT = '/';
const ORDER_STATUS = '/order-status';
const TICKER_INFO = '/ticker-info';

export const NAV_PATHS = {
  ROOT,
  ORDER_STATUS,
  TICKER_INFO
};

export const HEADER_NAV_PATHS: Record<
  Exclude<ROUTES, 'ROOT' | 'SIGNIN'>,
  string
> = {
  ORDER_STATUS,
  TICKER_INFO
};

export type ROUTES = keyof typeof NAV_PATHS;

export const NAV_PATH_LABELS: Record<ROUTES, string> = {
  ROOT: 'Home',
  ORDER_STATUS: 'Order Status',
  TICKER_INFO: 'Ticker Info.'
};

export const DISABLED_PATHS = [];
export const PUBLIC_ROUTES = [
  NAV_PATHS.ROOT,
  NAV_PATHS.ORDER_STATUS,
  NAV_PATHS.TICKER_INFO
];
export const DEFAULT_REDIRECT = '/';
