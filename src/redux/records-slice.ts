import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface IRecordState {
  id: string;
  name: string;
  status: string;
}

interface IEditRecordAction {
  id: string;
  updatedRecord: IRecordState;
}

const initialState: IRecordState[] = [
  {
    id: '1',
    name: 'Create basic template',
    status: 'Completed',
  },
  {
    id: '2',
    name: 'Add components',
    status: 'Not completed',
  },
  {
    id: '3',
    name: 'Check status',
    status: 'Completed',
  },
  {
    id: '4',
    name: 'fix components',
    status: 'Not completed',
  },
];

export const recordsSlice = createSlice({
  name: 'records',
  initialState,
  reducers: {
    addRecord: (state, action: PayloadAction<IRecordState>) => {
      state.unshift(action.payload);
    },

    editRecord: (state, action: PayloadAction<IEditRecordAction>) => {
      const recordIndex = state.findIndex(record => record.id === action.payload.id);
      if (recordIndex !== -1) {
        state[recordIndex] = action.payload.updatedRecord;
      }
    },

    deleteRecord: (state, action: PayloadAction<IRecordState['id']>) => {
      state = state.filter(record => record.id !== action.payload);
      return state;
    },

    changeRecordStatus: (state, action: PayloadAction<IRecordState['id']>) => {
      const recordIndex = state.findIndex(record => record.id === action.payload);
      if (recordIndex !== -1) {
        const newStatus = state[recordIndex].status === 'Completed' ? 'Not completed' : 'Completed';
        state[recordIndex].status = newStatus;
      }
    },
  },
});

export const { addRecord, editRecord, deleteRecord, changeRecordStatus } = recordsSlice.actions;

export default recordsSlice.reducer;
