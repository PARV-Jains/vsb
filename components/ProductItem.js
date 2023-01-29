import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor, urlForThumbnail } from '../utils/image';

const ProductItem = ({
  newsanityitem: { slug, image, name, price, size, description, AvailableQty ,category,id}
}) => {
  return (
    <div>
      <Link passHref={true} href={`/product/sanitySlug/${slug.current}`} className="block relative  rounded overflow-hidden">
        <div className="p-4 hover:scale-110  transition duration-500 w-full  cursor-pointer  shadow-lg m-5">
         
            <img
              alt="ecommerce"
              loading='lazy'
              className="m-auto  h-[30vh]  md:h-[36vh] block"
              src={urlForThumbnail(image && image[0])}
            />
           
          <div className="mt-4 text-center md:text-left">
            <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
              {category}
            </h3>
            <h2 className="text-gray-900 title-font text-lg font-medium">
              {name}
            </h2>
            {/* <p className="mt-1">₹{price}</p> */}
            {size && (
              <div className="mt-1">
                {size.includes('250g') && (
                  <span className="border border-gray-300 px-1 mx-1">
                    250g{' '}
                  </span>
                )}
                {size.includes('500g') && (
                  <span className="border border-gray-300 px-1 mx-1">
                    500g{' '}
                  </span>
                )}
                {size.includes('1kg') && (
                  <span className="border border-gray-300 px-1 mx-1">1kg </span>
                )}
              </div>
            )}
            
          </div>
        </div>
      </Link>

    </div>
  );
};
export const revalidate = 30;
export default ProductItem;
