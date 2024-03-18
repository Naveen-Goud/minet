import { Grid } from '@mui/material'
import React from 'react'

interface BasicProps {
  leftChildren?: React.ReactNode
  rightChildren?: React.ReactNode
  borderColor?: string
  border?: string
}

const FormTemplate = (props: BasicProps) => {
  return (
    <Grid container height="98vh" width="100%" overflow={'hidden'}>
      <Grid
        data-testid="leftpannel"
        item
        xs={6.0}
        borderColor={props.borderColor}
        border={props.border}
      >
        {props.leftChildren}
      </Grid>

      <Grid
        data-testid="rightpannel"
        item
        paddingY="4vh"
        xs={6.0}
        borderColor={props.borderColor}
        border={props.border}
        paddingX={'7vw'}
      >
        {props.rightChildren}
      </Grid>
    </Grid>
  )
}

export default FormTemplate
