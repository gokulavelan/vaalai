import {AppState} from '@/store/state';
import {UiState} from '@/store/ui/state';
import {Component, HostBinding, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppService} from '@services/app.service';
import {Observable} from 'rxjs';

const BASE_CLASSES = 'main-sidebar elevation-4';
@Component({
    selector: 'app-menu-sidebar',
    templateUrl: './menu-sidebar.component.html',
    styleUrls: ['./menu-sidebar.component.scss']
})
export class MenuSidebarComponent implements OnInit {
    @HostBinding('class') classes: string = BASE_CLASSES;
    public ui: Observable<UiState>;
    public user;
    public menu = MENU;

    constructor(
        public appService: AppService,
        private store: Store<AppState>
    ) {}

    ngOnInit() {
        this.ui = this.store.select('ui');
        this.ui.subscribe((state: UiState) => {
            this.classes = `${BASE_CLASSES} ${state.sidebarSkin}`;
        });
        this.user = this.appService.user;
    }
}

export const MENU = [
    {
        name: 'Dashboard',
        iconClasses: 'fas fa-tachometer-alt',
        path: ['/']
    },
    {
        name: 'Book Keeping',
        iconClasses: 'fas fa-file',
        children:[
            {
                name: 'Payment',
                iconClasses: 'far fa-address-book',
                path: ['book-keeping/payment-book']
            },
            {
                name: 'Receipt',
                iconClasses: 'far fa-address-book',
                path: ['book-keeping/receipt-book']
            },
            {
                name: 'Day Book',
                iconClasses: 'far fa-address-book',
                path: ['book-keeping/day-book']
            },
            {
                name: 'Ledger',
                iconClasses: 'far fa-address-book',
                path: ['book-keeping/ledger']
            },
        ]
    },
    {
        name: 'Masters',
        iconClasses: 'fas fa-folder',
        children: [
            {
                name: 'Company',
                iconClasses: 'fas fa-tachometer-alt',
                path: ['/company-master']
            },
            {
                name: 'Accounts',
                iconClasses: 'far fa-address-book',
                children: [
                    {
                        name: 'Account Master',
                        iconClasses: 'fas fa-file',
                        path: ['/account-master']
                    },
                    {
                        name: 'Sub Groups',
                        iconClasses: 'fas fa-file',
                        path: ['/account-master/sub-groups']
                    },
                    {
                        name: 'Account Groups',
                        iconClasses: 'fas fa-file',
                        path: ['/accountGroups']
                    },
                    {
                        name: 'Account Grouping',
                        iconClasses: 'fas fa-file',
                        path: ['/accountGrouping']
                    },
                ]
            },
            {
                name: 'Tax',
                iconClasses: 'fas fa-file',
                children: [
                    {
                        name: 'Purchase Tax Setting',
                        iconClasses: 'fas fa-file',
                        path: ['/purchaseTaxSet']
                    },
                    {
                        name: 'Sales Tax Setting',
                        iconClasses: 'fas fa-file',
                        path: ['/salesTaxSet']
                    },
                    {
                        name: 'Tax Master',
                        iconClasses: 'fas fa-file',
                        path: ['/taxMaster']
                    }
                ]
            },
            {
                name: 'Product',
                iconClasses: 'fas fa-file',
                children: [
                    {
                        name: 'Item Master',
                        iconClasses: 'fas fa-file',
                        path: ['/product-master/item']
                    },
                    {
                        name: 'Brand Master',
                        iconClasses: 'fas fa-file',
                        path: ['/product-master/brand']
                    },
                    {
                        name: 'Category Master',
                        iconClasses: 'fas fa-file',
                        path: ['/product-master/category']
                    },
                    {
                        name: 'Correction',
                        iconClasses: 'fas fa-file',
                        path: ['/correction']
                    },
                ]
            },
            {
                name: 'Others',
                iconClasses: 'fas fa-file',
                children: [
                    {
                        name: 'State',
                        iconClasses: 'fas fa-file',
                        path: ['/stateMaster']
                    },
                    {
                        name: 'City',
                        iconClasses: 'fas fa-file',
                        path: ['/sub-menu-3']
                    },
                    {
                        name: 'Area',
                        iconClasses: 'fas fa-file',
                        path: ['/sub-menu-2']
                    },
                    {
                        name: 'Bank',
                        iconClasses: 'fas fa-file',
                        path: ['/sub-menu-3']
                    },
                    ,
                    {
                        name: 'Unit',
                        iconClasses: 'fas fa-file',
                        path: ['/sub-menu-3']
                    }
                ]
            }
        ]
    }
];
