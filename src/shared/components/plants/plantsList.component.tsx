import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Formik } from 'formik';

import { Container, Button } from './plantsList.styles';
import { usePlants } from './usePlants.hook';

export const PlantsList = () => {
  const formValues = { name: '', location: '', waterNeeds: '', lastWatered: '' };
  const [plants, addPlant] = usePlants();
  console.log(plants);
  return (
    <Container>
      <Formik initialValues={formValues} onSubmit={(values) => addPlant(values)}>
        {({ handleSubmit, setFieldValue }) => (
          <Container>
            <label>Plant name</label>
            <input type="text" onChange={(e) => setFieldValue('name', e.target.value)} />
            <label>Location</label>
            <input type="text" onChange={(e) => setFieldValue('location', e.target.value)} />
            <label>Water needs</label>
            <input type="text" onChange={(e) => setFieldValue('waterNeeds', e.target.value)} />
            <label>Last watered</label>
            <input type="text" onChange={(e) => setFieldValue('lastWatered', e.target.value)} />
            <Button type="submit" onClick={() => handleSubmit()}>
              <FormattedMessage defaultMessage="Add plant" description="Plants / add button" />
            </Button>
          </Container>
        )}
      </Formik>
      <ul>
        {plants.map((plant) => (
          <li key={plant.name}>{plant.name}</li>
        ))}
      </ul>
    </Container>
  );
};
