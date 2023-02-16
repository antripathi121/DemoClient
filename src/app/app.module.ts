import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenService } from './service/token.service';
import { EnvironmentService } from './environment.service';
import { AuthInterceptorService } from './service/auth-interceptor.service';


const genToken = (
  tokenSer: TokenService,
) => {
  return async () => {
    const res = await tokenSer.generateToken();
    if (res === true) {
      tokenSer.hasToken.next(true)
      //return true;
    }
  };
};
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [
    TokenService,
    {
      provide: APP_INITIALIZER,
      useFactory: (envService: EnvironmentService) => () => envService.init(),
      multi: true,
      deps: [EnvironmentService],
    },

    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, {
      provide: APP_INITIALIZER,
      useFactory: genToken,
      multi: true,
      deps: [TokenService],
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
