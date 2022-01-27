export interface AuthState {
  isAuthenticated: boolean;
  user: User;
  loading: boolean;
}


export interface RegisterState {
  loading: boolean;
  sendRequestToRegister: boolean;
}

export interface ForgotPwdState {
  loading: boolean;
  sendRequestToReset: boolean;
}

export interface ResetPwdState {
  loading: boolean;
  requestSettled: boolean;
}

export abstract class PORTFOLIO {

  public buyingStrategy: string;
  public sellingStrategy: string;
  public targetProfit: number;
  public buyStrikeMin: number;
  public buyStrikeMax: number;
  public cashPerLot: number;

  public factorForMonthParam: number;
  public maskWithMonthParam: number;

  public minimumProfitPct: number;
  public minimalProfit: number;
  public minimumKeepCash: number;
  public lowestBuyPrice: number;
  public minimumTradingVolume: number;
  public trendCheck: string;
  public allowedNegativeCash: number;

  public reBuyAllowedHoursLimit: number;
  public reBuyMaxLotLength: number;
  public reBuyAddingPercent: number;
  public reBuyDiffPerLot: number;
  public reBuyEnabled: boolean;
  public movingSpeed: number;
  public avgTradeCount: number;
  public buyingFee: number;
  public sellingFee: number;
  public platformType: string;
}

export class ETRADE_PORTFOLIO extends PORTFOLIO {

  public userId: number;
  public accountId: string;
}

export class IB_PORTFOLIO extends PORTFOLIO {

  public userId: number;
  public accountId: string;
}


export class DEMO_PORTFOLIO extends PORTFOLIO {

  public userId: number;
  public etradeBuyingFee: number;
  public etradeSellingFee: number;
  public ibkrBuyingFeePerShare: number;
  public ibkrSellingFeePerShare: number;
  public simulatedPlatform: string;
}


export abstract class STATE {
 
  abstract portfolio: PORTFOLIO;
  isReadyTrade: boolean;
  tradeResult: any;
  time: any;
  mapPositionItems: any;
  mapOrder: any;

  Transactions: {
    filter: any,
    listTrItems: any;
    listTrProfitToday: any;
    listTrProfitSelected: any;
    mapDateToProfit: any;
    mapMonthToProfit: any;
  };

  buyableList: any;
  accountInfoGraph: any;
  mapLists: any;
  focusInfo: any;

  // getPortfolio() {
  //   return this.portfolio;
  // }
  
}

export class STATE_ETRADE extends STATE {

  portfolio: ETRADE_PORTFOLIO;
  
}

export class STATE_IB extends STATE {

  portfolio: IB_PORTFOLIO;  
  
}


export class STATE_DEMO extends STATE {

  portfolio: DEMO_PORTFOLIO;
    
}

export interface User {

  email: string;
  fullName: string;
  id: string;
  profile: {
    ETRADE: boolean,
    IB: boolean,
    DEMO: boolean
  };
  token: string;
  userType: string;
  photoURL: string;
}


export class SYSTEM_STATE {

   ETRADE: STATE_ETRADE;
   IB: STATE_IB;
   DEMO: STATE_DEMO;
}

export class TIME_FOR_PROFIT {

  public month: string;
  public date: string;

  constructor(month: string, date: string) {

    this.month = month;
    this.date = date;
  }
}




export interface Chat {
  id?: string;
  text?: string;
  imgUrl?: string;
  timestamp: number;
  user: User;
}