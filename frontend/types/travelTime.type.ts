export type TravelTimeType = {
  id: number;
  location1: string;
  location2: string;
  durationMinutes: number;
  createdAt: Date;
  updatedAt: Date;
};

export type TravelTimeRequestData = {
  location1: string;
  location2: string;
  durationMinutes: number;
};
