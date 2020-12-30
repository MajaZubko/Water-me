import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FormattedMessage, useIntl } from 'react-intl';

import { Calendar } from '../../shared/components/calendar';
import { H1, StyledLink } from '../../theme/typography';
import { Container, Logo, Heading } from './home.styles';

export const Home = () => {
  const intl = useIntl();

  return (
    <Container>
      <Helmet
        title={intl.formatMessage({
          defaultMessage: 'Homepage',
          description: 'Home / page title',
        })}
      />
      <Heading>
        <H1>
          <FormattedMessage defaultMessage="Water me" description="Home / title" />
        </H1>
        <Logo />
      </Heading>
      <StyledLink to="/en/allPlants">See all plants</StyledLink>
      <Calendar />
    </Container>
  );
};
