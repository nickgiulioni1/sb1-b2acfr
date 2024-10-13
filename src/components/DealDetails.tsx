import React, { useState, useEffect } from 'react';
import { DealDetails as DealDetailsType } from '../types';

interface DealDetailsProps {
  dealDetails: DealDetailsType;
  setDealDetails: React.Dispatch<React.SetStateAction<DealDetailsType>>;
}

const DealDetails: React.FC<DealDetailsProps> = ({ dealDetails, setDealDetails }) => {
  const [isInitialRender, setIsInitialRender] = useState(true);

  useEffect(() => {
    if (isInitialRender) {
      setIsInitialRender(false);
      return;
    }

    setDealDetails(prev => ({
      ...prev,
      closingCosts: Math.round(prev.purchasePrice * 0.01), // 1% of Purchase Price
    }));
  }, [dealDetails.purchasePrice, setDealDetails, isInitialRender]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = Number(value);
    setDealDetails((prev) => {
      const updatedDetails = {
        ...prev,
        [name]: numValue,
      };
      
      // Update After Repair Value when Purchase Price changes
      if (name === 'purchasePrice') {
        updatedDetails.afterRepairValue = numValue;
      }
      
      return updatedDetails;
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label htmlFor="purchasePrice" className="block mb-1 font-medium">
          Purchase Price
        </label>
        <input
          type="number"
          id="purchasePrice"
          name="purchasePrice"
          value={dealDetails.purchasePrice}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="rehabCost" className="block mb-1 font-medium">
          Rehab Cost
        </label>
        <input
          type="number"
          id="rehabCost"
          name="rehabCost"
          value={dealDetails.rehabCost}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="rehabDuration" className="block mb-1 font-medium">
          Rehab Duration (months)
        </label>
        <input
          type="number"
          id="rehabDuration"
          name="rehabDuration"
          value={dealDetails.rehabDuration}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="closingCosts" className="block mb-1 font-medium">
          Closing Costs
        </label>
        <input
          type="number"
          id="closingCosts"
          name="closingCosts"
          value={dealDetails.closingCosts}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="afterRepairValue" className="block mb-1 font-medium">
          After Repair Value (ARV)
        </label>
        <input
          type="number"
          id="afterRepairValue"
          name="afterRepairValue"
          value={dealDetails.afterRepairValue}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
      </div>
    </div>
  );
};

export default DealDetails;