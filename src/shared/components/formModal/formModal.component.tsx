import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
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
}

export const FormModal = ({ isOpen, onClose, plant, action, buttonText }: ModalProps) => {
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
            type="text"
            value={formValues.name}
            onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
          />
          <StyledLabel>Location</StyledLabel>
          <StyledInput
            type="text"
            value={formValues.location}
            onChange={(e) => setFormValues({ ...formValues, location: e.target.value })}
          />
          <StyledLabel>Water needs (number of days)</StyledLabel>
          <StyledInput
            type="text"
            value={formValues.waterNeeds}
            onChange={(e) => setFormValues({ ...formValues, waterNeeds: e.target.value })}
          />
          <StyledLabel>Last watered (YYYY-MM-DD)</StyledLabel>
          <StyledInput
            type="text"
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
