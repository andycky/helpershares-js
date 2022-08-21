import {NextPage} from 'next';
import axios from 'axios';
import {useEffect, useState} from "react";
import Head from 'next/head'
import useSWR from "swr";
import Image from "next/image";
import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

type employerData = {
  name: string;
  mobile: string;
};

type helperData = {
    employer: string;
    name: string;
    mobile: string;
    image: string;
    mark: string;
    mark_comment: string;
};

const address='https://script.google.com/macros/s/AKfycbyLAfHgGOYL1kaEZ2wKgkLJcGBOEtdQ_gLfsJYFqT6i8LxO4e-mrHELKgkUJUuRHLqugw/exec'

const Employers: NextPage = () => {
      // [] 表示只在第一次渲染的时候请求
      const [employers, setEmployers] = useState<employerData[]>([]);
      const [helpers, setHelpers] = useState<helperData[]>([]);
      const [isLoading, setIsLoading] = useState(false);



      const fetchData = async (employerName:string) => {
        const req = await fetch(address+"?api=helperDatabyEmployer&employer="+employerName);
        const newData = await req.json();
    
        setHelpers(newData);
      };

      const handleClick = (event: { preventDefault: () => void; },employerName:string) => {
        event.preventDefault();
        fetchData(employerName);
      };

      useEffect(() => { 
          setIsLoading(true);
          // 使用 AJAX 异步请求数据
          axios.get(address+"?api=employerData").then(response => {
            setEmployers(response.data);
            setIsLoading(false);
          }, () => {
              setIsLoading(true);
          })
      }, []);
      return (
        <div>
          <div>
            <Head>
                <link
                  href="https://fonts.googleapis.com/css2?family=Inter&display=optional"
                  rel="stylesheet"
                />
            </Head>
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
              {isLoading ? <div>Loading...</div> :
                  employers.map(employer => 
                <Accordion key={employer.name} color="secondary">        
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header">
                      <Typography>{employer.name}</Typography>
                  </AccordionSummary>    
                  <AccordionDetails>
                    <Box sx={{ flexGrow: 1 }}>
                      <Grid container spacing={1}>
                        <Grid xs={1}>
                          <Link href={"https://wa.me/"+employer.mobile}>
                            <img width="50" src="https://icons.iconarchive.com/icons/limav/flat-gradient-social/256/Whatsapp-icon.png" />
                          </Link>
                        </Grid>
                        <Grid xs={1}>
                          <Button onClick={(event) => handleClick(event,employer.name)}>
                            <img width="50" src="data:image/png;base64,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" />
                          </Button>
                        </Grid>
                      </Grid>
                    </Box>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                    {helpers.map(helper => (helper.employer==employer.name)?
                      <Accordion key={helper.name} color="secondary">        
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header">
                                <Box sx={{ flexGrow: 1 }}>
                                  <Grid container spacing={3}>
                                    <Grid xs>
                                      <Item><Image src={helper.image} width="100%" height="100%"/></Item>
                                    </Grid>
                                    <Grid xs>
                                      <Item><Avatar>{helper.mark.length}</Avatar></Item>
                                    </Grid>
                                    <Grid xs>
                                      <Item>{helper.name}</Item>
                                    </Grid>
                                  </Grid>
                                </Box>
                        </AccordionSummary>    
                        <AccordionDetails>
                        </AccordionDetails>
                    </Accordion>:"")}
                </AccordionDetails>
                </Accordion>)}
            </Box>      
            </Container>
          </div>
        </div>
      )
  };


  
  export default Employers;