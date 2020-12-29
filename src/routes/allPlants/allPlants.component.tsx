import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FormattedMessage, useIntl } from 'react-intl';

import { PlantsList } from '../../shared/components/plants';
import { H1, StyledLink } from '../../theme/typography';
import { Container } from './allPlants.styles';

export const AllPlants = () => {
  const intl = useIntl();

  return (
    <Container>
      <Helmet
        title={intl.formatMessage({
          defaultMessage: 'All plants',
          description: 'All plants / page title',
        })}
      />
      <H1>
        <FormattedMessage defaultMessage="All plants" description="All plants / title" />
      </H1>
      <StyledLink to="/">Watering calendar</StyledLink>
      <PlantsList />
      <Container>
        Dracena <br /> Monstera <br /> Epipremnum
      </Container>
    </Container>
  );
};
