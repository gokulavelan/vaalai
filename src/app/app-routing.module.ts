import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from '@modules/main/main.component';
import {BlankComponent} from '@pages/blank/blank.component';
import {LoginComponent} from '@modules/login/login.component';
import {ProfileComponent} from '@pages/profile/profile.component';
import {RegisterComponent} from '@modules/register/register.component';
import {DashboardComponent} from '@pages/dashboard/dashboard.component';
import {AuthGuard} from '@guards/auth.guard';
import {NonAuthGuard} from '@guards/non-auth.guard';
import {ForgotPasswordComponent} from '@modules/forgot-password/forgot-password.component';
import {RecoverPasswordComponent} from '@modules/recover-password/recover-password.component';
import {SubMenuComponent} from '@pages/main-menu/sub-menu/sub-menu.component';
import { AccountMasterComponent } from '@pages/masters/account-master/account-master.component';
import { NewAccountComponent } from '@pages/masters/account-master/new-account/new-account.component';
import { SubGroupsComponent } from '@pages/masters/account-master/sub-groups/sub-groups.component';
import { AccountGroupingComponent } from '@pages/masters/account-master/account-grouping/account-grouping.component';
import { CompanySelectComponent } from '@modules/company-select/company-select.component';
const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
            {
                path: 'profile',
                component: ProfileComponent
            },
            {
                path: 'blank',
                component: BlankComponent
            },
            {
                path: 'account-master',
                children: [
                    {
                        path: '',
                        component: AccountMasterComponent
                    },
                    {
                        path: 'new-account',
                        component: NewAccountComponent
                    },
                    {
                        path: 'sub-groups',
                        component: SubGroupsComponent
                    },
                    {
                        path: 'account-grouping',
                        component: AccountGroupingComponent
                    },
                    
                ]
            },
            {
                path: 'sub-menu-2',
                component: SubMenuComponent
            },
            {
                path: 'sub-menu-2',
                component: SubMenuComponent
            },
            {
                path: '',
                component: DashboardComponent
            }
        ]
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [NonAuthGuard]
    },
    {
        path: 'company-select',
        component: CompanySelectComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [NonAuthGuard]
    },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        canActivate: [NonAuthGuard]
    },
    {
        path: 'recover-password',
        component: RecoverPasswordComponent,
        canActivate: [NonAuthGuard]
    },
    {path: '**', redirectTo: ''}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {})],
    exports: [RouterModule]
})
export class AppRoutingModule {}
