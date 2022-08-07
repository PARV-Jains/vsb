import { Grid } from "@mui/material";
import BlogCard from "../../src/components/dashboard/BlogCard";
import SalesOverview from "../../src/components/dashboard/SalseOverview";
import DailyActivity from "../../src/components/dashboard/DailyActivity";
import ProductPerfomance from "../../src/components/dashboard/ProductPerformance";
import theme from "../../src/theme/theme";
import { ThemeProvider } from "@mui/material/styles";
import FullLayout from "../../src/layouts/FullLayout";
import Head from "next/head";

export default function Index() {
  return (
    <>
    <Head>
        <title>Admin Panel VikasSevBhandar</title>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"
        />
      </Head>
    <ThemeProvider theme={theme}>
    <style jsx global>{`
        footer {
         display: none;
        }
      
      `}</style>
         <FullLayout>
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <SalesOverview />
      </Grid>
      {/* ------------------------- row 1 ------------------------- */}
      <Grid item xs={12} lg={4}>
        <DailyActivity />
      </Grid>
      <Grid item xs={12} lg={8}>
        <ProductPerfomance />
      </Grid>
      <Grid item xs={12} lg={12}>
        <BlogCard />
      </Grid>
    </Grid>
    </FullLayout>
    </ThemeProvider>
    </>
  );
}
