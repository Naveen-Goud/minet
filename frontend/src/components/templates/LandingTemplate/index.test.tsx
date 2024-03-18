import React from 'react';
import { render } from '@testing-library/react';
import LandingTemplate from '.';
import '@testing-library/jest-dom'

describe('LandingTemplate', () => {
  it('renders the sidebar, header, content, and footer', () => {
    const { getByText } = render(
      <LandingTemplate
        sidebar={<div>My Sidebar</div>}
        header={<div>My Header</div>}
        content={<div>My Content</div>}
        footer={<div>My Footer</div>}
      />
    );

    expect(getByText('My Sidebar')).toBeInTheDocument();
    expect(getByText('My Header')).toBeInTheDocument();
    expect(getByText('My Content')).toBeInTheDocument();
    expect(getByText('My Footer')).toBeInTheDocument();
  });

  it('renders default text when sidebar, header, content, or footer is not provided', () => {
    const { getByText } = render(<LandingTemplate />);

    expect(getByText('Sidebar')).toBeInTheDocument();
    expect(getByText('Header')).toBeInTheDocument();
    expect(getByText('Content')).toBeInTheDocument();
    expect(getByText('Footer')).toBeInTheDocument();
  });
});
