import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { Formik } from 'formik';
import { Delete, Edit } from '@material-ui/icons';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { v4 as uuidv4 } from 'uuid';

import { Container, IconButton, List, ListHeader, StyledCard, StyledButton, StyledInput } from './plantsList.styles';
import { usePlants } from './usePlants.hook';

export const PlantsList = () => {
  const formValues = { id: '', name: '', location: '', waterNeeds: '', lastWatered: '' };
  const [plants, fetchPlants, addPlant, deletePlant, editPlant] = usePlants();

  useEffect(() => {
    fetchPlants();
  }, []);

  return (
    <Container>
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

      <StyledCard>
        <Formik
          initialValues={formValues}
          onSubmit={(values, { resetForm }) => {
            values.id = uuidv4();
            addPlant(values);
            resetForm();
          }}
        >
          {({ handleSubmit, setFieldValue }) => (
            <>
              <label>Plant name</label>
              <StyledInput type="text" onChange={(e) => setFieldValue('name', e.target.value)} />
              <label>Location</label>
              <StyledInput type="text" onChange={(e) => setFieldValue('location', e.target.value)} />
              <label>Water needs (number of days)</label>
              <StyledInput type="text" onChange={(e) => setFieldValue('waterNeeds', e.target.value)} />
              <label>Last watered (YYYY-MM-DD)</label>
              <StyledInput type="text" onChange={(e) => setFieldValue('lastWatered', e.target.value)} />
              <StyledButton type="submit" onClick={() => handleSubmit()}>
                <FormattedMessage defaultMessage="Add plant" description="Plants / add button" />
              </StyledButton>
            </>
          )}
        </Formik>
      </StyledCard>
    </Container>
  );
};
