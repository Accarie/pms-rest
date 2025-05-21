/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { Modal } from "@mantine/core";
import { SlotSize, VehicleType } from "@/enums";
import { ISlot } from "@/types";

interface EditSlotModalProps {
  isOpen: boolean;
  onClose: () => void;
  slot: ISlot | null;
  onSave: (updated: ISlot) => void;
}

const EditSlotModal: React.FC<EditSlotModalProps> = ({
  isOpen,
  onClose,
  slot,
  onSave,
}) => {
  const [form, setForm] = useState<Partial<ISlot>>({});

  useEffect(() => {
    if (slot) {
      setForm(slot);
    }
  }, [slot]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "feePerHour" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = () => {
    if (slot) {
      onSave({ ...slot, ...form } as ISlot);
      onClose();
    }
  };

  if (!slot) return null;

  return (
    <Modal
      opened={isOpen}
      onClose={onClose}
      title={<h2 className="text-xl font-semibold text-gray-800">Edit Parking Slot</h2>}
      centered
      size="lg"
      overlayProps={{ opacity: 0.5, blur: 4 }}
    >
      <div className="flex flex-col gap-5 p-1">
        {/* Slot Number */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">Slot Number</label>
          <input
            name="number"
            value={form.number || ""}
            onChange={handleChange}
            placeholder="E.g., A23"
            className="bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Slot Size */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">Slot Size</label>
          <select
            name="size"
            value={form.size || ""}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="" disabled>
              Select size...
            </option>
            {Object.values(SlotSize).map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        {/* Vehicle Type */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">Vehicle Type</label>
          <select
            name="vehicleType"
            value={form.vehicleType || ""}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="" disabled>
              Select type...
            </option>
            {Object.values(VehicleType).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Location */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">Location</label>
          <input
            name="location"
            value={form.location || ""}
            onChange={handleChange}
            placeholder="E.g., Basement A, Row 4"
            className="bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Fee Per Hour */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">Fee Per Hour</label>
          <input
            type="number"
            step="0.01"
            name="feePerHour"
            value={form.feePerHour ?? ""}
            onChange={handleChange}
            placeholder="E.g., 5.00"
            className="bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-lg border border-gray-300 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-5 py-2 text-sm font-semibold rounded-lg bg-black text-white hover:bg-black transition"
          >
            Save Changes
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default EditSlotModal;
