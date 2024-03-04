import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FormComponent from './form';
import { IRecordState } from '../redux/records-slice';

interface IModalProps {
  show: boolean;
  handleClose: () => void;
  onSubmitRecord: (newRecord: IRecordState, reset: () => void) => void;
  type: string;
  editingRecord?: IRecordState;
}

const ModalComponent = ({
  show,
  handleClose,
  onSubmitRecord,
  type,
  editingRecord,
}: IModalProps) => {
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{type}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormComponent onSubmitRecord={onSubmitRecord} editingRecord={editingRecord} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalComponent;
