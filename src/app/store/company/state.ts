export interface CompanyState {
    companies: Company[];  // List of companies
    selectedCompany: Company | null;  // Selected company details
}

export const initialCompanyState: CompanyState = {
    companies: [],
    selectedCompany: null
};

export interface Company {
    id: number;
    name: string;
    surname: string;
    address: string;
    city: string;
    pincode: string;
    phone: string;
    mobile: string;
    email: string;
    pan_no: string;
    tin_no: string;
    cst_no: string;
    area: string;
    ho: string;
    created_at: string;
    updated_at: string;
}
