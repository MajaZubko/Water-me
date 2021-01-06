import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import Modal from 'react-modal';

import { Plant } from '../../../modules/plants/plants.types';
import { Container, StyledButton, StyledInput, StyledLabel, ModalBody, ModalFooter } from './formModal.styles';

Modal.setAppElement('#app');

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  plant: Plant;
  action: (plant: Plant) => void;
  buttonText?: string;
  onlyWatering?: boolean;
}

const DATE_FORMAT = 'YYYY-MM-DD';

export const FormModal = ({ isOpen, onClose, plant, action, onlyWatering, buttonText }: ModalProps) => {
  const [formValues, setFormValues] = useState(plant);

  useEffect(() => {
    setFormValues(plant);
  }, [plant]);

  return (
    <Container>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
          },
        }}
      >
        <ModalBody>
          <StyledLabel>Plant name</StyledLabel>
          <StyledInput
            disabled={onlyWatering}
            type="text"
            value={formValues.name}
            onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
          />
          <StyledLabel>Location</StyledLabel>
          <StyledInput
            disabled={onlyWatering}
            type="text"
            value={formValues.location}
            onChange={(e) => setFormValues({ ...formValues, location: e.target.value })}
          />
          <StyledLabel>Water needs (number of days)</StyledLabel>
          <StyledInput
            disabled={onlyWatering}
            type="text"
            value={formValues.waterNeeds}
            onChange={(e) => setFormValues({ ...formValues, waterNeeds: e.target.value })}
          />
          {onlyWatering && (
            <StyledButton
              onClick={() =>
                setFormValues({
                  ...formValues,
                  lastWatered: moment().format(DATE_FORMAT),
                })
              }
            >
              Confirm watering
            </StyledButton>
          )}

          <StyledLabel>Last watered</StyledLabel>
          <StyledInput
            type="date"
            value={formValues.lastWatered}
            onChange={(e) => setFormValues({ ...formValues, lastWatered: e.target.value })}
          />
        </ModalBody>
        <ModalFooter>
          <StyledButton
            type="submit"
            onClick={() => {
              if (!plant.id) {
                formValues.id = uuidv4();
              }
              action(formValues);
              onClose();
            }}
          >
            {buttonText}
          </StyledButton>
        </ModalFooter>
      </Modal>
    </Container>
  );
};
