import React, { useContext, useState } from "react";
import { DataContext } from "./shared/DataContext";
import { Input } from "./shared/Input";

export const EventForm = () => {
  const {events, setEvents } = useContext(DataContext);

  const productOptions = ["TG25948", "MM26092BGJ", "BM11120", "CJ44130"];
  const assetOptions = ["331854AAC000060000000034", "331854AAC000060000000005", "331854AAC00006000000000B", "331854AAC000060000000048", "331854AAC000060000000052", ];

  const [formData, setFormData] = useState({
    locationCode: "",
    type: "out",
    assetCode: assetOptions[0],
    productCode: productOptions[0],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.locationCode && formData.assetCode && formData.productCode) {
      const newEvent = {
        id: Math.random().toString(36).substring(0, 9),
        locationCode: formData.locationCode,
        type: formData.type as "out" | "in",
        assetCode: formData.assetCode,
        productCode: formData.productCode,
        date: new Date(),
      };

      if (setEvents) {
        setEvents([...events, newEvent]);
      }

    } else {
      alert("Please fill all required fields.");
    }
  };

  return (
    <div className="p-6 bg-gray-900 text-gray-100 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Add New Event</h2>
      <form onSubmit={handleSubmit} className="gap-4 grid grid-cols-2">
        <div>
          <label className="block mb-1 text-sm font-medium">Location Code</label>
          <Input
            type="text"
            name="locationCode"
            value={formData.locationCode}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-700 rounded bg-gray-800 text-gray-100"
            placeholder="A123-0"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-700 rounded bg-gray-800 text-gray-100"
          >
            <option value="out">Out</option>
            <option value="in">In</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Asset Code</label>
          <select
            name="assetCode"
            value={formData.assetCode}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-700 rounded bg-gray-800 text-gray-100"
          >
            {assetOptions.map((asset) => (
              <option key={asset} value={asset}>
                {asset}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Product Code</label>
          <select
            name="productCode"
            value={formData.productCode}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-700 rounded bg-gray-800 text-gray-100"
          >
            {productOptions.map((product) => (
              <option key={product} value={product}>
                {product}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-500 rounded text-white font-medium"
        >
          Add Event
        </button>
      </form>
    </div>
  );
};

