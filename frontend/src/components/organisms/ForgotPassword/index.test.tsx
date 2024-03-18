import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import { ForgotPassword } from '.';

describe('ForgotPassword', () => {
  test('renders the component', () => {
    render(
      <ForgotPassword
        handleEmailButtonClick={() => {}}
        handleResetClick={() => {}}
        reset={false}
      />
    );
  });

  test('enables reset link button when a valid email is entered', () => {
    render(
      <ForgotPassword
        reset={false}
      />
    );

    const emailInput = screen.getByPlaceholderText('you@company.com');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    const resetLinkButton = screen.getByText('Send Reset Link');
    expect(resetLinkButton).not.toBeDisabled();
  });

  test('disables reset link button when an invalid email is entered', () => {
    render(
      <ForgotPassword
        reset={false}
      />
    );

    const emailInput = screen.getByPlaceholderText('you@company.com');
    const resetLinkButton = screen.getByText('Send Reset Link');
    fireEvent.change(emailInput, { target: { value: 'test' } });
    expect(resetLinkButton).toBeDisabled();
  });

  test('enables reset password button when a valid code is entered', () => {
    render(
      <ForgotPassword
        reset={true}
      />
    );

    const codeInput = screen.getByPlaceholderText('8 digits code');
    fireEvent.change(codeInput, { target: { value: '12345678' } });
    const resetPasswordButton = screen.getByText('Reset Password');
    expect(resetPasswordButton).not.toBeDisabled();
  });

  test('disables reset password button when an invalid code is entered', () => {
    render(
      <ForgotPassword
        reset={true}
      />
    );

    const codeInput = screen.getByPlaceholderText('8 digits code');
    fireEvent.change(codeInput, { target: { value: '1234567' } });
    const resetPasswordButton = screen.getByText('Reset Password');
    expect(resetPasswordButton).toBeDisabled();
  });
  
});
