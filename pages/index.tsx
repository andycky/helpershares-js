import { InferGetStaticPropsType } from 'next';
import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '../src/Link';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

type Data = {
  employers: [
    employer:{
      name: string;
      N: string;
    },
  ];
};

export const getStaticProps = async () => {
  const res = await fetch('https://script.google.com/macros/s/AKfycbyKW4XeaHWRlumGIyYzTsrdLtz8fOPJNufDf5fAabfDp7_iuwAIsWIdJnqyAJfEHhi6Ew/exec');
  const swapis: Data = await res.json();

  return {
    props: {
      swapis,
    },
  };
};

const Home = ({ swapis }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
      {Object.entries(swapis.employers).map(([key,employer]) => (
        <Accordion key={employer.name} color="secondary">        
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header">
              <Typography>{employer.name}</Typography>
          </AccordionSummary>    
          <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
        </Accordion>
      ))}
    </Box>      
    </Container>
  );
};

export default Home;
