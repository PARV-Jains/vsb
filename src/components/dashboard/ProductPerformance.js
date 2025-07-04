import React from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";
import BaseCard from "../baseCard/BaseCard";



const AllProducts = ({sanityproductss}) => {
  return (
    <BaseCard title="All Products">
      <Table
        aria-label="simple table"
        sx={{
          mt: 3,
          whiteSpace: "nowrap",
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Title
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Slug
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Image
              </Typography>
            </TableCell>
           
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Size
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography color="textSecondary" variant="h6">
                Price
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        {/* <TableBody>
          {sanityproductss.map((product) => (
            <TableRow key={product.slug}>
              <TableCell>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "500",
                  }}
                >
                  {product.title}
                </Typography>
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "600",
                      }}
                    >
                      {product.slug}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      sx={{
                        fontSize: "13px",
                      }}
                    >
                      
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                      <img style={{height : '42px',margin:'0 12px'}} src={product.img} alt="" />
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  {product.size}
                </Typography>
              </TableCell>
              <TableCell>
               
              </TableCell>
              <TableCell align="left">
                <Typography >₹{product.price}</Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody> */}
      </Table>
    </BaseCard>
  );
};
export const getServerSideProps = async () => {
  const sanityquery = '*[_type == "product"]';
  const sanityproducts = await client.fetch(sanityquery);

  const productquery = '*[_type == "sanityproduct"] ';
  const sanityproductss = await client.fetch(productquery);

  return {
    props: { sanityproducts, sanityproductss },
  };
};

export default AllProducts;
