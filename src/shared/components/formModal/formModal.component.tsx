import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import Modal from 'react-modal';

import { Plant } from '../../../modules/plants/plants.types';
import {
  ButtonsContainer,
  Container,
  DelayForm,
  StyledButton,
  StyledInput,
  StyledLabel,
  ModalBody,
  ModalFooter,
} from './formModal.styles';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  plant: Plant;
  action: (plant: Plant) => void;
  buttonText?: string;
  onlyWatering?: boolean;
  setAppElement?: unknown;
}

const DATE_FORMAT = 'YYYY-MM-DD';

export const FormModal = ({ isOpen, onClose, plant, action, onlyWatering, buttonText }: ModalProps) => {
  const [formValues, setFormValues] = useState(plant);
  const [isDelayFormShown, setIsDelayFormShown] = useState(false);

  useEffect(() => {
    setFormValues(plant);
  }, [plant]);

  return (
    <Container>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => {
          setIsDelayFormShown(false);
          onClose();
        }}
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
          <StyledLabel>Last watered</StyledLabel>
          <StyledInput
            disabled={onlyWatering}
            type="date"
            value={formValues.lastWatered}
            onChange={(e) => setFormValues({ ...formValues, lastWatered: e.target.value })}
          />
          {onlyWatering && (
            <>
              <ButtonsContainer>
                <StyledButton
                  type="submit"
                  onClick={() => {
                    action({
                      ...formValues,
                      lastWatered: moment().format(DATE_FORMAT),
                      nextWatering: moment().clone().add(formValues.waterNeeds, 'days').format('YYYY-MM-DD'),
                    });
                    onClose();
                  }}
                >
                  Confirm watering
                </StyledButton>
                <StyledButton onClick={() => setIsDelayFormShown(true)}>Delay watering</StyledButton>
              </ButtonsContainer>
              <DelayForm hidden={!isDelayFormShown}>
                <StyledLabel>Enter next watering date</StyledLabel>
                <StyledInput
                  type="date"
                  value={formValues.nextWatering}
                  onChange={(e) => setFormValues({ ...formValues, nextWatering: e.target.value })}
                />
                <StyledButton
                  type="submit"
                  onClick={() => {
                    action(formValues);
                    onClose();
                  }}
                >
                  Confirm new watering date
                </StyledButton>
              </DelayForm>
            </>
          )}
        </ModalBody>
        <ModalFooter>
          {!onlyWatering && (
            <StyledButton
              type="submit"
              onClick={() => {
                if (!plant.id) {
                  setFormValues({ ...formValues, id: uuidv4() });
                }
                setFormValues({
                  ...formValues,
                  nextWatering: moment(formValues.lastWatered)
                    .clone()
                    .add(formValues.waterNeeds, 'days')
                    .format('YYYY-MM-DD'),
                });
                action(formValues);
                onClose();
              }}
            >
              {buttonText} plant
            </StyledButton>
          )}
        </ModalFooter>
      </Modal>
    </Container>
  );
};

FormModal.setAppElement = Modal.setAppElement;
