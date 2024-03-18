import TypographyComponent from "../../atoms/Typography"
import theme from "../../../theme"
import { Box } from "@mui/material";
import Image from "../../atoms/Image"
import CustomButton from "../../atoms/Button";
import {Cashwatchlistvalues } from "../../../utils/constants"
const dollar = "../assets/icons/usddollar.svg"
const BoxStyles = {
    border: `1px solid ${theme.palette.gray[100]}`,
    padding: 6,
    borderRadius: 2,
}
const CashWatchlist = () => {
  return ( <Box sx={BoxStyles} bgcolor={theme.palette.gray.white}>
  <Box
    display="flex"
    justifyContent="space-between">
    <Box display="flex" alignItems="center">
      <Image src={dollar} width="45px" height="45px" />
      <Box display="flex" flexDirection="column" sx={{ marginLeft: 5 }}>
        <TypographyComponent variant="subtitle2">{Cashwatchlistvalues.heading}</TypographyComponent>
        <Box>
          <TypographyComponent
            variant="c1"
            style={{ color: theme.palette.text.lowemp }}
          >
            {Cashwatchlistvalues.cash}
          </TypographyComponent>
        </Box>
      </Box>
    </Box>
    <Box>
      <CustomButton variant="outlined" sx={{marginRight: "20px"}}>{Cashwatchlistvalues.buttons[0]}</CustomButton>
      <CustomButton variant="outlined">{Cashwatchlistvalues.buttons[1]}</CustomButton>
    </Box>
  </Box>
</Box>);
}

export default CashWatchlist;