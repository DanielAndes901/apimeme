import { Injectable } from '@angular/core';

@Injectable({
   providedIn: 'root'
})


export class AppService {


   private appHeader : AppHeader = {
      showMobileMenu : false,
   };

   
   constructor() {

   }

   public getMobileMenuVisible() {
      return this.appHeader.showMobileMenu;
   }

   public setMobileMenuVisible(visible : boolean) {
      this.appHeader.showMobileMenu = visible;
   }

   
   
}

export interface AppHeader {
  
   showMobileMenu : boolean;
}


