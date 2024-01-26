import React from 'react';
import {Button, Modal} from "react-bootstrap";

const VerticalCenteredModal = ({text, ...props}) => {
    return (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Примечания
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
              {text}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={props.onHide}>Закрыть</Button>
          </Modal.Footer>
        </Modal>
    );
};

export default VerticalCenteredModal;