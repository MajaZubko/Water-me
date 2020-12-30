import React, { useEffect } from 'react';
import moment from 'moment';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

import { usePlants } from '../plants';
import { Container } from './calendar.styles';

export const Calendar = () => {
  const [plants, fetchPlants] = usePlants();

  useEffect(() => {
    fetchPlants();
  }, []);

  const calendarEvents = plants.map((plant) => {
    return {
      title: `${plant.name} - ${plant.location}`,
      date: moment(plant.lastWatered).clone().add(plant.waterNeeds, 'days').format('YYYY-MM-DD'),
    };
  });

  return (
    <Container>
      <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" firstDay={1} events={calendarEvents} />
    </Container>
  );
};
