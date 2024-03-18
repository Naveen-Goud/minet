import { Grid, styled } from '@mui/material';
import React from 'react';
import theme from '../../../theme';

interface LandingTemplateProps {
  sidebar?: React.ReactNode;
  header?: React.ReactNode;
  content?: React.ReactNode;
  footer?: React.ReactNode;
}

const Container = styled(Grid)({
  width: '100%',
  height: '100vh',
  margin: '0px',
  padding: '0px',
  color: 'black',
  display: 'grid',
  gridTemplateColumns: 'minmax(78px, max-content) 1fr minmax(398px, max-content)',
  gridTemplateRows: 'minmax(82px, max-content) 1fr minmax(90px, max-content)',
  gridTemplateAreas: `
    "sidebar header header"
    "sidebar content content"
    "sidebar footer footer"
  `,
});

const NavigationBar = styled(Grid)(({ sidebar }: { sidebar: React.ReactNode }) => ({
  gridArea: 'sidebar',
  border: sidebar ? 'none' : `1px solid ${theme.palette.gray[100]}`,
}));

const Header = styled(Grid)(({ header }: { header: React.ReactNode }) => ({
  gridArea: 'header',
  border: header ? 'none' : `1px solid ${theme.palette.gray[100]}`,
}));

const Footer = styled(Grid)(({ footer }: { footer: React.ReactNode }) => ({
  gridArea: 'footer',
  border: footer ? 'none' : `1px solid ${theme.palette.gray[100]}`,
}));

const ScrollableContent = styled(Grid)(({ scrollableContent }: { scrollableContent: React.ReactNode }) =>({
  gridArea: 'content',
  border: scrollableContent ? 'none' : `1px solid ${theme.palette.gray[100]}`,
  backgroundColor: theme.palette.primary[100]
   
}));

const LandingTemplate = ({
  sidebar,
  header,
  content,
  footer,
}: LandingTemplateProps) => {
  return (
    <Container>
      <NavigationBar sidebar={sidebar} className="sidebar">
        {sidebar ?? 'Sidebar'}
      </NavigationBar>
      <Header header={header} className="header">
        {header ?? 'Header'}
      </Header>
      <ScrollableContent scrollableContent={content} className="maincontent">
        {content ?? 'Content'}
      </ScrollableContent>
      <Footer footer={footer} className="footer">
        {footer ?? 'Footer'}
      </Footer>
    </Container>
  );
};

export default LandingTemplate;
