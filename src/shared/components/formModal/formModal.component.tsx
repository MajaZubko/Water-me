import React from 'react';
import Modal from 'react-modal';
import { v4 as uuidv4 } from 'uuid';
import { FormattedMessage } from 'react-intl';
import { Formik } from 'formik';

import { Plant } from '../../../modules/plants/plants.types';
import { StyledButton, StyledInput } from './formModal.styles';

Modal.setAppElement('#app');

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  plant: Plant;
  action: (plant: Plant) => void;
}

//props: isOpen, plant, mode(edit, add, water, delayWater)

export const FormModal = ({ isOpen, onClose, plant, action }: ModalProps) => {
  const formValues = { id: '', name: '', location: '', waterNeeds: '', lastWatered: '' };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <Formik
        initialValues={formValues}
        onSubmit={(values, { resetForm }) => {
          values.id = uuidv4();
          action(values);
          resetForm();
          onClose();
        }}
      >
        {({ handleSubmit, setFieldValue }) => (
          <>
            <label>Plant name</label>
            <StyledInput type="text" onChange={(e) => setFieldValue('name', e.target.value)} />
            <label>Location</label>
            <StyledInput type="text" onChange={(e) => setFieldValue('location', e.target.value)} />
            <label>Water needs (number of days)</label>
            <StyledInput type="text" onChange={(e) => setFieldValue('waterNeeds', e.target.value)} />
            <label>Last watered (YYYY-MM-DD)</label>
            <StyledInput type="text" onChange={(e) => setFieldValue('lastWatered', e.target.value)} />
            <StyledButton type="submit" onClick={() => handleSubmit()}>
              <FormattedMessage defaultMessage="Add plant" description="Plants / add button" />
            </StyledButton>
          </>
        )}
      </Formik>
    </Modal>
  );
};
