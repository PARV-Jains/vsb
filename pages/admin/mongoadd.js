import React, { useState } from 'react'
import theme from "../../src/theme/theme";
import { ThemeProvider } from "@mui/material/styles";
import FullLayout from "../../src/layouts/FullLayout";
import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, Radio, RadioGroup, Stack, TextField } from '@mui/material';
import BaseCard from "../../src/components/baseCard/BaseCard"

const Mongoadd = () => {
  const [form, setForm] = useState({})
  const ProductOnChange = (e) => {
setForm({
  ...form,
  [e.target.name]: e.target.value
})
  }


  
  return (
    <ThemeProvider theme={theme}>
      <style jsx global>{`
        footer {
         display: none;
        }
      `}</style>
      <FullLayout>
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <BaseCard title="Add a Product">
          <Stack spacing={3}>
            <TextField
            onChange={ProductOnChange} value={form.title ? form.title:""} name="title" label="Title" variant="outlined" />
            <TextField
            onChange={ProductOnChange} value={form.size ? form.size:""} name="size" label="Size" variant="outlined" />
            <TextField
            onChange={ProductOnChange} value={form.type ? form.type:""} name="type" label="Type" variant="outlined" />
            <TextField
            onChange={ProductOnChange} value={form.slug ? form.slug:""} name="slug" label="Slug" variant="outlined" />
           
            <TextField
            onChange={ProductOnChange}
              name="description"
              label="Description"
              value={form.description ? form.description:""}
              multiline
              rows={4}
            />
         
           
         
          </Stack>
          <br />
          <Button 
          // onClick={SubmitProductForm}
           variant="outlined" mt={2}>
            Submit
          </Button>
        </BaseCard>
      </Grid>

     
    </Grid>
   </FullLayout>
 </ThemeProvider>
  );
}

export default Mongoadd