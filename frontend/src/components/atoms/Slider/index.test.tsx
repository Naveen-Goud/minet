import { render } from '@testing-library/react'
import SliderComponent from '.'

describe('SliderComponent', () => {
  it('renders with initial value', () => {
    const handleChange = jest.fn()
    render(<SliderComponent value={50} handleChange={handleChange} />)
  })
})
