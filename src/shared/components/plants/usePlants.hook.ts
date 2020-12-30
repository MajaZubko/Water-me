import { useDispatch, useSelector } from 'react-redux';

import { plantsActions, plantsSelectors } from '../../../modules/plants';
import { Plant } from '../../../modules/plants/plants.types';

export const usePlants = (): [Plant[], () => void, (plant: Plant) => void] => {
  const dispatch = useDispatch();

  const plants = useSelector(plantsSelectors.selectPlants);
  const fetchPlants = () => dispatch(plantsActions.fetchPlants());
  const addPlant = (plant: Plant) => dispatch(plantsActions.addPlant(plant));

  return [plants, fetchPlants, addPlant];
};
