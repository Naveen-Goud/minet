import React from 'react';
import { render } from '@testing-library/react';
import TradeCard from '.';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 130 },
];

const rows = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
];

describe('TradeCard Component', () => {
  it('renders the component correctly', () => {
    render(
      <TradeCard columns={columns} rows={rows} tableWidth={500} />
    );

  });
});
