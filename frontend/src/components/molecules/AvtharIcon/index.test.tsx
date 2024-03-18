import React from 'react';
import { render, screen } from '@testing-library/react';
import Profile from '.';
import '@testing-library/jest-dom'

describe('Profile', () => {
  test('renders an avatar with the provided source', () => {
    render(<Profile src=" " alt='Profile avatar' />);
    const avatar = screen.getByAltText('Profile avatar');
    expect(avatar).toBeInTheDocument;

  });
});