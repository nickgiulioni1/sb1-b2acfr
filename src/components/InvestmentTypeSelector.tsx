import React from 'react';
import { InvestmentType } from '../types';

interface InvestmentTypeSelectorProps {
  investmentType: InvestmentType;
  setInvestmentType: (type: InvestmentType) => void;
}

const InvestmentTypeSelector: React.FC<InvestmentTypeSelectorProps> = ({
  investmentType,
  setInvestmentType,
}) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Investment Strategy</h2>
      <div className="flex space-x-4">
        {['buyAndHold', 'brrrr', 'flip'].map((type) => (
          <label key={type} className="flex items-center">
            <input
              type="radio"
              value={type}
              checked={investmentType === type}
              onChange={() => setInvestmentType(type as InvestmentType)}
              className="mr-2"
            />
            <span className="capitalize">{type.replace(/([A-Z])/g, ' $1').trim()}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default InvestmentTypeSelector;