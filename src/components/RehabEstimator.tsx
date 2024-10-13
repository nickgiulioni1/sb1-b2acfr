import React, { useState, useEffect } from 'react';
import { RehabDetails, RehabItem, PropertyDetails } from '../types';

interface RehabEstimatorProps {
  propertyDetails: PropertyDetails;
}

const initialRehabDetails: RehabDetails = {
  kitchen: [
    { id: 'newKitchen', description: 'New Kitchen', quantity: 1, price: 7000, extended: 7000 },
    { id: 'kitchenAppliances', description: 'Kitchen Appliances', quantity: 1, price: 3000, extended: 3000 },
    { id: 'newCountertops', description: 'New Countertops', quantity: 1, price: 1500, extended: 1500 },
    { id: 'paintCabinets', description: 'Paint Cabinets + Pulls', quantity: 1, price: 1200, extended: 1200 },
  ],
  bathrooms: [
    { id: 'newBathroom', description: 'New Bathroom', quantity: 1, price: 5500, extended: 5500 },
    { id: 'newVanity', description: 'New Vanity', quantity: 1, price: 400, extended: 400 },
    { id: 'newMirrorLight', description: 'New Mirror/Light', quantity: 1, price: 300, extended: 300 },
    { id: 'newToilet', description: 'New Toilet', quantity: 1, price: 450, extended: 450 },
  ],
  general: [
    { id: 'lvpFlooring', description: 'LVP Flooring', quantity: 1, price: 6, extended: 6 },
    { id: 'carpeting', description: 'Carpeting', quantity: 1, price: 2.5, extended: 2.5 },
    { id: 'demoDumpster', description: 'Demo/Dumpster', quantity: 1, price: 2500, extended: 2500 },
    { id: 'drywall', description: 'Drywall', quantity: 1, price: 14.5, extended: 14.5 },
    { id: 'interiorPaint', description: 'Interior Paint', quantity: 1, price: 3, extended: 3 },
    { id: 'interiorDoors', description: 'New Interior Doors', quantity: 1, price: 275, extended: 275 },
    { id: 'doorKnobs', description: 'Door Knobs', quantity: 1, price: 40, extended: 40 },
    { id: 'smokeDetectors', description: 'Smoke/CO2 Detectors', quantity: 1, price: 50, extended: 50 },
    { id: 'windows', description: 'New Windows', quantity: 10, price: 400, extended: 4000 },
    { id: 'windowBlinds', description: 'Window Blinds', quantity: 10, price: 50, extended: 500 },
  ],
  exterior: [
    { id: 'exteriorDoors', description: 'New Exterior Doors', quantity: 2, price: 500, extended: 1000 },
    { id: 'exteriorPaint', description: 'Exterior Paint', quantity: 1, price: 5000, extended: 5000 },
    { id: 'newSiding', description: 'New Siding + Fascia', quantity: 1, price: 15000, extended: 15000 },
    { id: 'powerWash', description: 'Power Wash', quantity: 1, price: 750, extended: 750 },
    { id: 'landscaping', description: 'Landscaping', quantity: 1, price: 1500, extended: 1500 },
    { id: 'concretePorch', description: 'Concrete Porch Work', quantity: 1, price: 1500, extended: 1500 },
  ],
  mechanicals: [
    { id: 'newRoof', description: 'New Roof', quantity: 1, price: 10000, extended: 10000 },
    { id: 'electrical', description: 'Electrical', quantity: 1, price: 6000, extended: 6000 },
    { id: 'newAC', description: 'New AC', quantity: 1, price: 3800, extended: 3800 },
    { id: 'newFurnace', description: 'New Furnace', quantity: 1, price: 3000, extended: 3000 },
    { id: 'waterHeater', description: 'Water Heater', quantity: 1, price: 1500, extended: 1500 },
  ],
  contingency: [
    { id: 'fivePercent', description: 'Five Percent', quantity: 1, price: 0, extended: 0 },
    { id: 'unexpectedPerFoot', description: 'Unexpected Per Foot', quantity: 1, price: 5, extended: 5 },
    { id: 'otherCosts', description: 'Other Costs', quantity: 1, price: 5000, extended: 5000 },
  ],
};

