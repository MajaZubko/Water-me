import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { Formik } from 'formik';

import { Container, List, ListHeader, StyledCard, StyledButton, StyledInput } from './plantsList.styles';
import { usePlants } from './usePlants.hook';

export const PlantsList = () => {
  const formValues = { name: '', location: '', waterNeeds: '', lastWatered: '' };
  const [plants, fetchPlants, addPlant] = usePlants();

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
        {plants.map((plant) => (
          <li key={plant.name}>
            <div>{plant.name}</div>
            <div>{plant.location}</div>
            <div>{plant.waterNeeds}</div>
            <div>{plant.lastWatered}</div>
          </li>
        ))}
      </List>

      <StyledCard>
        <Formik
          initialValues={formValues}
          onSubmit={(values, { resetForm }) => {
            addPlant(values);
            resetForm(); //TODO nie działa czyszczenie forma
          }}
        >
          {({ handleSubmit, setFieldValue }) => (
            <>
              <label>Plant name</label>
              <StyledInput type="text" onChange={(e) => setFieldValue('name', e.target.value)} />
              <label>Location</label>
              <StyledInput type="text" onChange={(e) => setFieldValue('location', e.target.value)} />
              <label>Water needs</label>
              <StyledInput type="text" onChange={(e) => setFieldValue('waterNeeds', e.target.value)} />
              <label>Last watered</label>
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
