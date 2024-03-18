import { render, screen } from '@testing-library/react'
import Image from './index'
import '@testing-library/jest-dom'
import React from 'react'
import CryptoCard from './index';

describe('image',()=>{  
it('displays the provided image', () => {
  const mockProps = {
    src: 'image.jpg',
    title: 'Bitcoin',
    cost: '$10,000',
    alt: 'Crypto card image',
  };

  const { getByAltText } = render(<CryptoCard {...mockProps} />);
  const image = screen.getByAltText(mockProps.alt);
  expect(image).toBeInTheDocument();
  expect(image.getAttribute('src')).toBe(mockProps.src);
});
});