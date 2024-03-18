import React from "react";
import { render ,screen} from "@testing-library/react";
import WatchList, { WatchListProps } from "./";
import '@testing-library/jest-dom/extend-expect'
import { AlternateEmail } from "@mui/icons-material";
 
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
        <WatchList
              data={data}
              showYGridLines={true}
              showLegends={true}
              margins={{ top: 10, right: 10, bottom: 10, left: 10 }} showXAxis={false}        />
      )
    });

    
    test("checkoing alt text",()=>{
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
      
        render(
            <WatchList data={newData} alt="Image-Item" src=" " showYGridLines={true} showXAxis={false} showLegends={true}  margins={{ top: 10, right: 10, bottom: 10, left: 10 }}/>
        )
        const alttext= screen.getByTestId("mocked-responsive-line");
        expect(alttext).toBeInTheDocument

    })
})