import { render, screen } from '@testing-library/react'
import TimePeriodTabs from '.'
import '@testing-library/jest-dom'
import theme from "../../../theme"
test('renders TimePeriodTabs component', () => {
  render(<TimePeriodTabs clicked={false} />)
  expect(screen.getByText('1H')).toBeInTheDocument()
  expect(screen.getByText('24H')).toBeInTheDocument()
  expect(screen.getByText('1W')).toBeInTheDocument()
  expect(screen.getByText('1M')).toBeInTheDocument()
  expect(screen.getByText('1Y')).toBeInTheDocument()
  expect(screen.getByText('ALL')).toBeInTheDocument()
})

test('applies clicked styles when clicked prop is true', () => {
  render(<TimePeriodTabs clicked={true} />)
  const timePeriodTabs = screen.getByText('1M')
  expect(timePeriodTabs).toHaveStyle('color: #0052FF')
})

test('applies clicked styles when clicked and rounded is true', () => {
  render(<TimePeriodTabs clicked={true} rounded={true}/>)
  const timePeriodTabs = screen.getByText('1M')
  expect(timePeriodTabs).toHaveStyle(`color: ${theme.palette.primary[900]}`)
  expect(timePeriodTabs).toHaveStyle(`backgroundColor: ${theme.palette.primary[300]}`)

})