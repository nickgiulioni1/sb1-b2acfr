import React, { useState } from 'react';
import { InvestmentType, PropertyDetails, DealDetails, RentalDetails } from '../types';
import PropertyDetailsComponent from './PropertyDetails';
import DealDetailsComponent from './DealDetails';
import RehabEstimator from './RehabEstimator';
import RentalDetailsComponent from './RentalDetails';
import FinancingDetails from './FinancingDetails';
import SalesInputs from './SalesInputs';

interface InputTabsProps {
  investmentType: InvestmentType;
  onCalculate: () => void;
  propertyDetails: PropertyDetails;
  setPropertyDetails: React.Dispatch<React.SetStateAction<PropertyDetails>>;
  dealDetails: DealDetails;
  setDealDetails: React.Dispatch<React.SetStateAction<DealDetails>>;
  rentalDetails: RentalDetails;
  setRentalDetails: React.Dispatch<React.SetStateAction<RentalDetails>>;
}

const InputTabs: React.FC<InputTabsProps> = ({
  investmentType,
  onCalculate,
  propertyDetails,
  setPropertyDetails,
  dealDetails,
  setDealDetails,
  rentalDetails,
  setRentalDetails,
}) => {
  const [activeTab, setActiveTab] = useState('propertyDetails');

  const tabs = {
    buyAndHold: ['propertyDetails', 'dealDetails', 'rehabEstimator', 'rentalDetails', 'longTermFinancing', 'salesInputs'],
    brrrr: ['propertyDetails', 'dealDetails', 'rehabEstimator', 'rentalDetails', 'shortTermFinancing', 'longTermFinancing', 'salesInputs'],
    flip: ['propertyDetails', 'dealDetails', 'rehabEstimator', 'shortTermFinancing', 'salesInputs'],
  };

  const formatTabName = (tabName: string): string => {
    const specialCases: { [key: string]: string } = {
      'propertyDetails': 'Property Details',
      'dealDetails': 'Deal Details',
      'rehabEstimator': 'Rehab Estimator',
      'rentalDetails': 'Rental Details',
      'shortTermFinancing': 'Short-Term Financing',
      'longTermFinancing': 'Long-Term Financing',
      'salesInputs': 'Sales Inputs',
    };

    return specialCases[tabName] || tabName.replace(/([A-Z])/g, ' $1').trim();
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'propertyDetails':
        return <PropertyDetailsComponent propertyDetails={propertyDetails} setPropertyDetails={setPropertyDetails} />;
      case 'dealDetails':
        return <DealDetailsComponent dealDetails={dealDetails} setDealDetails={setDealDetails} />;
      case 'rehabEstimator':
        return <RehabEstimator propertyDetails={propertyDetails} />;
      case 'rentalDetails':
        return <RentalDetailsComponent rentalDetails={rentalDetails} setRentalDetails={setRentalDetails} />;
      case 'shortTermFinancing':
      case 'longTermFinancing':
        return <FinancingDetails type={activeTab} purchasePrice={dealDetails.purchasePrice} />;
      case 'salesInputs':
        return <SalesInputs />;
      default:
        return null;
    }
  };

  return (
    <div className="mb-8">
      <div className="flex border-b">
        {tabs[investmentType].map((tab) => (
          <button
            key={tab}
            className={`py-2 px-4 font-medium ${
              activeTab === tab
                ? 'border-b-2 border-blue-500 text-blue-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {formatTabName(tab)}
          </button>
        ))}
      </div>
      <div className="mt-4">{renderTabContent()}</div>
      <div className="mt-6">
        <button
          onClick={onCalculate}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Calculate Investment
        </button>
      </div>
    </div>
  );
};

export default InputTabs;