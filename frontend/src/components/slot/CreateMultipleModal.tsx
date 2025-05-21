import React, { useState } from "react";
import { BiLoaderAlt } from "react-icons/bi";
import { SlotSize, VehicleType } from "@/enums";
import { createSlots } from "@/services/slots";
import { CreateSlot } from "@/types";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  loading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateMultipleSlotsModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  loading,
  setIsLoading,
}) => {
  const [slots, setSlots] = useState<CreateSlot[]>([
    {
      number: "",
      size: SlotSize.MEDIUM,
      vehicleType: VehicleType.CAR,
      location: "",
      feePerHour: "",
    },
  ]);

  const [errors, setErrors] = useState<Array<Record<string, string>>>([{}]);

  const validateSlot = (slot: CreateSlot) => {
    const slotErrors: Record<string, string> = {};
    if (!slot.number) slotErrors.number = "Slot number is required";
    if (!slot.size) slotErrors.size = "Slot size is required";
    if (!slot.vehicleType) slotErrors.vehicleType = "Vehicle type is required";
    if (!slot.location) slotErrors.location = "Location is required";
    if (!slot.feePerHour) slotErrors.feePerHour = "Fee per hour is required";
    return slotErrors;
  };

  const validateAll = () => {
    const allErrors = slots.map(validateSlot);
    setErrors(allErrors);
    return allErrors.every((slotErr) => Object.keys(slotErr).length === 0);
  };

  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const updatedSlots = [...slots];
    updatedSlots[index] = {
      ...updatedSlots[index],
      [name]: value,
    };
    setSlots(updatedSlots);
  };

  const addSlot = () => {
    setSlots([
      ...slots,
      {
        number: "",
        size: SlotSize.MEDIUM,
        vehicleType: VehicleType.CAR,
        location: "",
        feePerHour: "",
      },
    ]);
    setErrors([...errors, {}]);
  };

  const removeSlot = (index: number) => {
    if (slots.length === 1) return;
    const updatedSlots = slots.filter((_, i) => i !== index);
    const updatedErrors = errors.filter((_, i) => i !== index);
    setSlots(updatedSlots);
    setErrors(updatedErrors);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateAll()) return;

    setIsLoading(true);
    createSlots({ slots, setIsLoading, onClose });

    setSlots([
      {
        number: "",
        size: SlotSize.MEDIUM,
        vehicleType: VehicleType.CAR,
        location: "",
        feePerHour: "",
      },
    ]);
    setErrors([{}]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6">
      <div className="bg-white rounded-xl w-full max-w-5xl shadow-2xl overflow-auto max-h-[95vh]">
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Add Multiple Parking Slots</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 text-2xl font-bold"
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {slots.map((slot, index) => (
            <div key={index} className="bg-gray-200 rounded-lg p-6 relative shadow">
              <button
                type="button"
                onClick={() => removeSlot(index)}
                disabled={slots.length === 1}
                className="absolute top-4 right-4 text-red-500 hover:text-red-600 font-bold text-lg disabled:opacity-40"
                aria-label="Remove slot"
              >
                ×
              </button>

              <div className="grid md:grid-cols-2 gap-4">
                {/* Slot Number */}
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">Slot Number</label>
                  <input
                    name="number"
                    value={slot.number}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="e.g. A01"
                  />
                  {errors[index]?.number && (
                    <p className="text-sm text-red-500 mt-1">{errors[index].number}</p>
                  )}
                </div>

                {/* Vehicle Type */}
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">Vehicle Type</label>
                  <select
                    name="vehicleType"
                    value={slot.vehicleType}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-black"
                  >
                    <option value="">-- Select --</option>
                    {Object.values(VehicleType).map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  {errors[index]?.vehicleType && (
                    <p className="text-sm text-red-500 mt-1">{errors[index].vehicleType}</p>
                  )}
                </div>

                {/* Slot Size */}
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">Slot Size</label>
                  <select
                    name="size"
                    value={slot.size}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-black"
                  >
                    <option value="">-- Select --</option>
                    {Object.values(SlotSize).map((size) => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                  {errors[index]?.size && (
                    <p className="text-sm text-red-500 mt-1">{errors[index].size}</p>
                  )}
                </div>

                {/* Location */}
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">Location</label>
                  <input
                    name="location"
                    value={slot.location}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="e.g. Basement A"
                  />
                  {errors[index]?.location && (
                    <p className="text-sm text-red-500 mt-1">{errors[index].location}</p>
                  )}
                </div>

                {/* Fee Per Hour */}
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">Fee Per Hour (USD)</label>
                  <input
                    type="number"
                    name="feePerHour"
                    value={slot.feePerHour}
                    onChange={(e) => handleChange(index, e)}
                    step="0.01"
                    min="0"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="e.g. 5.00"
                  />
                  {errors[index]?.feePerHour && (
                    <p className="text-sm text-red-500 mt-1">{errors[index].feePerHour}</p>
                  )}
                </div>
              </div>
            </div>
          ))}

          <div className="flex justify-between items-center pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={addSlot}
              className="px-5 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
              disabled={loading}
            >
              + Add Slot
            </button>

            <button
              type="submit"
              disabled={loading}
              className={`flex items-center justify-center px-6 py-2 bg-black text-white rounded-lg transition hover:bg-black ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? (
                <BiLoaderAlt className="animate-spin mr-2" size={20} />
              ) : (
                "Submit Slots"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateMultipleSlotsModal;
