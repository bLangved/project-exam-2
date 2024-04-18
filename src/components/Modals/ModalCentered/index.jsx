import { Modal, Button } from "react-bootstrap";

function ModalCentered(props) {
  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={props.show}
      onHide={props.onHide}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.statusCode ? `StatusCode: ${props.statusCode}` : ""}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{props.statusMessage || ""}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalCentered;
