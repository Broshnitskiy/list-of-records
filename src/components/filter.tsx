import React from 'react';
import Form from 'react-bootstrap/Form';

interface IFilterProps {
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
}

const Filter: React.FC<IFilterProps> = ({ filter, setFilter }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
  };

  return (
    <div className="mx-auto" style={{ maxWidth: '500px' }}>
      <Form.Group className="mb-3" controlId="status">
        <Form.Select value={filter} onChange={handleChange}>
          <option value="All records">All records</option>
          <option value="Completed">Completed</option>
          <option value="Not completed">Not completed</option>
        </Form.Select>
      </Form.Group>
    </div>
  );
};

export default Filter;
