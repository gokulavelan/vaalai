import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders, HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { firstValueFrom } from 'rxjs';
import { Group, SubGroup } from '@/store/groups/state';
import { Account } from '@/store/account/state';
import { Payment } from '@/store/payment/state';
import { Receipt } from '@/store/receipt/state';
@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(private http: HttpClient) {}

    baseUrl = environment.base_url;

    login(email: string, password: string): Observable<any> {
        return this.http.post(`${this.baseUrl}/api/auth/login`, { email, password });
    }

    getUserProfile(): Observable<any> {
        return this.http.get(`${this.baseUrl}/api/auth/user`);
    }


    getCompanies(): Observable<any>{
        return this.http.get(`${this.baseUrl}/api/v1/companies`);
    }

    getAccounts(company_id:number = null): Observable<any>{
        return this.http.get(`${this.baseUrl}/api/v1/accountswithSubGroup?company_id=${company_id}`);
    }

    setAccounts(body: Account): Observable<any>{
        return this.http.post(`${this.baseUrl}/api/v1/accounts`,body);
    }
    getAccountById(accountId: number): Observable<any>{
        return this.http.get(`${this.baseUrl}/api/v1/accounts/${accountId}`);
    }
    // Update an account
    updateAccount(accountId: number, account: Partial<Account>): Observable<any> {
        return this.http.put(`${this.baseUrl}/api/v1/accounts/${accountId}`, account);
    }

    // Delete an account
    deleteAccount(accountId: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}/api/v1/accounts/${accountId}`);
    }



    //#region groups
    getGroups(): Observable<any>{
        return this.http.get(`${this.baseUrl}/api/v1/group`);
    }
    
    getSubGroups(): Observable<any>{
        return this.http.get(`${this.baseUrl}/api/v1/subgroup`);
    }

    setGroup(body: Group): Observable<any>{
        return this.http.post(`${this.baseUrl}/api/v1/group`,body);
    }

    setSubGroup(body: SubGroup): Observable<any>{
        return this.http.post(`${this.baseUrl}/api/v1/subgroup`,body);
    }
    
    // Get by ID (for edit)
    getGroupById(groupId: number): Observable<any> {
        return this.http.get<Group>(`${this.baseUrl}/api/v1/group/${groupId}`);
    }

    getSubGroupById(subGroupId: number): Observable<any> {
        return this.http.get<SubGroup>(`${this.baseUrl}/api/v1/subgroup/${subGroupId}`);
    }

    // Update
    updateGroup(groupId: number, body: Group): Observable<any> {
        return this.http.put(`${this.baseUrl}/api/v1/group/${groupId}`, body);
    }

    updateSubGroup(subGroupId: number, body: SubGroup): Observable<any> {
        return this.http.put(`${this.baseUrl}/api/v1/subgroup/${subGroupId}`, body);
    }

    // Delete
    deleteGroup(groupId: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}/api/v1/group/${groupId}`);
    }

    deleteSubGroup(subGroupId: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}/api/v1/subgroup/${subGroupId}`);
    }
    //#endregion

    //#region  Payment
    getPayments(company_id:number, date_from: string = '', date_to: string = '', payment_type: string = '',page:number): Observable<any> {
        let queryParams = `?company_id=${company_id}`; // Fixed company_id
    
        if (date_from) queryParams += `&date_from=${date_from}`;
        if (date_to) queryParams += `&date_to=${date_to}`;
        if (payment_type) queryParams += `&payment_type=${payment_type}`;
        if (page) queryParams += `&page=${page}`
    
        return this.http.get(`${this.baseUrl}/api/v1/payments${queryParams}`);
    }

    setPayment(body: Payment): Observable<any> {
        return this.http.post(`${this.baseUrl}/api/v1/payments`, body);
    }

    getPaymentById(paymentId: number): Observable<any> {
        return this.http.get(`${this.baseUrl}/api/v1/payments/${paymentId}`);
    }

    updatePayment(paymentId: number, payment: Partial<Payment>): Observable<any> {
        return this.http.put(`${this.baseUrl}/api/v1/payments/${paymentId}`, payment);
    }

    deletePayment(paymentId: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}/api/v1/payments/${paymentId}`);
    }
    getPaymentsForReport(company_id:number,date_from: string = '', date_to: string = '', payment_type: string = ''): Observable<any> {
        let queryParams = `?company_id=${company_id}`; // Fixed company_id
    
        if (date_from) queryParams += `&date_from=${date_from}`;
        if (date_to) queryParams += `&date_to=${date_to}`;
        if (payment_type) queryParams += `&payment_type=${payment_type}`;
    
        return this.http.get(`${this.baseUrl}/api/v1/paymentsReport${queryParams}`);
    }

    //#endregion

    //#region Receipt
    getReceipts(company_id:number,date_from: string = '', date_to: string = '', payment_type: string = '',page:number = 0): Observable<any> {
        let queryParams = `?company_id=${company_id}`; // Fixed company_id
    
        if (date_from) queryParams += `&date_from=${date_from}`;
        if (date_to) queryParams += `&date_to=${date_to}`;
        if (payment_type) queryParams += `&payment_type=${payment_type}`;
        if (page) queryParams += `&page=${page}`;
    
        return this.http.get(`${this.baseUrl}/api/v1/receipts${queryParams}`);
    }

    setReceipt(body: Receipt): Observable<any> {
        return this.http.post(`${this.baseUrl}/api/v1/receipts`, body);
    }

    getReceiptById(receiptId: number): Observable<any> {
        return this.http.get(`${this.baseUrl}/api/v1/receipts/${receiptId}`);
    }

    updateReceipt(receiptId: number, receipt: Partial<Receipt>): Observable<any> {
        return this.http.put(`${this.baseUrl}/api/v1/receipts/${receiptId}`, receipt);
    }

    deleteReceipt(receiptId: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}/api/v1/receipts/${receiptId}`);
    }
    getReceiptsForReport(company_id:number,date_from: string = '', date_to: string = '', payment_type: string = ''): Observable<any> {
        let queryParams = `?company_id=${company_id}`; // Fixed company_id
    
        if (date_from) queryParams += `&date_from=${date_from}`;
        if (date_to) queryParams += `&date_to=${date_to}`;
        if (payment_type) queryParams += `&payment_type=${payment_type}`;
    
        return this.http.get(`${this.baseUrl}/api/v1/receiptsReport${queryParams}`);
    }
    //#endregion

    //#region  Day Book
    getDayBook(fromDate: string = '', toDate: string = '', companyId: number): Observable<any> {
        let queryParams = `?company_id=${companyId}`;
      
        if (fromDate) queryParams += `&date_from=${fromDate}`;
        if (toDate) queryParams += `&date_to=${toDate}`;
      
        return this.http.get(`${this.baseUrl}/api/v1/daybook${queryParams}`);
      }
      
    //#endregion
    //#region Ledger Book
    getLedgerBook(accountId: number, fromDate: string = '', toDate: string = '', monthlyClosing: boolean = false): Observable<any> {
        let queryParams = `?account_id=${accountId}`;
        
        if (fromDate) queryParams += `&date_from=${fromDate}`;
        if (toDate) queryParams += `&date_to=${toDate}`;
        if (monthlyClosing) queryParams += `&monthly_closing=${monthlyClosing}`;
    
        return this.http.get(`${this.baseUrl}/api/v1/ledger${queryParams}`);
    }
    //#endregion
    
}


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
        const token = localStorage.getItem('token');
       // console.log('Intercepting request:', req.url);
        
        if (token) {
           // console.log('Adding Authorization header with token:', token);
            const cloned = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
           // console.log('Modified request with headers:', cloned.headers);
            return next.handle(cloned);
        }
        
        return next.handle(req);
    }
    
}