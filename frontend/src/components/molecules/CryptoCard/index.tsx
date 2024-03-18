import React from "react";
import TypographyComponent from "../../atoms/Typography";
import { Grid, Stack } from "@mui/material";
import theme from "../../../theme";
import Image from "../../atoms/Image";

interface CardProps {
  src?: string;
  title?: string;
  cost?: string;
  alt?: string;
  sx?: string;
}

const CryptoCard = (props: CardProps) => {


  const cardStyle = {
    height: "11.04vw",
    width: "10.83vw",
    backgroundColor: theme.palette.gray.white,
    padding: '1.5rem',

  };

  const imageContainerStyle = {
    paddingLeft: '7.68rem',
    justifyContent: "flex-end",
    width: '2.05vw',
    height: '2.17vw',

  };

  const thumbnailStyle = {
    height: "3.889vw",
    width: "3.889vw",
  };

  const detailsStyle = {
    alignItems: "center",
    spacing: '4px'
  };
  const innerDetils = {
    width: '7.083vw',
    height: '2.77vw',
    spacing: "2px",
    alignItems: 'center',

  }
  const titleStyle = {
    color: theme.palette.gray[500],
    lineHeight: "22px",
  };

  const costStyle = {
    height: "1.111vw",
    width: "7.083vw",
    alignItems: 'center',

  };

  const costTextStyle = {
    color: theme.palette.text.medemp,
  };

  return (
    <Grid >
      <Stack sx={cardStyle} >
        <Stack sx={imageContainerStyle} justifyContent="flex-end" >
          <Image src="../assets/icons/Vector.svg " width="16.6px" height="11.43px" />
        </Stack>
        <Stack sx={detailsStyle} direction={"column"}>
          <Stack sx={thumbnailStyle}>
            <Image src={props.src} alt={props.alt} />
          </Stack>
          <Stack sx={innerDetils}>
            <TypographyComponent variant="b1" style={titleStyle}>
              {props.title}
            </TypographyComponent>
            <Stack sx={costStyle}>
              <TypographyComponent variant="c1" style={costTextStyle}>
                {props.cost}
              </TypographyComponent>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Grid>
  );
};

export default CryptoCard;
