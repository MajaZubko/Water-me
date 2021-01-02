import React, { useEffect, useState } from 'react';
import { Delete, Edit } from '@material-ui/icons';
import { isEmpty } from 'lodash';

import { FormModal } from '../formModal';
import { Container, IconButton, List, ListHeader, StyledButton } from './plantsList.styles';
import { usePlants } from './usePlants.hook';
import { emptyPlant } from './emptyPlant';

export const PlantsList = () => {
  const [plants, fetchPlants, addPlant, deletePlant, editPlant] = usePlants();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [modalPlant, setModalPlant] = useState(emptyPlant);

  useEffect(() => {
    fetchPlants();
  }, []);

  return (
    <Container>
      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        action={modalMode === 'add' ? addPlant : editPlant}
        plant={modalPlant}
      />
      <StyledButton
        onClick={() => {
          setIsModalOpen(true);
          setModalMode('add');
        }}
      >
        Add plants
      </StyledButton>
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
            <IconButton
              onClick={() => {
                setModalMode('edit');
                setModalPlant(plant);
                setIsModalOpen(true);
              }}
            >
              <Edit />
            </IconButton>
          </li>
        ))}
      </List>
    </Container>
  );
};
