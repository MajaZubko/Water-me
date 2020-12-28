import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Button } from '../button';
import { Container } from './plantsList.styles';
import { usePlants } from './usePlants.hook';

export const PlantsList = () => {
  const [plants, addPlants] = usePlants();

  return (
    <Container>
      <Button onClick={() => console.log('add plants')}>
        <FormattedMessage defaultMessage="Add plants" description="Plants / add button" />
      </Button>

      <ul>
        {plants.map((plant) => (
          <li key={plant.id}>{plant.name}</li>
        ))}
      </ul>
    </Container>
  );
};
