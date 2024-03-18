import TypographyComponent from "../../atoms/Typography"
import theme from "../../../theme"
import Image from "../../atoms/Image"
import CustomButton from "../../atoms/Button"
import { Box, styled } from "@mui/material"
interface PaymentSuccessProps {
   totalAmount: string
   transactionType: "Purchase" | "Sell"
   crypto: string
   handleCryptoClick?: any
   handleCoinClick?: any
}
const StyledBox = styled(Box)(() => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column', 
    textAlign: 'center',
    width: '400px',
}));
const PaymentSuccess = (props: PaymentSuccessProps) => {
  return <>
   <StyledBox>
   <Image src={"../assets/icons/checkouttick.svg"} width="64px" height="64px" sx={{marginBottom: "20px"}}/>
   <TypographyComponent variant={"h4"} style={{color: theme.palette.text.highemp}} >
   {props.totalAmount} {props.crypto}
   </TypographyComponent>
  
   <TypographyComponent variant={"b2"} style={{color: theme.palette.text.highemp, marginBottom: "20px"}}
   >{props.transactionType} is completed, please check your
    balance in your {props.transactionType === "Purchase" ? "crypto wallet" : "Rupee coin"}</TypographyComponent>
    <Box>
    <CustomButton variant="outlined" sx={{width: "160px", height: "42px", marginRight: "20px"}}
    onClick={props.handleCryptoClick}>
     {props.transactionType == "Purchase" ?  "BUY CRYPTO" : "SELL CRYPTO" }</CustomButton>
    <CustomButton variant="contained" sx={{width: "200px", height: "42px"}}
    onClick={props.handleCoinClick}>GO TO USD COIN</CustomButton>
    </Box>
    </StyledBox>
  </>
}
export default PaymentSuccess