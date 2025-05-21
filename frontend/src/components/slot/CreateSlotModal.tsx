/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useCallback } from "react";
import { BiLoaderAlt } from "react-icons/bi";
import { SlotSize, VehicleType } from "@/enums";
import { createSlot } from "@/services/slots";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  loading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

interface FormErrors {
  number?: string;
  size?: string;
  vehicleType?: string;
  location?: string;
  feePerHour?: string;
}

const CreateSlotModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  loading,
  setIsLoading,
}) => {
  const [formData, setFormData] = useState({
    number: "",
    size: SlotSize.MEDIUM,
    vehicleType: VehicleType.CAR,
    location: "",
    feePerHour: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const resetForm = () => {
    setFormData({
      number: "",
      size: SlotSize.MEDIUM,
      vehicleType: VehicleType.CAR,
      location: "",
      feePerHour: "",
    });
    setErrors({});
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const validate = () => {
    const newErrors: FormErrors = {};
    if (!formData.number) newErrors.number = "Slot number is required";
    if (!formData.size) newErrors.size = "Slot size is required";
    if (!formData.vehicleType) newErrors.vehicleType = "Vehicle type is required";
    if (!formData.location) newErrors.location = "Location is required";

    const fee = parseFloat(formData.feePerHour);
    if (!formData.feePerHour || isNaN(fee) || fee < 0) {
      newErrors.feePerHour = "Valid positive charging fee is required";
    }

    return newErrors;
  };

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formErrors = validate();
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      await createSlot({ slotData: { ...formData }, setLoading: setIsLoading });
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-lg mx-4 p-6 relative animate-fade-in-up">
        <div className="flex justify-between items-center mb-6">
          <h2 id="modal-title" className="text-2xl font-bold text-gray-800">
            Create Parking Slot
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-red-600 text-lg font-semibold"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Slot Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Slot Number</label>
            <input
              type="text"
              name="number"
              value={formData.number}
              onChange={handleChange}
              disabled={loading}
              placeholder="e.g., A01"
              className={`w-full mt-1 p-2 rounded-md border ${
                errors.number ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.number && <p className="text-red-500 text-sm">{errors.number}</p>}
          </div>

          {/* Vehicle Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Vehicle Type</label>
            <select
              name="vehicleType"
              value={formData.vehicleType}
              onChange={handleChange}
              disabled={loading}
              className={`w-full mt-1 p-2 rounded-md border ${
                errors.vehicleType ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">-- Select Vehicle Type --</option>
              {Object.values(VehicleType).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.vehicleType && <p className="text-red-500 text-sm">{errors.vehicleType}</p>}
          </div>

          {/* Slot Size */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Slot Size</label>
            <select
              name="size"
              value={formData.size}
              onChange={handleChange}
              disabled={loading}
              className={`w-full mt-1 p-2 rounded-md border ${
                errors.size ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">-- Select Slot Size --</option>
              {Object.values(SlotSize).map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            {errors.size && <p className="text-red-500 text-sm">{errors.size}</p>}
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              disabled={loading}
              placeholder="e.g., Basement A"
              className={`w-full mt-1 p-2 rounded-md border ${
                errors.location ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
          </div>

          {/* Charging Fee */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Charging Fee per Hour (USD)
            </label>
            <input
              type="number"
              name="feePerHour"
              value={formData.feePerHour}
              onChange={handleChange}
              disabled={loading}
              placeholder="e.g., 2.5"
              min="0"
              step="0.01"
              className={`w-full mt-1 p-2 rounded-md border ${
                errors.feePerHour ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.feePerHour && (
              <p className="text-red-500 text-sm">{errors.feePerHour}</p>
            )}
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className={`flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-md font-medium hover:bg-green-700 transition ${
                loading ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              {loading && <BiLoaderAlt className="animate-spin" size={20} />}
              {loading ? "Creating..." : "Create Slot"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateSlotModal;
