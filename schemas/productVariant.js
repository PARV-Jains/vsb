import { BiFoodMenu } from 'react-icons/bi';

export default {
  name: 'sanityproductvar',
  title: 'Product Variant ',
  icon: BiFoodMenu,
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      title: 'Weight in grams',
      name: 'grams',
      type: 'string',
      options:{
        list:[
{ title:'500g', value:'500g'},
{ title:'250g', value:'250g'},
{ title:'1kg', value:'1kg'},
        ],
      },
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
    },
    { 
      name: 'image',
      title: 'Image',
      type: 'array',
      of:[{type:'image'}],
      options: {
        hotspot: true,
      },
    },
    {
      name: 'description',
      title: 'Description',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    },
    {
      name: 'brand',
      title: 'Brand',
      type: 'string',
    },
    {
      title: 'Size',
      name: 'size',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
         
          { title: '500 G', value: '500g' },
          { title: '250 G', value: '250g' },
          { title: '1 KG', value: '1kg' },
        ],
        sortable: true,
      },
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
    },
    {
      name: 'AvailableQty',
      title: 'Available Quantity',
      type: 'number',
    },
  ],
};
