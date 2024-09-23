import { FC } from 'react';
import { nanoid } from 'nanoid';
import { SubmitHandler, useForm } from 'react-hook-form';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { IRecordState } from '../redux/records-slice';
import toast from 'react-hot-toast';

interface IFormProps {
  onSubmitRecord: (newRecord: IRecordState, reset: () => void) => void;
  editingRecord?: IRecordState;
}

interface IFormData {
  name: string;
  status: string;
}

const MAX_NAME_LENGTH = 15;

const FormComponent: FC<IFormProps> = ({ onSubmitRecord, editingRecord }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormData>({
    defaultValues: {
      name: editingRecord ? editingRecord.name : '',
      status: editingRecord ? editingRecord.status : 'Not completed',
    },
  });

  const onSubmit: SubmitHandler<IFormData> = data => {
    if (data.name.length > MAX_NAME_LENGTH) {
      toast.error(`Name should be less than or equal to ${MAX_NAME_LENGTH} characters!`);
      return;
    }
    const newRecord = {
      id: nanoid(),
      ...data,
    };
    onSubmitRecord(newRecord, reset);
  };

  return (
    <Form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3" controlId="name">
        <Form.Label>Record name</Form.Label>
        <Form.Control
          type="text"
          placeholder={`Record name (less than or equal to ${MAX_NAME_LENGTH} characters)`}
          title="Name may contain only letters, apostrophe"
          {...register('name', {
            required: true,
          })}
        />
        {errors.name && <span style={{ color: 'red' }}>This field is required</span>}
      </Form.Group>

      <Form.Group className="mb-3" controlId="status">
        <Form.Label>Status</Form.Label>
        <Form.Select {...register('status', { required: true })}>
          <option value="Completed">Completed</option>
          <option value="Not completed">Not completed</option>
        </Form.Select>
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default FormComponent;
