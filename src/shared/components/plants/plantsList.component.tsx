import React, { useEffect, useState } from 'react';
import { sortBy } from 'lodash';
import { Delete, Edit, Opacity } from '@material-ui/icons';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { FormModal } from '../formModal';
import { Container, IconButton, List, ListHeader, StyledButton } from './plantsList.styles';
import { usePlants } from './usePlants.hook';
import { emptyPlant } from './emptyPlant';

export const PlantsList = () => {
  const [plants, fetchPlants, editPlant, addPlant, deletePlant] = usePlants();

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
        onClose={() => {
          setModalPlant(emptyPlant);
          setIsModalOpen(false);
        }}
        action={modalMode === 'add' ? addPlant : editPlant}
        plant={modalPlant}
        buttonText={modalMode}
        onlyWatering={modalMode === 'water'}
      />
      <StyledButton
        onClick={() => {
          setModalPlant(emptyPlant);
          setModalMode('add');
          setIsModalOpen(true);
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
        {sortBy(plants, 'name').map((plant, i) => (
          <li key={i}>
            <div>{plant.name}</div>
            <div>{plant.location}</div>
            <div>{plant.waterNeeds}</div>
            <div>{plant.lastWatered}</div>
            <IconButton
              onClick={() => {
                setModalPlant(plant);
                setModalMode('water');
                setIsModalOpen(true);
              }}
            >
              <Opacity />
            </IconButton>
            <IconButton
              onClick={() => {
                setModalPlant(plant);
                setModalMode('edit');
                setIsModalOpen(true);
              }}
            >
              <Edit />
            </IconButton>
            <IconButton onClick={() => deletePlant(plant)}>
              <Delete />
            </IconButton>
          </li>
        ))}
      </List>
    </Container>
  );
};
