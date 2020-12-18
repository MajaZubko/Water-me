import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FormattedMessage, useIntl } from 'react-intl';
import { H1, StyledLink } from '../../theme/typography';
import { Container, Logo } from './home.styles';

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
      <H1>
        <FormattedMessage defaultMessage="Water me - the app" description="Home / title" />
      </H1>
      <StyledLink to='/en/allPlants'>See all plants</StyledLink>
      <Logo />
    </Container>
  );
};
