import React from 'react'
import { Stack, Box } from '@mui/material'
import {
  DeliveryDetails,
  DeliveryDetailsPlaceholder,
  DeliveryFee,
  none,
} from '../../../utils/constants'
import TypographyComponent from '../../atoms/Typography'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import theme from '../../../theme'
import busicon from '../../../../public/assets/icons/delivery.svg'

type Props = {
  width: string
}
const CustomDropdown = (props: Props) => {
  return (
    <Box sx={{ width: props.width }}>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Stack direction="row">
            <img src={busicon} alt="bus icon" />
            <Stack
              direction="column"
              sx={{ width: '100%', paddingLeft: '20px' }}
            >
              <TypographyComponent variant="b1">
                {DeliveryDetailsPlaceholder.name}
              </TypographyComponent>
              <TypographyComponent
                variant="c1"
                style={{ color: theme.palette.text.medemp }}
              >
                {' '}
                {DeliveryDetailsPlaceholder.fees}{' '}
              </TypographyComponent>
            </Stack>
          </Stack>
        </AccordionSummary>
        <AccordionDetails>
          {DeliveryDetails.map((item) => (
            <Box key={item.name}>
              <Box
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
                sx={{
                  paddingLeft: '20px', 
                  height: '12vh',
                  '&:hover': { backgroundColor: 'lightgray' },
                }}
              >
                <TypographyComponent
                  style={{ paddingRight: '30px' }}
                  variant="b2"
                >
                  <span style={{ color: theme.palette.text.medemp }}>
                    {item.name}{' '}
                  </span>
                  : {item.time}
                </TypographyComponent>
                <TypographyComponent
                  variant="c1"
                  style={{ color: theme.palette.text.medemp, paddingRight: "2px"}}
                >
                  {DeliveryFee} : {item.deliveryFee}
                </TypographyComponent>
              </Box>
            </Box>
          ))}
          <Box
            display={'flex'}
            alignItems={'center'}
            sx={{
              paddingLeft: '20px',
              height: '12vh',
              '&:hover': { backgroundColor: 'lightgray' },
            }}
          >
            <TypographyComponent
              variant="b2"
              style={{ color: theme.palette.text.medemp }}
            >
              {none}
            </TypographyComponent>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}
export default CustomDropdown
