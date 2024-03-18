
import React from 'react';
import { Stack } from '@mui/material';
import { Avatar } from '../../atoms/Avatar';
import Image from "../../atoms/Image"

interface ProfileProps {
  src?: string,
  alt?: string;
  dropdownAlt?: string;
  sx?: string;
}

const Profile: React.FC<ProfileProps> = ({ src, alt},ProfileProps) => {
  return (
    <Stack direction="row" spacing={1} alignItems="center" {...ProfileProps}>
      <Avatar src={src} alt={alt} sx={ProfileProps.src}/>
      <Image src='../assets/icons/chervondown.svg' sx={{marginLeft:"10px"}}/>
    </Stack>
  );
};

export default Profile;