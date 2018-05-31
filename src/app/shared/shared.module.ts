import { CommonModule } from '@angular/common';
import { CustomizerComponent } from './customizer/customizer.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoadingModule } from 'ngx-loading';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ToggleFullscreenDirective } from './directives/toggle-fullscreen.directive';
import { TranslateModule } from '@ngx-translate/core';
import { FileSelectDirective } from 'ng2-file-upload';

@NgModule({
    exports: [
        CommonModule,
        CustomizerComponent,
        FooterComponent,
        NavbarComponent,
        NgbModule,
        SidebarComponent,
        ToggleFullscreenDirective,
        TranslateModule,
        FileSelectDirective
    ],
    imports: [
        CommonModule,
        LoadingModule,
        NgbModule,
        RouterModule,
        TranslateModule
    ],
    declarations: [
        CustomizerComponent,
        FooterComponent,
        NavbarComponent,
        SidebarComponent,
        ToggleFullscreenDirective,
        FileSelectDirective
    ]
})
export class SharedModule { }
