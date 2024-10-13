export type InvestmentType = 'buyAndHold' | 'brrrr' | 'flip';

export interface PropertyDetails {
  address: string;
  squareFootage: number;
  bedrooms: number;
  bathrooms: number;
}

export interface DealDetails {
  purchasePrice: number;
  rehabCost: number;
  holdingPeriod: number;
  closingCosts: number;
  afterRepairValue: number;
}

export interface RehabItem {
  id: string;
  description: string;
  quantity: number;
  price: number;
  extended: number;
}

export interface RehabCategory {
  [key: string]: RehabItem[];
}

export interface RehabDetails {
  kitchen: RehabItem[];
  bathrooms: RehabItem[];
  general: RehabItem[];
  exterior: RehabItem[];
  mechanicals: RehabItem[];
  contingency: RehabItem[];
}

export interface RentalDetails {
  monthlyRent: number;
  otherIncome: number;
  vacancyRate: number;
  propertyManagementFee: number;
  propertyTaxes: number;
  insurance: number;
  maintenance: number;
  utilities: number;
  hoaFees: number;
}

export interface FinancingDetails {
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  monthlyPayment: number;
}

export interface SalesInputs {
  salesPrice: number;
  sellingCosts: number;
}

export interface InvestmentAnalysis {
  year: number;
  value: number;
  debt: number;
  equity: number;
  cashInvested: number;
  interestPaid: number;
  rent: number;
  expenses: number;
  cashFlow: number;
  equityGrowth: number;
  totalReturn: number;
  annualReturnOnInvestedCash: number;
}