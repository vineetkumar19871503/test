import { AuthService } from '../auth/auth.service';
import { Component } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent {
    currentLang = 'en';
    toggleClass = 'ft-maximize';
    private loading: boolean = false;
    private url = environment.apiUrl + 'users/logout';
    constructor(
        private _authService: AuthService,
        private http: HttpClient,
        private toastr: ToastsManager,
        public translate: TranslateService
    ) {
        const browserLang: string = translate.getBrowserLang();
        translate.use(browserLang.match(/en|es|pt|de/) ? browserLang : 'en');
    }

    ChangeLanguage(language: string) {
        this.translate.use(language);
    }

    ToggleClass() {
        this.toggleClass = this.toggleClass === 'ft-maximize' ? 'ft-minimize' : 'ft-maximize';
    }

    logout() {
        const self = this;
        let headers = new HttpHeaders();
        self.loading = true;
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', 'Bearer ' + self._authService.getUserData('token'));
        self.http.get(self.url, { headers })
            .subscribe(
                function (res: any) {
                    // self.loading = false;
                    self._authService.logout();
                },
                function (err) {
                    self.loading = false;
                    self.toastr.error(err.error.message, 'Error!', { 'toastLife': 5000 });
                }
            );
    }
}
