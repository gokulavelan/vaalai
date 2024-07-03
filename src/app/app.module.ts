import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from '@/app-routing.module';
import {AppComponent} from './app.component';
import {MainComponent} from '@modules/main/main.component';
import {LoginComponent} from '@modules/login/login.component';
import {HeaderComponent} from '@modules/main/header/header.component';
import {FooterComponent} from '@modules/main/footer/footer.component';
import {MenuSidebarComponent} from '@modules/main/menu-sidebar/menu-sidebar.component';
import {BlankComponent} from '@pages/blank/blank.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ProfileComponent} from '@pages/profile/profile.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RegisterComponent} from '@modules/register/register.component';
import {DashboardComponent} from '@pages/dashboard/dashboard.component';
import {ToastrModule} from 'ngx-toastr';
import {MessagesComponent} from '@modules/main/header/messages/messages.component';
import {NotificationsComponent} from '@modules/main/header/notifications/notifications.component';

import {CommonModule, registerLocaleData} from '@angular/common';
import localeEn from '@angular/common/locales/en';
import {UserComponent} from '@modules/main/header/user/user.component';
import {ForgotPasswordComponent} from '@modules/forgot-password/forgot-password.component';
import {RecoverPasswordComponent} from '@modules/recover-password/recover-password.component';
import {LanguageComponent} from '@modules/main/header/language/language.component';
import {MainMenuComponent} from './pages/main-menu/main-menu.component';
import {SubMenuComponent} from './pages/main-menu/sub-menu/sub-menu.component';
import {MenuItemComponent} from './components/menu-item/menu-item.component';
import {ControlSidebarComponent} from './modules/main/control-sidebar/control-sidebar.component';
import {StoreModule} from '@ngrx/store';
import {authReducer} from './store/auth/reducer';
import {uiReducer} from './store/ui/reducer';
import {ProfabricComponentsModule} from '@profabric/angular-components';
import {SidebarSearchComponent} from './components/sidebar-search/sidebar-search.component';
import {NgxGoogleAnalyticsModule} from 'ngx-google-analytics';
import { environment } from 'environments/environment';

import { AccountMasterComponent } from '@pages/masters/account-master/account-master.component';
import { DataTablesModule } from "angular-datatables";
import { NewAccountComponent } from './pages/masters/account-master/new-account/new-account.component';
import { CompanySelectComponent } from './modules/company-select/company-select.component';
import { SubGroupsComponent } from './pages/masters/account-master/sub-groups/sub-groups.component';
import { AccountGroupingComponent } from './pages/masters/account-master/account-grouping/account-grouping.component';
import { ItemMasterComponent } from '@pages/masters/product-master/item-master/item-master.component';
import { NewItemComponent } from './pages/masters/product-master/item-master/new-item/new-item.component';
import { BrandMasterComponent } from './pages/masters/product-master/brand-master/brand-master.component';
import { CategoryMasterComponent } from './pages/masters/product-master/category-master/category-master.component';
import { ReceiptEntryComponent } from './pages/receipt/receipt-entry/receipt-entry.component';
import { ReceiptBookComponent } from './pages/receipt/receipt-book/receipt-book.component';
import { PaymentEntryComponent } from './pages/payment/payment-entry/payment-entry.component';
import { PaymentBookComponent } from './pages/payment/payment-book/payment-book.component';



registerLocaleData(localeEn, 'en-EN');

@NgModule({
    declarations: [
        AppComponent,
        MainComponent,
        LoginComponent,
        HeaderComponent,
        FooterComponent,
        MenuSidebarComponent,
        BlankComponent,
        ProfileComponent,
        RegisterComponent,
        DashboardComponent,
        MessagesComponent,
        NotificationsComponent,
        UserComponent,
        ForgotPasswordComponent,
        RecoverPasswordComponent,
        LanguageComponent,
        MainMenuComponent,
        SubMenuComponent,
        MenuItemComponent,
        ControlSidebarComponent,
        SidebarSearchComponent,
        AccountMasterComponent,
        NewAccountComponent,
        CompanySelectComponent,
        SubGroupsComponent,
        AccountGroupingComponent,
        ItemMasterComponent,
        NewItemComponent,
        BrandMasterComponent,
        CategoryMasterComponent,
        ReceiptEntryComponent,
        ReceiptBookComponent,
        PaymentEntryComponent,
        PaymentBookComponent
    ],
    imports: [
        ProfabricComponentsModule,
        CommonModule,
        BrowserModule,
        StoreModule.forRoot({auth: authReducer, ui: uiReducer}),
        HttpClientModule,
        AppRoutingModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot({
            timeOut: 3000,
            positionClass: 'toast-top-right',
            preventDuplicates: true
        }),
        NgxGoogleAnalyticsModule.forRoot(environment.GA_ID),
        DataTablesModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
