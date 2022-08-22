import {NextPage} from 'next';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';import axios from 'axios';
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
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Divider } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

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
  match: string;
  status: string;
  service: string;
  N: string;
  L: string;
  S: string;
  age: string;
  D2: string;
  R2: string;
  H2: string;
  G2: string;
};

type helperData = {
  employer: string;
  employerS: string;
  name: string;
    mobile: string;
    match: string;
    image: string;
    service: string;
    N2: string;
    L2: string;
    S: string;
    A: string;
    D2: string;
    R2: string;
    H2: string;
    G2: string;
    mark: string;
    mark_comment: string;
    remark: string;
    active: string;
    color: string;
};

const API_NAME_EMPLOYERDATA="employerData";
const API_NAME_EHELPERDATA_BY_EM="helperDatabyEmployer";
const API_NAME_SEND_JO="sendJo";
const API_NAME_ADD_RECORD_EM="addRecordEmployer";

const address='https://script.google.com/macros/s/AKfycbzPaaETCZILyOVSsMfNZrGfIXdoYo80rfn-zyZdTNgqN7Bu9WikKG8T4NsydmPdi5KM2w/exec'
const pdfAddress='https://script.google.com/macros/s/AKfycbyEAis0HzILKM7Kyumkp5ibfajQHH94mKfLAGFaP8HM8vjxeoZMqR_dHjE6Smc6RyOJ/exec'

const Employers: NextPage = () => {
      // [] 表示只在第一次渲染的时候请求
      const [employers, setEmployers] = useState<employerData[]>([]);
      const [helpers, setHelpers] = useState<helperData[]>([]);
      const [isLoading, setIsLoading] = useState(false);


      const downloadPDF= async (helper:string) => {

        const req = await fetch(pdfAddress+"?helper="+helper);
        const pdf = await req.text();

        const linkSource = `data:application/pdf;base64,${pdf}`;
        const downloadLink = document.createElement("a");
        const fileName = "HelperCV.pdf";

        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();
      };


      const fetchData = async (_api:string,helper:helperData) => {
        if(_api==API_NAME_EHELPERDATA_BY_EM){
          const req = await fetch(address+"?api="+_api+"&employer="+helper.employer);
          const newData = await req.json();
          setHelpers(newData);
        }else if(_api==API_NAME_SEND_JO){
          const req = await fetch(address+"?api="+_api+
          "&employer="+helper.employer+"&hmobile="+helper.mobile+"&employerS="+helper.employerS+"&helperName="+helper.name+"&mark="+helper.mark.length);
          const newData = await req.json();
        }else if(_api==API_NAME_ADD_RECORD_EM){
          const req = await fetch(address+"?api="+_api+
          "&employer="+helper.employer+"&helperName="+helper.name+"&mark="+helper.mark.length+"&employerS="+helper.employerS);
          const newData = await req.json();
        }
      };

      const handleClick = (event: { preventDefault: () => void; },_api:string,helper:helperData) => {
        event.preventDefault();
        fetchData(_api,helper);
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
                <Accordion key={employer.name} color="secondary" sx={{width:394}}>        
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header">
                      <div>{employer.name}</div>&nbsp;
                      {(employer.match!="")?<div><Chip sx={{ height: 25 }} label={employer.match} /></div>:""}
                      &nbsp;<div style={{fontSize:11}}>{employer.status}</div>
                  </AccordionSummary>    
                  <AccordionDetails>
                    <Box sx={{ flexGrow: 1 }}>
                      <Grid container spacing={3}>
                        <Grid xs={2}>
                          <Link href={"https://wa.me/"+employer.mobile}>
                            <img width="50" src="https://icons.iconarchive.com/icons/limav/flat-gradient-social/256/Whatsapp-icon.png" />
                          </Link>
                        </Grid>
                        <Grid xs={2}>
                          <Button onClick={(event) => handleClick(event,API_NAME_EHELPERDATA_BY_EM,JSON.parse("{\"employer\":\""+employer.name+"\"}"))}>
                            <img width="50" src="data:image/png;base64,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" />
                          </Button>
                        </Grid>
                      </Grid>
                    </Box>
                    <div style={{fontSize:13}}>
                    {employer.service} | {employer.N} | {employer.L} | {employer.S} | {employer.age} | {employer.D2} | {employer.R2} | {employer.H2} | 
                    {employer.G2}  
                    </div>
                    {helpers.map(helper => (helper.employer==employer.name)?
                      <Accordion key={helper.name} color="secondary">        
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header">
                          <List dense sx={{ width: '100%'}} disablePadding>
                            <ListItem disablePadding>
                              <Avatar style={{backgroundColor: helper.color}} sx={{ width: 26, height: 26 }}>{helper.mark.length}</Avatar>
                              {helper.name.split(' ')[0].split('-')[0]}
                              {(helper.match!=""&&helper.match!=undefined)?<Chip sx={{ height: 25 }} label={helper.match} />:""}
                              <ArrowRightIcon/>
                              <div style={{fontSize:11}}>{helper.remark}</div>
                            </ListItem>
                            <ListItem style={{fontSize:13}} disablePadding>
                              {helper.service} | {helper.N2} | {helper.L2} | {helper.S} | {helper.A}| {helper.D2} | {helper.R2} | {helper.H2} | 
                              {helper.G2}  
                            </ListItem>
                          </List>
                        </AccordionSummary>    
                        <AccordionDetails>
                        <List dense sx={{ width: '100%'}} disablePadding>
                          <ListItem disablePadding>
                            <Image src={helper.image} width="150" height="150"/>
                            <List dense sx={{ width: '100%'}} disablePadding>
                              <ListItem disablePadding>
                                {(helper.active!=="")?
                                <Link href={"https://wa.me/"+helper.mobile}>
                                  <img width="50" src="https://icons.iconarchive.com/icons/limav/flat-gradient-social/256/Whatsapp-icon.png" />
                                </Link>:""}
                                {(helper.active!=="")?
                                <Button onClick={(event) => handleClick(event,API_NAME_ADD_RECORD_EM,helper)}>
                                  <img width="50" src="data:image/png;base64,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" />
                                </Button>:""}
                              <ListItem disablePadding>
                              </ListItem>
                                {(helper.active!=="")?
                                <Button onClick={() => downloadPDF(helper.name)}>
                                  <img width="50" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdH_7-oisrsxkrOE41kj5dHBs-DdkkkFbHsg&usqp=CAU" />
                                </Button>:""}
                                {(helper.active!=="")?
                                <Button onClick={(event) => handleClick(event,API_NAME_SEND_JO,helper)}>
                                  <img width="50" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWHqACosJcVnR_3-1gGW_aYW2I6evxHoc3j_4Tha4d3Lv9lIacpzZJX7kBGaXeQBUl9so&usqp=CAU" />
                                </Button>:""}
                              </ListItem>
                            </List>
                          </ListItem>
                        </List>
                        <div >{helper.mark_comment.split('\n').map(i => {
                                  return <p key={i}>{i}</p>})}</div>
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