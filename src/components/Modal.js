import React from 'react'
import { Modal as BtModal, Button, Form } from 'react-bootstrap';

export default function Modal({show, handleClose, title, onSubmit, values}) {
  return (
    <BtModal show={show} onHide={handleClose}>
        <BtModal.Header closeButton>
          <BtModal.Title>{title}</BtModal.Title>
        </BtModal.Header>
          <BtModal.Body>
            FORM
          </BtModal.Body>
    </BtModal>
  )
}
