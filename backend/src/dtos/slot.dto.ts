import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsString,
  ValidateNested,
  IsNumber,
  Min,
} from "class-validator";
import { Type } from "class-transformer";
import { SlotSize, VehicleType } from "../enum"; // Ensure these enums are defined correctly

export class CreateParkingSlotDTO {
  @IsString()
  @IsNotEmpty()
  number: string;

  @IsEnum(SlotSize)
  @IsNotEmpty()
  size: SlotSize;

  @IsEnum(VehicleType)
  @IsNotEmpty()
  vehicleType: VehicleType;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  feePerHour: number;
}

export class CreateMultipleParkingSlotsDTO {
  @IsArray()
  @ValidateNested({ each: true }) // Validate each slot object
  @Type(() => CreateParkingSlotDTO)
  slots: CreateParkingSlotDTO[];
}
