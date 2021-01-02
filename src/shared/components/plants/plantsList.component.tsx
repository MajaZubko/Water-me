import React, { useEffect, useState } from 'react';
import { Delete, Edit } from '@material-ui/icons';

import { FormModal } from '../formModal';
import { Container, IconButton, List, ListHeader, StyledButton } from './plantsList.styles';
import { usePlants } from './usePlants.hook';

export const PlantsList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [plants, fetchPlants, addPlant, deletePlant, editPlant] = usePlants();

  useEffect(() => {
    fetchPlants();
  }, []);

  return (
    <Container>
      <FormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} plant={plants[0]} action={addPlant} />
      <StyledButton onClick={() => setIsModalOpen(true)}>Add plants</StyledButton>
      <List>
        <li>
          <ListHeader>Plant name</ListHeader>
          <ListHeader>Location</ListHeader>
          <ListHeader>Water needs</ListHeader>
          <ListHeader>Last watered</ListHeader>
        </li>
        {plants.map((plant, i) => (
          <li key={i}>
            <div>{plant.name}</div>
            <div>{plant.location}</div>
            <div>{plant.waterNeeds}</div>
            <div>{plant.lastWatered}</div>
            <IconButton onClick={() => deletePlant(plant)}>
              <Delete />
            </IconButton>
            <IconButton onClick={() => editPlant(plant)}>
              <Edit />
            </IconButton>
          </li>
        ))}
      </List>
    </Container>
  );
};
