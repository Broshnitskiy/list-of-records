import toast from 'react-hot-toast';
import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../redux/store';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Filter from './filter';
import RecordList from './record-list';
import ModalComponent from './modal';
import { getRecords } from '../redux/selectors';
import { addRecord } from '../redux/records-slice';
import { IRecordState } from '../redux/records-slice';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState('All records');
  const dispatch = useAppDispatch();
  const allRecords = useAppSelector(getRecords);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const onSubmitAddRecord = (newRecord: IRecordState, reset: () => void) => {
    const isExistRecord = allRecords.find(
      rec => rec.name.toLocaleLowerCase() === newRecord.name.toLocaleLowerCase()
    );

    if (isExistRecord) {
      toast.error(`Record ${newRecord.name} is already exist`);
    } else {
      dispatch(addRecord(newRecord));
      reset();
      handleCloseModal();
      toast.success(`New record added to list`);
    }
  };

  return (
    <section>
      <Container>
        <div className="text-center mb-4">
          <h1 className="text-center mb-4 pt-4">Record List</h1>

          <Button variant="primary" onClick={handleShowModal}>
            + ADD NEW RECORD +
          </Button>
        </div>

        <Filter filter={filter} setFilter={setFilter} />

        <RecordList filter={filter} />

        {showModal && (
          <ModalComponent
            show={showModal}
            handleClose={handleCloseModal}
            onSubmitRecord={onSubmitAddRecord}
            type="Modal for adding record"
          />
        )}
      </Container>
    </section>
  );
}

export default App;
