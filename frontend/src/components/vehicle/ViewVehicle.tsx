import React from "react";
import { Modal } from "@mantine/core";
import { IVehicle } from "@/types";

interface ViewVehicleModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehicle: IVehicle;
}

const ViewVehicleModal: React.FC<ViewVehicleModalProps> = ({
  isOpen,
  onClose,
  vehicle,
}) => {
  if (!vehicle) return null;

  return (
    <Modal
      opened={isOpen}
      onClose={onClose}
      title={
        <h2 className="text-xl font-semibold text-primary-blue">
          Vehicle Details
        </h2>
      }
      centered
      size="lg"
      radius="md"
      overlayProps={{
        blur: 3,
        backgroundOpacity: 0.5,
      }}
    >
      <div className="mt-4 space-y-4">
        {[
          {
            label: "Plate Number",
            value: vehicle.plateNumber,
          },
          {
            label: "Vehicle Type",
            value: vehicle.vehicleType,
          },
          {
            label: "Model",
            value: vehicle.model,
          },
          {
            label: "Color",
            value: vehicle.color,
          },
          {
            label: "Manufacturer",
            value: vehicle.maker,
          },
        ].map(({ label, value }) => (
          <div key={label} className="flex items-center gap-3">
            <p>
              <strong className="text-gray-600">{label}:</strong>{" "}
              <span className="text-gray-900">{value}</span>
            </p>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default ViewVehicleModal;
