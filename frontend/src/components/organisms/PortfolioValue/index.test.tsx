import { render, screen } from '@testing-library/react'
import PortfolioValue, { customTick } from '.'
import '@testing-library/jest-dom/extend-expect'
import { AxisTickProps } from '@nivo/axes'

const data = [
  {
    id: 'Bitcoin',
    color: '#B71A33',
    data: [
      { x: '2023-06-26', y: 220 },
      { x: '2023-06-27', y: 230 },
      { x: '2023-06-28', y: 225 },
      { x: '2023-06-29', y: 240 },
      { x: '2023-06-30', y: 235 },
      { x: '2023-07-01', y: 250 },
      { x: '2023-07-02', y: 245 },
      { x: '2023-07-03', y: 260 },
    ],
  },
  {
    id: 'Total Investment',
    color: '#0052FF',
    data: [
      { x: '2023-06-26', y: 320 },
      { x: '2023-06-27', y: 330 },
      { x: '2023-06-28', y: 325 },
      { x: '2023-06-29', y: 340 },
      { x: '2023-06-30', y: 335 },
      { x: '2023-07-01', y: 350 },
      { x: '2023-07-02', y: 345 },
      { x: '2023-07-03', y: 360 },
    ],
  },
]

jest.mock('@nivo/line', () => ({
  ResponsiveLine: () => <div data-testid="mocked-responsive-line" />,
}))

describe('PortfolioValue', () => {
  test('renders PortfolioValue component without errors', () => {
    render(<PortfolioValue />)
  })

  test('displays total investment value', () => {
    const totalInvestmentValue = '$1000.00'
    const { getByText } = render(
      <PortfolioValue totalInvestmentValue={totalInvestmentValue} />
    )
    expect(getByText(totalInvestmentValue)).toBeInTheDocument()
  })

  test('displays coin type and value', () => {
    const coinType = 'Bitcoin'
    const coinValue = '0.005'
    const { getByText } = render(
      <PortfolioValue coinType={coinType} coinValue={coinValue} />
    )
    expect(getByText(coinType)).toBeInTheDocument()
    expect(getByText(coinValue)).toBeInTheDocument()
  })
  test('displays graph', () => {
    const coinType = 'Bitcoin'
    const coinValue = '0.005'
    const { getByText } = render(
      <PortfolioValue
        graphData={data}
        totalInvestmentValue={'$ 11,900.204'}
        isInvestmentUp={false}
        investmentPercentageChange={1.2}
        coinType={'Bitcoin'}
        coinValue={'$ 12,400'}
        isCoinUp={true}
        coinPercentageChange={8.2}
      />
    )
    const graphElement = screen.getByTestId('mocked-responsive-line')
    expect(graphElement).toBeInTheDocument()
  })
  test('renders custom tick with correct styles', () => {
    const tick: AxisTickProps<string> = {
      tickIndex: 0,
      value: '2023-07-11',
      x: 10,
      y: 20,
    }

    const { getByText } = render(customTick(tick))

    const tickText = getByText('Jul 11')

    expect(tickText).toBeInTheDocument()
    expect(tickText).toHaveStyle('fontFamily: Graphik-Regular')
    expect(tickText).toHaveStyle('fontSize: 0.75rem')
    expect(tickText).toHaveStyle('fontWeight: 400')
    expect(tickText).toHaveStyle('lineHeight: 0.875rem')
    expect(tickText).toHaveStyle('textTransform: uppercase')
  })
})
