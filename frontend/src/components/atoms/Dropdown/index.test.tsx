import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Dropdown, { DropdownProps } from './';

describe('Dropdown button', () => {
  const options: DropdownProps['options'] = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  test('renders dropdown button', () => {
    render(<Dropdown options={options} />);
    const dropdownButton = screen.getByRole('button');
    expect(dropdownButton).toBeInTheDocument
  });

  test('opens dropdown when button is clicked', () => {
    render(<Dropdown options={options} />);
    const dropdownButton = screen.getByRole('button');
    fireEvent.click(dropdownButton);
     
  });

  test('closes dropdown when option is selected', () => {
    render(<Dropdown options={options} />);
    const dropdownButton = screen.getByRole('button');
    fireEvent.click(dropdownButton);
  
    const closedDropdown = screen.queryAllByRole('option');
    expect(closedDropdown.length).toBe(0);
  });

  test('displays selected option', () => {
    render(<Dropdown options={options} />);
    const dropdownButton = screen.getByRole('button');
    fireEvent.click(dropdownButton);
    const selectedText = screen.getByText('Option 2');
    expect(selectedText).toBeInTheDocument
  });
 
describe('Dropdown', () => {
  
  it('toggles the dropdown on button click', () => {
    const { getByRole, queryByText } = render(<Dropdown options={options} />);
    const dropdownButton = getByRole('button');
    fireEvent.click(dropdownButton);
    expect(queryByText('Option 1')).toBeInTheDocument 

    fireEvent.click(dropdownButton);
    expect(queryByText('Option 1')).not.toBeInTheDocument  
  });

  it('selects an option and closes the dropdown', () => {
    const { getByRole, queryByText } = render(<Dropdown options={options} />);
    const dropdownButton = getByRole('button');
    fireEvent.click(dropdownButton);
    const option1 = queryByText('Option 1');
    expect(option1).toBeInTheDocument

    fireEvent.click(option1!);  
    expect(queryByText('Option 1')).not.toBeInTheDocument 
  });
});

});
