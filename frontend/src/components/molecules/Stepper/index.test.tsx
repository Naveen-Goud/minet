import { render, screen } from '@testing-library/react'
import { CustomStepper } from '.'
import React from 'react'
import '@testing-library/jest-dom'

describe('CustomStepper', () => {
  const steps = [
    {
      label1: 'Step 1',
      label2: 'Step One',
      icon: 'step1-icon.png',
    },
    {
      label1: 'Step 2',
      label2: 'Step Two',
      icon: 'step2-icon.png',
    },
  ]

  it('renders the custom stepper with the correct step labels', () => {
    render(<CustomStepper steps={steps} />)

    expect(screen.getByText('Step 1')).toBeInTheDocument()
    expect(screen.getByText('Step One')).toBeInTheDocument()
    expect(screen.getByText('Step 2')).toBeInTheDocument()
    expect(screen.getByText('Step Two')).toBeInTheDocument()
  })
})
