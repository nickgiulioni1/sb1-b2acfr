import React, { useState } from 'react';
import { RentalDetails as RentalDetailsType } from '../types';

const RentalDetails: React.FC = () => {
  const [rentalType, setRentalType] = useState<'noRental' | 'longTerm' | 'shortTerm'>('noRental');
  const [rentalDetails, setRentalDetails] = useState<RentalDetailsType>({
    annualAppreciation: 3, // Default set to 3%
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'rentalType') {
      setRentalType(value as 'noRental' | 'longTerm' | 'shortTerm');
    } else {
      setRentalDetails((prev) => ({
        ...prev,
        [name]: Number(value),
      }));
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="rentalType" className="block mb-1 font-medium">
          Rental Type
        </label>
        <select
          id="rentalType"
          name="rentalType"
          value={rentalType}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        >
          <option value="noRental">No Rental</option>
          <option value="longTerm">Long Term Rental</option>
          <option value="shortTerm">Short/Mid Term Rental</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="annualAppreciation" className="block mb-1 font-medium">
            Annual Appreciation (%)
          </label>
          <input
            type="number"
            id="annualAppreciation"
            name="annualAppreciation"
            value={rentalDetails.annualAppreciation}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="annualInsurance" className="block mb-1 font-medium">
            Annual Insurance ($)
          </label>
          <input
            type="number"
            id="annualInsurance"
            name="annualInsurance"
            value={rentalDetails.annualInsurance}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="annualPropertyTax" className="block mb-1 font-medium">
            Annual Property Tax ($)
          </label>
          <input
            type="number"
            id="annualPropertyTax"
            name="annualPropertyTax"
            value={rentalDetails.annualPropertyTax}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>

      {rentalType !== 'noRental' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="monthlyRent" className="block mb-1 font-medium">
              Monthly Rent ($)
            </label>
            <input
              type="number"
              id="monthlyRent"
              name="monthlyRent"
              value={rentalDetails.monthlyRent}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="annualMaintenance" className="block mb-1 font-medium">
              Annual Maintenance (%)
            </label>
            <input
              type="number"
              id="annualMaintenance"
              name="annualMaintenance"
              value={rentalDetails.annualMaintenance}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="annualCapEx" className="block mb-1 font-medium">
              Annual CAPEX (%)
            </label>
            <input
              type="number"
              id="annualCapEx"
              name="annualCapEx"
              value={rentalDetails.annualCapEx}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>

          {rentalType === 'longTerm' && (
            <>
              <div>
                <label htmlFor="pmFeePerMonth" className="block mb-1 font-medium">
                  PM Fee/mo (%)
                </label>
                <input
                  type="number"
                  id="pmFeePerMonth"
                  name="pmFeePerMonth"
                  value={rentalDetails.pmFeePerMonth}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label htmlFor="averageLeaseLength" className="block mb-1 font-medium">
                  Average Lease Length (Yrs)
                </label>
                <input
                  type="number"
                  id="averageLeaseLength"
                  name="averageLeaseLength"
                  value={rentalDetails.averageLeaseLength}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label htmlFor="leaseUpFee" className="block mb-1 font-medium">
                  Lease Up Fee ($)
                </label>
                <input
                  type="number"
                  id="leaseUpFee"
                  name="leaseUpFee"
                  value={rentalDetails.leaseUpFee}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
            </>
          )}

          {rentalType === 'shortTerm' && (
            <>
              <div>
                <label htmlFor="furnitureAndDecorations" className="block mb-1 font-medium">
                  Furniture & Decorations ($)
                </label>
                <input
                  type="number"
                  id="furnitureAndDecorations"
                  name="furnitureAndDecorations"
                  value={rentalDetails.furnitureAndDecorations}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label htmlFor="personalUsage" className="block mb-1 font-medium">
                  Personal Usage (%)
                </label>
                <input
                  type="number"
                  id="personalUsage"
                  name="personalUsage"
                  value={rentalDetails.personalUsage}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default RentalDetails;