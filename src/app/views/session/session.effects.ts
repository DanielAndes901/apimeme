import { Injectable } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { merge } from 'rxjs';
import { tap, distinctUntilChanged, filter } from 'rxjs/operators';

import {
  AppState,
  selectSettingsLanguage
} from '../../core/core.module';
import { actionSettingsChangeLanguage } from '../../core/settings/settings.actions';

@Injectable()
export class SessionEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private translateService: TranslateService,
    private router: Router
  ) {}

  setTranslateServiceLanguage = createEffect(
    () => () =>
      this.store.pipe(
        select(selectSettingsLanguage),
        distinctUntilChanged(),
        tap(language => this.translateService.use(language))
      ),
    { dispatch: false }
  );

  setTitle = createEffect(
    () =>
      merge(
        this.actions$.pipe(ofType(actionSettingsChangeLanguage)),
        this.router.events.pipe(filter(event => event instanceof ActivationEnd))
      ).pipe(
        tap(() => {
          
        })
      ),
    { dispatch: false }
  );
}
