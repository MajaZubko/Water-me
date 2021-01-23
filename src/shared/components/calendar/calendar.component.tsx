import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { useSelector } from 'react-redux';

import { FormModal } from '../formModal';
import { emptyPlant, usePlants } from '../plants';
import { Container } from './calendar.styles';
import { localesSelectors } from '../../../modules/locales';

export const Calendar = () => {
  const language = useSelector(localesSelectors.selectLocalesLanguage);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPlant, setModalPlant] = useState(emptyPlant);

  const [plants, fetchPlants, editPlant] = usePlants();

  useEffect(() => {
    fetchPlants();
  }, []);

  const calendarEvents = plants.map((plant) => {
    return {
      title: `${plant.name} - ${plant.location}`,
      date: plant.nextWatering,
      plant,
    };
  });

  return (
    <Container>
      <FullCalendar
        locale={language || 'en'}
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
