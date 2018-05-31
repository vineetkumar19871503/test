import { AgmCoreModule } from '@agm/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './shared/auth/auth.service';
import { AuthGuard } from './shared/auth/auth-guard.service';
import { AuthRedirect } from './shared/auth/auth-redirect.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import CommonServices from './shared/services/CommonServices';
import { ContentLayoutComponent } from './layouts/content/content-layout.component';
import { CustomOption } from './shared/toastr/custom-option';
import { FullLayoutComponent } from './layouts/full/full-layout.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import HttpServices from './shared/services/HttpServices';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from './shared/shared.module';
import { ToastModule, ToastOptions } from 'ng2-toastr/ng2-toastr';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import * as $ from 'jquery';
import { Ng2CompleterModule } from 'ng2-completer';


export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        AppComponent,
        ContentLayoutComponent,
        FullLayoutComponent
    ],
    imports: [
        // google map config
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyBr5_picK8YJK7fFR2CPzTVMj6GG1TtRGo'
        }),
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        NgbModule.forRoot(),
        SharedModule,
        ToastModule.forRoot(),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        })
    ],
    providers: [
        // Toastr and auth providers
        { provide: ToastOptions, useClass: CustomOption },
        AuthService,
        AuthGuard,
        AuthRedirect,
        CommonServices,
        HttpServices
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
