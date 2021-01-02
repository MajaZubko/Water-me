import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FormattedMessage } from 'react-intl';
import { Formik } from 'formik';
import Modal from 'react-modal';
import { isEqual } from 'lodash';

import { Plant } from '../../../modules/plants/plants.types';
import { emptyPlant } from '../plants';
import { Container, StyledButton, StyledInput, StyledLabel, ModalBody, ModalFooter } from './formModal.styles';

Modal.setAppElement('#app');

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  plant?: Plant;
  action: (plant: Plant) => void;
}

//props: isOpen, plant, mode(edit, add, water, delayWater)

export const FormModal = ({ isOpen, onClose, plant, action }: ModalProps) => {
  console.log(plant);
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
        <Formik
          enableReinitialize
          initialValues={plant || emptyPlant}
          onSubmit={(values, { resetForm }) => {
            values.id = uuidv4();
            action(values);
            resetForm();
            onClose();
          }}
        >
          {({ handleSubmit, setFieldValue }) => (
            <>
              <ModalBody>
                <StyledLabel>Plant name</StyledLabel>
                <StyledInput type="text" onChange={(e) => setFieldValue('name', e.target.value)} />
                <StyledLabel>Location</StyledLabel>
                <StyledInput type="text" onChange={(e) => setFieldValue('location', e.target.value)} />
                <StyledLabel>Water needs (number of days)</StyledLabel>
                <StyledInput type="text" onChange={(e) => setFieldValue('waterNeeds', e.target.value)} />
                <StyledLabel>Last watered (YYYY-MM-DD)</StyledLabel>
                <StyledInput type="text" onChange={(e) => setFieldValue('lastWatered', e.target.value)} />
              </ModalBody>
              <ModalFooter>
                <StyledButton type="submit" onClick={() => handleSubmit()}>
                  <FormattedMessage defaultMessage="Add plant" description="Plants / add button" />
                </StyledButton>
              </ModalFooter>
            </>
          )}
        </Formik>
      </Modal>
    </Container>
  );
};
