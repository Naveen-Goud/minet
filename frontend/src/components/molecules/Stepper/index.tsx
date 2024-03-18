import { Box, Stack, Step, StepLabel, Stepper } from '@mui/material'
import theme from '../../../theme'
import TypographyComponent from '../../atoms/Typography'
import './index.css'

interface CustomStepperProps {
  activeStep?: number
  steps: any[]
}

const StepIcon = ({ src }: any) => {
  return <img src={src} alt="step icon" />
}

const StepConnector = () => {
  return (
    <Stack
      height={'1.8vh'}
      justifyContent={'center'}
      alignItems={'flex-start'}
      px={'1.3vw'}
    >
      <img
        className="step"
        src="../assets/icons/stepperconnector.svg"
        alt="img not found"
        width={'0.5%'}
      />
    </Stack>
  )
}

const icon: any = (src: any) => {
  return <StepIcon src={src} />
}

export const CustomStepper = (props: CustomStepperProps) => {
  return (
    <Box width={'25vw'}>
      <Stepper
        activeStep={props.activeStep}
        orientation="vertical"
        connector={<StepConnector />}
      >
        {props.steps.map((step: any) => (
          <Step key={step.label}>
            <StepLabel StepIconComponent={icon.bind(null, step.icon)}>
              <Stack>
                <TypographyComponent
                  variant="c2"
                  style={{ color: theme.palette.text.medemp }}
                >
                  {step.label1}
                </TypographyComponent>
                <TypographyComponent
                  variant="b1"
                  style={{ color: theme.palette.text.highemp }}
                >
                  {step.label2}
                </TypographyComponent>
              </Stack>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  )
}
