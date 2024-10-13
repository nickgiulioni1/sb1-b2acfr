import React from 'react';
import { PropertyDetails as PropertyDetailsType } from '../types';

interface PropertyDetailsProps {
  propertyDetails: PropertyDetailsType;
  setPropertyDetails: React.Dispatch<React.SetStateAction<PropertyDetailsType>>;
}

const PropertyDetails: React.FC<PropertyDetailsProps> = ({ propertyDetails, setPropertyDetails }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPropertyDetails((prev) => ({
      ...prev,
      [name]: name === 'address' ? value : Number(value),
    }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label htmlFor="address" className="block mb-1 font-medium">
          Address
        </label>
        <input
          type="text"
          id="address"
          name="address"
          value={propertyDetails.address}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="squareFootage" className="block mb-1 font-medium">
          Square Footage
        </label>
        <input
          type="number"
          id="squareFootage"
          name="squareFootage"
          value={propertyDetails.squareFootage}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="bedrooms" className="block mb-1 font-medium">
          Bedrooms
        </label>
        <input
          type="number"
          id="bedrooms"
          name="bedrooms"
          value={propertyDetails.bedrooms}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="bathrooms" className="block mb-1 font-medium">
          Bathrooms
        </label>
        <input
          type="number"
          id="bathrooms"
          name="bathrooms"
          value={propertyDetails.bathrooms}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
      </div>
    </div>
  );
};

export default PropertyDetails;