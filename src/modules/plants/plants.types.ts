export interface Plant {
  id: string;
  name: string;
  location: string;
  waterNeeds: string;
  lastWatered: string;
}

export interface PlantsState {
  plants: Plant[];
}
