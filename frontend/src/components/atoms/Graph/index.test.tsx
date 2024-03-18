import React from 'react'
import { render, screen } from '@testing-library/react'
import Graph from '.'
import '@testing-library/jest-dom/extend-expect'

jest.mock('@nivo/line', () => ({
  ResponsiveLine: () => <div data-testid="mocked-responsive-line" />,
}))

let listener = null

window.ResizeObserver = jest.fn().mockImplementation(function (callback) {
  this.observe = jest.fn()
  this.disconnect = jest.fn()
  this.unobserve = jest.fn()
  listener = callback
})

describe('Graph', () => {
  const data = [
    {
      id: 'line1',
      color: '#ff0000',
      data: [
        { x: '2023-01-01', y: 10 },
        { x: '2023-01-02', y: 20 },
        { x: '2023-01-03', y: 15 },
      ],
    },
  ]

  it('renders without errors', () => {
    render(
      <Graph
        data={data}
        showYGridLines={true}
        showLegends={true}
        margins={{ top: 10, right: 10, bottom: 10, left: 10 }}
      />
    )
  })

  it('displays the graph with provided data', () => {
    render(
      <Graph
        data={data}
        showYGridLines={true}
        showLegends={true}
        margins={{ top: 10, right: 10, bottom: 10, left: 10 }}
      />
    )
    const graphElement = screen.getByTestId('mocked-responsive-line')
    expect(graphElement).toBeInTheDocument()
  })

  it('updates the graph when data prop changes', () => {
    const { rerender } = render(
      <Graph
        showXAxis={false}
        data={data}
        showYGridLines={true}
        showLegends={true}
        margins={{ top: 10, right: 10, bottom: 10, left: 10 }}
      />
    )
    const initialGraphElement = screen.getByTestId('mocked-responsive-line')
    expect(initialGraphElement).toBeInTheDocument()

    const newData = [
      {
        id: 'line1',
        color: '#ff0000',
        data: [
          { x: '2023-01-01', y: 5 },
          { x: '2023-01-02', y: 15 },
          { x: '2023-01-03', y: 20 },
        ],
      },
    ]

    rerender(
      <Graph
        showXAxis={true}
        data={newData}
        showYGridLines={true}
        showLegends={false}
        margins={{ top: 10, right: 10, bottom: 10, left: 10 }}
      />
    )
    const updatedGraphElement = screen.getByTestId('mocked-responsive-line')
    expect(updatedGraphElement).toBeInTheDocument()
  })
})
