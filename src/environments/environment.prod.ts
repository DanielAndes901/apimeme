import { UserRole } from '../app/core/auth/auth.roles';

export const environment = {

  appName: 'APIMeme',
  envName: 'PROD',
  production: true,
  test: false,

  i18nPrefix: 'https://hamoweb.com',

  urlForAsset: 'https://hamoweb.com/assets',
  urlForMain: 'https://hamoweb.com/main',
  

  SCARF_ANALYTICS : false,

  defaultMenuType: 'menu-default',
  //subHiddenBreakpoint: 1440,
  menuHiddenBreakpoint: 1440,
  themeColorStorageKey: 'hamoweb-themecolor',
  isMultiColorActive: true,
  defaultColor: 'light.blueyale',
  isDarkSwitchActive: true,
  defaultDirection: 'ltr',
  themeRadiusStorageKey: 'hamoweb-themeradius',
  isAuthGuardActive: true,
  defaultRole: UserRole.Admin,

};
