import { useRouter } from 'next/router';
import React from 'react';
import { useState } from 'react';
import client from '../utils/client';
import Link from 'next/link';
import { useEffect } from 'react';
import { urlFor, urlForThumbnail } from '../utils/image';
import Head from 'next/head';
import Navbar from '../components/navbar';
import SearchResult from '../components/ProductItem';
import ProductItem from '../components/ProductItem';

export default function Search({sanityproductss}) {
  const router = useRouter();

  const { query = 'all' } = router.query;
  const [state, setState] = useState({
    newsanityproductss: [],
    error: '',
    loading: true,
  });
  const { loading,newsanityproductss, error } = state;

  

  useEffect(() => {
    const fetchSanityData = async () => {
      try {
     
        // let sanityQuery = '*[_type == "sanityproduct"]';
        // let sanityQuery = '*[_type == "sanityproduct"';
        // if (query !== 'all') {
        //   // sanityQuery += `| score(name match "*${query}*") `;
        //   sanityQuery += ` && name match "${query}" `;
        // }
        // //  sanityQuery += `| order(_score desc)`;
        // //  sanityQuery += `{name,image}`;
        // sanityQuery += `]`;
        let sanityQuery = '*[_type == "sanityproduct"';
        sanityQuery += `]`;
        if (query !== 'all') {
          // sanityQuery += `| score(name match "*${query}*") `;
          sanityQuery += ` | score(name match "*${query}*") | order(_score desc)`;
        }
       
        setState({ loading: true });
        const newsanityproductss = await client.fetch(sanityQuery);
   
        setState({ newsanityproductss, loading: false });
       
      } catch (err) {
        setState({ error: err.message, loading: false });
      }
    };
    fetchSanityData();
  }, [query]);

  const filterSearch = ({ searchQuery }) => {
    const path = router.pathname;
    const { query } = router;
    if (searchQuery) query.searchQuery = searchQuery;
    router.push({
      pathname: path,
      query: query,
    });
  };

  return (
    <div>
      <Head>
        <title>Search Products - Vikas Sev Bhandar</title>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"
        />
      </Head>
      <div>
        <div  container spacing={2}>
          <div item md={9}>
            <div container justifycontent="space-between" alignitems="center">
              <div item>
                {newsanityproductss && newsanityproductss.length !== 0
                  ? newsanityproductss.length
                  : 'No'}{' '}
                Results
                {query !== 'all' && query !== '' && ' : ' + query}
                {(query !== 'all' && query !== '') || 'hello from error' ? (
                  <button onClick={() => router.push('/search')}>X</button>
                ) : null}
              </div>
            </div>
            {/* <div  container spacing={3}>
              <div container spacing={3}> */}
                {error ?(
                console.log(error)
                ): (
                  <div className="flex flex-wrap justify-center gap-5 ">
                {newsanityproductss?.map((newsanityitem) => (    
                    <ProductItem  key={newsanityitem.name} newsanityitem={newsanityitem} />
                ))}
                
                </div>
                )}
              {/* </div>
            </div> */}
          </div>
        </div>

       
      </div>
    </div>
  );
}
export const getServerSideProps = async () => {
  const sanityquery = '*[_type == "product"]';
  const sanityproducts = await client.fetch(sanityquery);

  const productquery = '*[_type == "sanityproduct"]';
  const sanityproductss = await client.fetch(productquery);
  return {
    props: { sanityproducts, sanityproductss },
  };
};
