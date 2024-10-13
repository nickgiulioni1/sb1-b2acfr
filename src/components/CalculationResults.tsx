import React, { useState } from 'react';
import { InvestmentAnalysis } from '../types';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface CalculationResultsProps {
  results: InvestmentAnalysis[];
}

const CalculationResults: React.FC<CalculationResultsProps> = ({ results }) => {
  const [expandedYears, setExpandedYears] = useState<number[]>([]);

  const toggleYearExpansion = (year: number) => {
    setExpandedYears((prev) =>
      prev.includes(year) ? prev.filter((y) => y !== year) : [...prev, year]
    );
  };

  const calculateYearlyData = (yearData: InvestmentAnalysis[]): InvestmentAnalysis => {
    const lastMonth = yearData[yearData.length - 1];
    return {
      ...lastMonth,
      value: lastMonth.value,
      debt: Math.round(yearData.reduce((sum, month) => sum + month.debt, 0)),
      equity: Math.round(lastMonth.equity),
      cashInvested: Math.round(yearData.reduce((sum, month) => sum + month.cashInvested, 0)),
      interestPaid: Math.round(yearData.reduce((sum, month) => sum + month.interestPaid, 0)),
      rent: Math.round(yearData.reduce((sum, month) => sum + month.rent, 0)),
      expenses: Math.round(yearData.reduce((sum, month) => sum + month.expenses, 0)),
      cashFlow: Math.round(yearData.reduce((sum, month) => sum + month.cashFlow, 0)),
      equityGrowth: Math.round(lastMonth.value - yearData[0].value),
      totalReturn: Math.round(lastMonth.value - yearData[0].value + yearData.reduce((sum, month) => sum + month.cashFlow, 0)),
      annualReturnOnInvestedCash: 0, // Placeholder for now
    };
  };

  const groupedByYear = results.reduce((acc, month) => {
    const year = Math.ceil(month.month / 12);
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(month);
    return acc;
  }, {} as { [key: number]: InvestmentAnalysis[] });

  const yearlyData = Object.entries(groupedByYear).map(([year, monthlyData]) => ({
    year: parseInt(year),
    data: calculateYearlyData(monthlyData),
  }));

  const renderTableRow = (data: InvestmentAnalysis, isMonthly: boolean = false) => (
    <tr key={`${data.year}-${isMonthly ? 'month' : 'year'}-${data.month}`} className={isMonthly ? 'bg-gray-50' : ''}>
      <td className={`p-2 ${isMonthly ? 'pl-8' : ''}`}>
        {!isMonthly && (
          <button onClick={() => toggleYearExpansion(data.year)} className="mr-2">
            {expandedYears.includes(data.year) ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
        )}
        {isMonthly ? `Month ${data.month}` : `Year ${data.year}`}
      </td>
      <td className="p-2 text-right">${Math.round(data.value).toLocaleString()}</td>
      <td className="p-2 text-right">${Math.round(data.debt).toLocaleString()}</td>
      <td className="p-2 text-right">${Math.round(data.equity).toLocaleString()}</td>
      <td className="p-2 text-right">${Math.round(data.cashInvested).toLocaleString()}</td>
      <td className="p-2 text-right">${Math.round(data.interestPaid).toLocaleString()}</td>
      <td className="p-2 text-right">${Math.round(data.rent).toLocaleString()}</td>
      <td className="p-2 text-right">${Math.round(data.expenses).toLocaleString()}</td>
      <td className="p-2 text-right">${Math.round(data.cashFlow).toLocaleString()}</td>
      <td className="p-2 text-right">${Math.round(data.equityGrowth).toLocaleString()}</td>
      <td className="p-2 text-right">${Math.round(data.totalReturn).toLocaleString()}</td>
      <td className="p-2 text-right">{data.annualReturnOnInvestedCash.toFixed(2)}%</td>
    </tr>
  );

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Investment Analysis</h2>
      {results.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 text-left">Year/Month</th>
                <th className="p-2 text-right">Value</th>
                <th className="p-2 text-right">Debt</th>
                <th className="p-2 text-right">Equity</th>
                <th className="p-2 text-right">Cash Invested</th>
                <th className="p-2 text-right">Interest Paid</th>
                <th className="p-2 text-right">Rent</th>
                <th className="p-2 text-right">Expenses</th>
                <th className="p-2 text-right">Cash Flow</th>
                <th className="p-2 text-right">Equity Growth</th>
                <th className="p-2 text-right">Total Return</th>
                <th className="p-2 text-right">Annual ROI</th>
              </tr>
            </thead>
            <tbody>
              {yearlyData.map(({ year, data }) => (
                <React.Fragment key={year}>
                  {renderTableRow(data)}
                  {expandedYears.includes(year) &&
                    groupedByYear[year].map((monthData) => renderTableRow(monthData, true))
                  }
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No results to display. Please calculate the investment first.</p>
      )}
    </div>
  );
};

export default CalculationResults;