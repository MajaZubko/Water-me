import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FormattedMessage, useIntl } from 'react-intl';
import { useSelector } from 'react-redux';

import { PlantsList } from '../../shared/components/plants';
import { localesSelectors } from '../../modules/locales';
import { H1, StyledLink } from '../../theme/typography';
import { Container } from './allPlants.styles';

export const AllPlants = () => {
  const intl = useIntl();

  const language = useSelector(localesSelectors.selectLocalesLanguage);

  return (
    <Container>
      <Helmet
        title={intl.formatMessage({
          id: 'allPlants',
          defaultMessage: 'All plants',
          description: 'All plants / page title',
        })}
      />
      <H1>
        <FormattedMessage id="allPlants" defaultMessage="All plants" description="All plants / page title" />
      </H1>
      <StyledLink to={`/${language || 'en'}`}>
        <FormattedMessage
          id="wateringCalendarLink"
          defaultMessage="Watering calendar"
          description="Watering calendar / Link"
        />
      </StyledLink>
      <PlantsList />
    </Container>
  );
};
