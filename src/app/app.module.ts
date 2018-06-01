import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { RecaptchaModule } from 'ng-recaptcha';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {RouterModule, Route} from '@angular/router';
import {MatTabsModule} from '@angular/material/tabs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { NgxCarouselModule } from 'ngx-carousel';
import 'hammerjs';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatChipsModule} from '@angular/material/chips';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDialogModule, MatDatepickerModule, MatNativeDateModule, MatDividerModule} from '@angular/material';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatListModule } from '@angular/material/list';
import { MatBadgeModule } from '@angular/material/badge';

import { NgxPageScrollModule } from 'ngx-page-scroll';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AppComponent } from './app.component';
import { LoginComponent } from './page/login/login.component';
import { ServiceComponent } from './page/service/service.component';
import { MaintainanceComponent } from './page/maintainance/maintainance.component';
import { CardTileComponent } from './components/card-tile/card-tile.component';
import { CardContractComponent } from './components/card-contract/card-contract.component';
import { CardTemplateComponent } from './components/card-template/card-template.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavigationBarComponent } from './shared/navigation-bar/navigation-bar.component';
import { ContractRequestComponent } from './page/contract-request/contract-request.component';
import { ContractTemplateComponent } from './page/contract-template/contract-template.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ApiService } from './services/api.service';
import { DaoService } from './services/dao.service';
import { ContractsService } from './contracts.service';
import { HttpModule } from '@angular/http';
import { CardContractListComponent } from './components/card-contract-list/card-contract-list.component';
import { NewContractDialogComponent } from './components/new-contract-dialog/new-contract-dialog.component';
import { WalletComponent } from './page/wallet/wallet.component';
import { NewTemplateDialogComponent } from './components/new-template-dialog/new-template-dialog.component';
import { MatCheckboxModule } from '@angular/material/checkbox';


//Yongyi third party lib
import { ParticlesModule } from 'angular-particle';
import { TextFormatPipe } from './text-format.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const ROUTES: Route[] = [
  { path: '', component: LoginComponent},
  { path: 'service', component: ServiceComponent},
  { path: 'contract', component: ContractRequestComponent},
  { path: 'template', component: ContractTemplateComponent},
  { path: 'wallet', component: WalletComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ServiceComponent,
    MaintainanceComponent,
    CardTileComponent,
    CardContractComponent,
    CardTemplateComponent,
    NavigationBarComponent,
    NavBarComponent,
    FooterComponent,
    ContractRequestComponent,
    ContractTemplateComponent,
    CardContractListComponent,
    NewContractDialogComponent,
    WalletComponent,
    NewTemplateDialogComponent,
    TextFormatPipe,
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatButtonToggleModule,
    RecaptchaModule.forRoot(),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule,
    MatTabsModule,
    RouterModule.forRoot(ROUTES),
    MatSnackBarModule,
    MatSelectModule,
    MatIconModule,
    MatMenuModule,
    NgxCarouselModule,
    MatGridListModule,
    MatChipsModule,
    MatSidenavModule,
    MatExpansionModule,
    HttpModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDividerModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    ParticlesModule,
    NgxPageScrollModule,
    MatListModule,
    MatBadgeModule,
    NgbModule.forRoot()
  ],
  providers: [ApiService, DaoService, ContractsService],
  bootstrap: [AppComponent],
  entryComponents: [NewContractDialogComponent, NewTemplateDialogComponent]
})
export class AppModule { }
