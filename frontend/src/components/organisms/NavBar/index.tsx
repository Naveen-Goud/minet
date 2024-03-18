import React from 'react'
import Box from '@mui/material/Box'
import Image from '../../atoms/Image'
import theme from '../../../theme'
import {
  Navbarelelements,
  Dashboardactiveelement,
} from '../../../utils/constants'
import Tooltip from '@mui/material/Tooltip'
import { useAuth0 } from '@auth0/auth0-react'
import { useNavigate } from 'react-router'
const Content = React.forwardRef((props, ref) => (
  <div {...props} ref={ref}>
    {props.content}
  </div>
))

interface NavBarProps {
  handleClick?: any
  isActive?: any
  setIsActive?: any
}

const NavBar = (props: NavBarProps) => {
  const navigate = useNavigate()

  const { logout } = useAuth0()

  const getImageSource = (element: string) => {
    if (element === 'dashboard' && props.isActive) {
      return `../assets/icons/${Dashboardactiveelement}.svg`
    } else {
      return `../assets/icons/${element}.svg`
    }
  }
  return (
    <>
      <Box
        sx={{
          width: '4vw',
          height: '100%',
          padding: '12px 12px 0px 12px',
          borderRight: `1px solid ${theme.palette.gray[50]}`,
        }}
        display="flex"
        alignItems="center"
        flexDirection={'column'}
        gap="30px"
      >
        {Navbarelelements.map((element: string) => (
          <Box key={element}>
            <Tooltip
              title={element}
              children={
                <Content
                  content={
                    <Image
                      onClick={() => {
                        if (element === 'dashboard') {
                          props.setIsActive(true)
                          navigate('/dashboard')
                        } else if (element === 'logout') {
                          logout()
                        }
                      }}
                      src={getImageSource(element)}
                      alt={`${element} icon`}
                      sx={{
                        cursor: 'pointer',
                      }}
                    />
                  }
                />
              }
              placement="right"
            />
          </Box>
        ))}
      </Box>
    </>
  )
}
export default NavBar
