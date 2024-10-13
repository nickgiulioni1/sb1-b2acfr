import React, { useState } from 'react';
import { SalesInputs as SalesInputsType } from '../types';

const SalesInputs: React.FC = () => {
  const [salesInputs, setSalesInputs] = useState<SalesInputsType>({
    agentCommission: 0,
    closingCosts: 0,
    timeOnMarket: 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSalesInputs((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label htmlFor="agentCommission" className="block mb-1 font-medium">
          Agent Commission (%)
        </label>
        <input
          type="number"
          id="agentCommission"
          name="agentCommission"
          value={salesInputs.agentCommission}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="closingCosts" className="block mb-1 font-medium">
          Closing Costs (%)
        </label>
        <input
          type="number"
          id="closingCosts"
          name="closingCosts"
          value={salesInputs.closingCosts}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="timeOnMarket" className="block mb-1 font-medium">
          Time on Market (months)
        </label>
        <input
          type="number"
          id="timeOnMarket"
          name="timeOnMarket"
          value={salesInputs.timeOnMarket}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
      </div>
    </div>
  );
};

export default SalesInputs;