const RehabEstimator: React.FC<RehabEstimatorProps> = ({ propertyDetails }) => {
  const [rehabDetails, setRehabDetails] = useState<RehabDetails>(initialRehabDetails);
  const [rehabStrategy, setRehabStrategy] = useState<'rental' | 'flip'>('rental');
  const [selectedItems, setSelectedItems] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    updateQuantities();
  }, [propertyDetails]);

  const updateQuantities = () => {
    const updatedDetails = { ...rehabDetails };
    updatedDetails.general.find(item => item.id === 'lvpFlooring')!.quantity = propertyDetails.squareFootage;
    updatedDetails.general.find(item => item.id === 'carpeting')!.quantity = propertyDetails.squareFootage;
    updatedDetails.bathrooms.forEach(item => item.quantity = propertyDetails.bathrooms);
    updatedDetails.general.find(item => item.id === 'interiorDoors')!.quantity = propertyDetails.bedrooms + propertyDetails.bathrooms + 2;
    updatedDetails.general.find(item => item.id === 'doorKnobs')!.quantity = propertyDetails.bedrooms + propertyDetails.bathrooms + 2;
    updatedDetails.general.find(item => item.id === 'smokeDetectors')!.quantity = propertyDetails.bedrooms + 1;
    setRehabDetails(updatedDetails);
  };

  const handleStrategyChange = (strategy: 'rental' | 'flip') => {
    setRehabStrategy(strategy);
    const updatedDetails = { ...rehabDetails };
    Object.keys(updatedDetails).forEach((category) => {
      updatedDetails[category as keyof RehabDetails].forEach((item) => {
        if (strategy === 'flip') {
          item.price *= 1.2;
        } else {
          item.price /= 1.2;
        }
        item.extended = item.quantity * item.price;
      });
    });
    setRehabDetails(updatedDetails);
  };

  const handleCheckboxChange = (itemId: string) => {
    setSelectedItems((prev) => ({ ...prev, [itemId]: !prev[itemId] }));
  };

  const handleItemChange = (
    category: keyof RehabDetails,
    itemId: string,
    field: 'quantity' | 'price',
    value: number
  ) => {
    const updatedDetails = { ...rehabDetails };
    const item = updatedDetails[category].find((i) => i.id === itemId);
    if (item) {
      item[field] = value;
      item.extended = item.quantity * item.price;
    }
    setRehabDetails(updatedDetails);
  };

  const calculateTotalRehabCost = () => {
    return Object.values(rehabDetails).reduce((total, category) => {
      return total + category.reduce((categoryTotal, item) => {
        return categoryTotal + (selectedItems[item.id] ? item.extended : 0);
      }, 0);
    }, 0);
  };

  return (
    <div className="overflow-x-auto">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Rehab Strategy</h3>
        <div className="flex space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              value="rental"
              checked={rehabStrategy === 'rental'}
              onChange={() => handleStrategyChange('rental')}
              className="mr-2"
            />
            Rental Grade
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="flip"
              checked={rehabStrategy === 'flip'}
              onChange={() => handleStrategyChange('flip')}
              className="mr-2"
            />
            Flip/Airbnb Grade
          </label>
        </div>
      </div>
      {Object.entries(rehabDetails).map(([category, items]) => (
        <div key={category} className="mb-6">
          <h3 className="text-lg font-semibold mb-2 capitalize">{category}</h3>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left p-2 w-1/2">Item</th>
                <th className="text-right p-2 w-1/6">Quantity</th>
                <th className="text-right p-2 w-1/6">Price ($)</th>
                <th className="text-right p-2 w-1/6">Extended ($)</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="p-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedItems[item.id] || false}
                        onChange={() => handleCheckboxChange(item.id)}
                        className="mr-2"
                      />
                      {item.description}
                    </label>
                  </td>
                  <td className="p-2">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        handleItemChange(category as keyof RehabDetails, item.id, 'quantity', Number(e.target.value))
                      }
                      className="w-full text-right p-1 border rounded"
                      disabled={!selectedItems[item.id]}
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="number"
                      value={item.price}
                      onChange={(e) =>
                        handleItemChange(category as keyof RehabDetails, item.id, 'price', Number(e.target.value))
                      }
                      className="w-full text-right p-1 border rounded"
                      disabled={!selectedItems[item.id]}
                    />
                  </td>
                  <td className="p-2 text-right">{selectedItems[item.id] ? item.extended.toFixed(2) : '0.00'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
      <div className="text-xl font-bold text-right">
        Total Rehab Cost: ${calculateTotalRehabCost().toFixed(2)}
      </div>
    </div>
  );
};

export default RehabEstimator;