import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/store';
import RecordItem from './record-item';
import ModalComponent from './modal';
import { getRecords } from '../redux/selectors';
import { editRecord } from '../redux/records-slice';
import { IRecordState } from '../redux/records-slice';

import toast from 'react-hot-toast';

interface IRecordListProps {
  filter: string;
}

const RecordList: React.FC<IRecordListProps> = ({ filter }) => {
  const dispatch = useAppDispatch();
  const records = useAppSelector(getRecords);

  const normalizedFilter = filter.toLowerCase();
  const findRecords = records.filter(
    (rec: IRecordState) => rec.status.toLowerCase() === normalizedFilter
  );
  const renderRecords = filter === 'All records' ? records : findRecords;
  const completedRecords = renderRecords.filter(
    el => el.status.toLowerCase() === 'completed'
  ).length;
  const unCompletedRecords = renderRecords.filter(
    el => el.status.toLowerCase() !== 'completed'
  ).length;

  const [show, setShow] = useState(false);
  const [editingRecord, setEditingRecord] = useState<IRecordState>();

  const handleClose = () => setShow(false);
  const handleShow = (record: IRecordState) => {
    setShow(true);
    setEditingRecord(record);
  };

  const onSubmitEditModal = (updatedRecord: IRecordState, resetInput: () => void) => {
    if (!editingRecord) {
      return;
    }
    const noChanges =
      updatedRecord.name === editingRecord.name && updatedRecord?.status === editingRecord.status;

    if (noChanges) {
      toast.error(`You didn't change anything! Edit current fields and press submit button.`);
      return;
    }

    dispatch(editRecord({ id: editingRecord.id, updatedRecord }));
    resetInput();
    handleClose();
    toast.success(`Record updated`);
  };

  return renderRecords?.length === 0 ? (
    <p style={{ textAlign: 'center' }}>No saved records</p>
  ) : (
    <>
      <h2 style={{ textAlign: 'center', fontSize: '26px' }}>
        Total records: {renderRecords.length}{' '}
      </h2>
      <h3 style={{ textAlign: 'center', fontSize: '18px' }}>
        Completed Records: {completedRecords}
      </h3>
      <h3 style={{ textAlign: 'center', fontSize: '18px' }}>
        Current Records: {unCompletedRecords}
      </h3>
      <ul>
        {renderRecords.map(record => (
          <RecordItem key={record.id} record={record} handleShow={handleShow} />
        ))}
      </ul>
      <ModalComponent
        show={show}
        handleClose={handleClose}
        onSubmitRecord={onSubmitEditModal}
        type="Modal for editing record"
        editingRecord={editingRecord}
      />
    </>
  );
};

export default RecordList;
