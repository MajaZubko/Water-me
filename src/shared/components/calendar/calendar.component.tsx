import React, { useEffect, useState } from 'react';
import moment from 'moment';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

import { FormModal } from '../formModal';
import { emptyPlant, usePlants } from '../plants';
import { Container } from './calendar.styles';

export const Calendar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPlant, setModalPlant] = useState(emptyPlant);

  const [plants, fetchPlants, editPlant] = usePlants();

  useEffect(() => {
    fetchPlants();
  }, []);

  const calendarEvents = plants.map((plant) => {
    return {
      title: `${plant.name} - ${plant.location}`,
      date: moment(plant.lastWatered).clone().add(plant.waterNeeds, 'days').format('YYYY-MM-DD'),
      plant,
    };
  });

  return (
    <Container>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        firstDay={1}
        events={calendarEvents}
        eventClick={(event) => {
          setModalPlant(event.event._def.extendedProps.plant);
          setIsModalOpen(true);
        }}
      />
      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        action={editPlant}
        plant={modalPlant}
        onlyWatering
        buttonText={'Add watering'}
      />
    </Container>
  );
};
