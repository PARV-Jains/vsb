import React, { useEffect } from 'react'
import { ThemeProvider } from "@mui/material/styles";
import FullLayout from "../../src/layouts/FullLayout";
// import Head from "next/head";
import theme from "../../src/theme/theme";
import { Grid } from '@mui/material';
import AllProducts from '../../src/components/dashboard/AllProducts'
import mongoose from 'mongoose';
import Product from '../../models/Product';


const Mongoproducts = ({adminproducts}) => {
 useEffect(() => {
   console.log(adminproducts)
   
 }, [])
 
  return (
    <>
  
    <ThemeProvider theme={theme}>
    <style jsx global>{`
    footer {
     display: none;
    }
  `}</style>
         <FullLayout>
         <Grid container spacing={0}>
  <Grid item xs={12} lg={12}>
    <AllProducts adminproducts={adminproducts}/>
  </Grid>
</Grid>
    </FullLayout>
    </ThemeProvider>
    </>
  );
}


export default Mongoproducts

export async function getServerSideProps(context){
  let error = null;
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let adminproducts = await Product.find();
  return {props:{adminproducts: JSON.parse(JSON.stringify(adminproducts))}}
}