import { UserRole } from '../app/core/auth/auth.roles';

export const environment = {
  appName: 'APIMeme',
  envName: 'DEV',
  production: false,
  i18nPrefix: '',

  urlForAsset: 'http://localhost:4200/assets',
  urlForMain: 'http://localhost:3000',
 
  
  SCARF_ANALYTICS : false,
  
  
  defaultMenuType: 'menu-default',
  
  //subHiddenBreakpoint: 1440,
  menuHiddenBreakpoint: 1440,
  themeColorStorageKey: 'modern-web-themecolor',
  isMultiColorActive: true,
  defaultColor: 'light.blueyale',
  defaultRole: UserRole.Admin,

  isDarkSwitchActive: true,
  defaultDirection: 'ltr',
  themeRadiusStorageKey: 'modern-web-themeradius',
  isAuthGuardActive: true,
  
};