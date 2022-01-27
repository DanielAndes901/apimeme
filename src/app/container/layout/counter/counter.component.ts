import { Component, OnInit, OnDestroy,  ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { InfoService } from 'src/app/services/info/info.service';
import { AuthService } from 'src/app/services/auth.service';
import { interval } from 'rxjs';

import * as moment from 'moment-timezone';
import { SYSTEM_STATE } from 'src/app/core/auth/auth.model';

@Component({
  selector: 'anms-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CounterComponent implements OnInit, OnDestroy {

  public currentDate: string;
  public currentTime: string;
  public currentState: any;
  public currentCounter: string;
  public counterMessage: string;
  public bell_state = "notifications";
  public statusMessage: any;
  private validTradingTime: any;

  constructor(public service: InfoService, private authService : AuthService, private changeDetector: ChangeDetectorRef) {

    var strDate = moment().tz("America/New_York").format("YYYY-MM-DDTHH:mm:ss");
    var date = new Date(strDate);
    this.currentDate = date.toDateString();
    this.currentTime = date.toLocaleTimeString();
  }

  ngOnInit() {

    interval(1000).subscribe(() => {

      this.authService.checkTokenExpiration();

      if (!this.changeDetector['destroyed']) {


        var strDate = moment().tz("America/New_York").format("YYYY-MM-DDTHH:mm:ss");
        var date = new Date(strDate);
        this.currentDate = date.toDateString();
        this.currentTime = date.toLocaleTimeString();


        if (this.validTradingTime != null) {

          var openTime = new Date(this.validTradingTime.openTime).getTime();
          var closeTime = new Date(this.validTradingTime.closeTime).getTime();
          var curTime = date.getTime();

          if (curTime < openTime) {
            var timeStamp = openTime - curTime;
            this.currentCounter = this.getTimeFromTimpStamp(timeStamp);
            this.counterMessage = 'layout.counter.until-open';
            this.bell_state = "notifications";
          }
          else if ((curTime >= openTime) && (curTime < closeTime)) {

            var timeStamp = closeTime - curTime;
            this.currentCounter = this.getTimeFromTimpStamp(timeStamp);
            this.counterMessage = 'layout.counter.until-close';
            this.bell_state = "notifications_active";
          }
        }

        this.changeDetector.detectChanges();
      }

    });


    // this.service.eventForSystemStateUpdate.subscribe((state : SYSTEM_STATE) => {
    //   if (!this.changeDetector['destroyed']) {
    //     this.validTradingTime = state.tradeTime;
    //     this.changeDetector.detectChanges();
    //   }
    // });

  }

  ngOnDestroy() {
    
  }

  public getTimeFromTimpStamp(timeStamp) {

    timeStamp = Math.floor(timeStamp / 1000);

    var seconds = timeStamp % 60;
    var minutes = Math.floor(timeStamp / 60) % 60;
    var hours = Math.floor(timeStamp / 3600) % 24;
    var days = Math.floor(timeStamp / (3600 * 24));

    var formattedTime = days + ' Days, ' + hours + ' Hours, ' + minutes + " Minutes, " + seconds + " Seconds";
    return formattedTime;
  }
}