import React, { useState, useEffect } from 'react';
import { FinancingDetails as FinancingDetailsType } from '../types';

interface FinancingDetailsProps {
  type: 'shortTermFinancing' | 'longTermFinancing';
  purchasePrice: number;
}

const FinancingDetails: React.FC<FinancingDetailsProps> = ({ type, purchasePrice }) => {
  const [financingDetails, setFinancingDetails] = useState<FinancingDetailsType>({
    interestRate: type === 'longTermFinancing' ? 7 : 10,
    lenderPoints: type === 'longTermFinancing' ? 0 : 2,
    loanTerm: 30,
    loanToValue: 80,
    amountOfPurchaseLoaned: 90,
    amountOfRehabLoaned: 90,
  });

  useEffect(() => {
    setFinancingDetails(prev => ({
      ...prev,
      interestRate: type === 'longTermFinancing' ? 7 : 10,
      lenderPoints: type === 'longTermFinancing' ? 0 : 2,
    }));
  }, [type]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFinancingDetails((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">
        {type === 'shortTermFinancing' ? 'Short-Term Financing' : 'Long-Term Financing'}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="interestRate" className="block mb-1 font-medium">
            Interest Rate (%)
          </label>
          <input
            type="number"
            id="interestRate"
            name="interestRate"
            value={financingDetails.interestRate}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="lenderPoints" className="block mb-1 font-medium">
            Lender Points
          </label>
          <input
            type="number"
            id="lenderPoints"
            name="lenderPoints"
            value={financingDetails.lenderPoints}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        {type === 'longTermFinancing' && (
          <>
            <div>
              <label htmlFor="loanTerm" className="block mb-1 font-medium">
                Loan Term (years)
              </label>
              <input
                type="number"
                id="loanTerm"
                name="loanTerm"
                value={financingDetails.loanTerm}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label htmlFor="loanToValue" className="block mb-1 font-medium">
                Loan to Value (%)
              </label>
              <input
                type="number"
                id="loanToValue"
                name="loanToValue"
                value={financingDetails.loanToValue}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
          </>
        )}
        {type === 'shortTermFinancing' && (
          <>
            <div>
              <label htmlFor="amountOfPurchaseLoaned" className="block mb-1 font-medium">
                Amount of Purchase Loaned (%)
              </label>
              <input
                type="number"
                id="amountOfPurchaseLoaned"
                name="amountOfPurchaseLoaned"
                value={financingDetails.amountOfPurchaseLoaned}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label htmlFor="amountOfRehabLoaned" className="block mb-1 font-medium">
                Amount of Rehab Loaned (%)
              </label>
              <input
                type="number"
                id="amountOfRehabLoaned"
                name="amountOfRehabLoaned"
                value={financingDetails.amountOfRehabLoaned}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FinancingDetails;