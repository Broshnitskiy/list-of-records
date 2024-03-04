import React from 'react';
import { useAppDispatch } from '../redux/store';
import { deleteRecord, changeRecordStatus } from '../redux/records-slice';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import toast from 'react-hot-toast';
import { IRecordState } from '../redux/records-slice';

interface IRecordItemProps {
  record: IRecordState;
  handleShow: (record: IRecordState) => void;
}

const RecordItem: React.FC<IRecordItemProps> = ({ record, handleShow }) => {
  const { id, name, status } = record;
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    dispatch(deleteRecord(id));
    toast.success(`Record was deleted successfully`);
  };

  const onNameClick = () => {
    dispatch(changeRecordStatus(id));
  };

  return (
    <li className="mb-4">
      <ListGroup horizontal as="ul" className="justify-content-center">
        <ListGroup.Item
          variant="info"
          as="li"
          style={{ width: '250px', cursor: 'pointer' }}
          onClick={onNameClick}
        >
          <strong>Name:</strong>
          <p className="mb-0">{name}</p>
        </ListGroup.Item>

        <ListGroup.Item variant="info" as="li" style={{ width: '250px' }}>
          <strong>Status:</strong>
          <p className="mb-0">{status}</p>
        </ListGroup.Item>

        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>

        <Button
          variant="primary"
          onClick={() => {
            handleShow(record);
          }}
        >
          Edit record
        </Button>
      </ListGroup>
    </li>
  );
};

export default RecordItem;
