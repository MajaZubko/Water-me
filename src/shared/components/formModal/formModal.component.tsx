import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import Modal from 'react-modal';
import { FormattedMessage } from 'react-intl';

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
          <StyledLabel>
            <FormattedMessage id="plantName" defaultMessage="Plant name" description="Plant name / Header" />
          </StyledLabel>
          <StyledInput
            disabled={onlyWatering}
            type="text"
            value={formValues.name}
            onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
          />
          <StyledLabel>
            <FormattedMessage id="location" defaultMessage="Location" description="Location / Header" />
          </StyledLabel>
          <StyledInput
            disabled={onlyWatering}
            type="text"
            value={formValues.location}
            onChange={(e) => setFormValues({ ...formValues, location: e.target.value })}
          />
          <StyledLabel>
            <FormattedMessage
              id="waterNeedsLabel"
              defaultMessage="Water needs (number of days)"
              description="Water needs / Label"
            />
          </StyledLabel>
          <StyledInput
            disabled={onlyWatering}
            type="text"
            value={formValues.waterNeeds}
            onChange={(e) => setFormValues({ ...formValues, waterNeeds: e.target.value })}
          />
          <StyledLabel>
            <FormattedMessage id="lastWatered" defaultMessage="Last watered" description="Last watered / Header" />
          </StyledLabel>
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
                  <FormattedMessage
                    id="confirmWatering"
                    defaultMessage="Confirm watering"
                    description="Confirm watering / Button"
                  />
                </StyledButton>
                <StyledButton onClick={() => setIsDelayFormShown(true)}>
                  <FormattedMessage
                    id="delayWatering"
                    defaultMessage="Delay watering"
                    description="Delay watering / Button"
                  />
                </StyledButton>
              </ButtonsContainer>
              <DelayForm hidden={!isDelayFormShown}>
                <StyledLabel>
                  <FormattedMessage
                    id="enterNextWatering"
                    defaultMessage="Enter next watering date"
                    description="Enter next watering / Label"
                  />
                </StyledLabel>
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
                  <FormattedMessage
                    id="confirmNewWatering"
                    defaultMessage="Confirm new watering date"
                    description="Confirm new watering / Button"
                  />
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
              {buttonText === 'add' && (
                <FormattedMessage id="addPlantButton" defaultMessage="Add plant" description="Add plant / Button" />
              )}
              {buttonText === 'edit' && (
                <FormattedMessage id="editPlantButton" defaultMessage="Edit plant" description="Edit plant / Button" />
              )}
            </StyledButton>
          )}
        </ModalFooter>
      </Modal>
    </Container>
  );
};

FormModal.setAppElement = Modal.setAppElement;
