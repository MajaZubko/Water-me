export interface Plant {
  name: string;
  location: string;
  waterNeeds: string;
  lastWatered: string;
}

export interface PlantsState {
  plants: Plant[];
}
