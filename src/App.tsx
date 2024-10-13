import React, { useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import Header from './components/Header';
import InvestmentTypeSelector from './components/InvestmentTypeSelector';
import InputTabs from './components/InputTabs';
import CalculationResults from './components/CalculationResults';
import { InvestmentType, InvestmentAnalysis, PropertyDetails, DealDetails, RentalDetails } from './types';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [investmentType, setInvestmentType] = useState<InvestmentType>('buyAndHold');
  const [results, setResults] = useState<InvestmentAnalysis[]>([]);
  const [propertyDetails, setPropertyDetails] = useState<PropertyDetails>({
    address: '',
    squareFootage: 0,
    bedrooms: 0,
    bathrooms: 0,
  });
  const [dealDetails, setDealDetails] = useState<DealDetails>({
    purchasePrice: 0,
    rehabCost: 0,
    rehabDuration: 0,
    closingCosts: 0,
    afterRepairValue: 0,
  });
  const [rentalDetails, setRentalDetails] = useState<RentalDetails>({
    annualAppreciation: 3,
    annualInsurance: 0,
    annualPropertyTax: 0,
    monthlyRent: 0,
    annualMaintenance: 0,
    annualCapEx: 0,
    pmFeePerMonth: 0,
    averageLeaseLength: 0,
    leaseUpFee: 0,
    furnitureAndDecorations: 0,
    personalUsage: 0,
  });

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const calculateInvestment = () => {
    const monthlyData: InvestmentAnalysis[] = [];
    const { purchasePrice, rehabCost, rehabDuration, afterRepairValue } = dealDetails;
    const { annualAppreciation } = rentalDetails;

    const monthlyAppreciation = Math.pow(1 + annualAppreciation / 100, 1 / 12) - 1;

    let currentValue = purchasePrice;

    for (let month = 1; month <= 360; month++) {
      if (month <= rehabDuration) {
        currentValue = purchasePrice + (rehabCost * month) / rehabDuration;
      } else if (month === rehabDuration + 1) {
        currentValue = afterRepairValue;
      } else {
        currentValue *= (1 + monthlyAppreciation);
      }

      monthlyData.push({
        year: Math.ceil(month / 12),
        month,
        value: Math.round(currentValue),
        debt: 0,
        equity: 0,
        cashInvested: 0,
        interestPaid: 0,
        rent: 0,
        expenses: 0,
        cashFlow: 0,
        equityGrowth: 0,
        totalReturn: 0,
        annualReturnOnInvestedCash: 0,
      });
    }

    setResults(monthlyData);
  };

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-900 text-white'}`}>
      <Header>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
        </button>
      </Header>
      <main className="container mx-auto px-4 py-8">
        <InvestmentTypeSelector
          investmentType={investmentType}
          setInvestmentType={setInvestmentType}
        />
        <InputTabs
          investmentType={investmentType}
          onCalculate={calculateInvestment}
          propertyDetails={propertyDetails}
          setPropertyDetails={setPropertyDetails}
          dealDetails={dealDetails}
          setDealDetails={setDealDetails}
          rentalDetails={rentalDetails}
          setRentalDetails={setRentalDetails}
        />
        <CalculationResults results={results} />
      </main>
    </div>
  );
}

export default App;