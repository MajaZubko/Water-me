import React, { useEffect, useState } from 'react';
import { sortBy } from 'lodash';
import { FormattedMessage } from 'react-intl';
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
        <FormattedMessage id="addPlantsButton" defaultMessage="Add plants" description="Add plants / Button" />
      </StyledButton>
      <List>
        <li>
          <ListHeader>
            <FormattedMessage id="plantName" defaultMessage="Plant name" description="Plant name / Header" />
          </ListHeader>
          <ListHeader>
            <FormattedMessage id="location" defaultMessage="Location" description="Location / Header" />
          </ListHeader>
          <ListHeader>
            <FormattedMessage id="waterNeeds" defaultMessage="Water needs" description="Water needs / Header" />
          </ListHeader>
          <ListHeader>
            <FormattedMessage id="lastWatered" defaultMessage="Last watered" description="Last watered / Header" />
          </ListHeader>
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
