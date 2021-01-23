import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FormattedMessage, useIntl } from 'react-intl';
import { useSelector } from 'react-redux';

import { Calendar } from '../../shared/components/calendar';
import { H1, StyledLink } from '../../theme/typography';
import { localesSelectors } from '../../modules/locales';
import { Container, Logo, Heading } from './home.styles';

export const Home = () => {
  const intl = useIntl();
  const language = useSelector(localesSelectors.selectLocalesLanguage);

  return (
    <Container>
      <Helmet
        title={intl.formatMessage({
          id: 'homepage',
          defaultMessage: 'Homepage',
          description: 'Home / page title',
        })}
      />
      <Heading>
        <H1>
          <FormattedMessage id="pageTitle" defaultMessage="Water me" description="App / Page title" />
        </H1>
        <Logo />
      </Heading>
      <StyledLink to={`/${language || 'en'}/allPlants`}>
        <FormattedMessage id="allPlantsLink" defaultMessage="List of plants" description="All plants / Link" />
      </StyledLink>
      <Calendar />
    </Container>
  );
};
