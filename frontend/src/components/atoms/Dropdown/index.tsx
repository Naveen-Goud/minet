import React, { useState } from 'react';
import Image from '../Image';
import theme from '../../../theme';
import { Box, Stack } from '@mui/material';

interface Option {
  value: string;
  label: string;
}

export interface DropdownProps {
  options: Option[];
}

export const Dropdown: React.FC<DropdownProps> = ( props:DropdownProps ) => {

    const {options}=props;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  const handleOptionSelect = (option: Option) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
    console.log(option.label)
    return selectedOption?.label;
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <Box>
      <button onClick={toggleDropdown} style={{border:'hidden',color:theme.palette.gray.white}}>
        <Image src='../assets/icons/chervondown.svg'/> 
      </button>
      {isDropdownOpen && (
        <Stack   >
          {options.map((option) => (
            <Stack
         
              key={option.value}
              onClick={() => handleOptionSelect(option)}
            >
              {option.label}
            </Stack>
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default Dropdown;
