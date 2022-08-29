import { MdBorderColor } from 'react-icons/md';
import client from '../../utils/client';
// const getCatBreeds = async () => {
//   const catBreeds = await fetch('https://catfact.ninja/breeds')
//     .then(res => res.json())
//     .then(json => json.data.map(cat => ({
//         title: cat.breed, 
//         value: cat.breed.toLowerCase().split(' ').join('-')
//       })))

//   return catBreeds
// }


export default {
  name: 'sanityorder',
  title: 'Orders',
  icon: () => '🥗',
  type: 'document',
  fields: [
    {
      title: 'User',
      name: 'sanityuser',
      type: 'reference',
      to: [{ type: 'sanityuser' }],
      options: {
        disableNew: true,
      },
    },
    {
      name: 'sanityemail',
      title: 'Email',
      type: 'string',
    },
    {
      name: 'oid',
      title: 'Order Id',
      type: 'number',
    },
    {
      name: 'sanitypaymentinfo',
      title: 'Payment Info',
      type: 'string',
    },
    {
      name: 'address',
      title: 'address',
      type: 'string',
    },
    {
      name: 'pincode',
      title: 'pincode',
      type: 'string',
    },
    {
      name: 'phone',
      title: 'phone',
      type: 'string',
    },
    {
      name: 'sanityname',
      title: 'User Name',
      type: 'string',
    },
    {
      title: 'Transaction Id',
      name: 'Sanitytransactionid',
      type: 'string',
    },
    {
      title: 'Payment Method',
      name: 'paymentMethod',
      type: 'string',
    },
    {
      title: 'Amount',
      name: 'subTotal',
      type: 'number',
    },
    {
      title: ' Order Items',
      name: 'sanityorderitems',
      type: 'array',
      of: [
        {
          title: 'Order Item',
          name: 'sanityorderitem',
          type: 'object',
          fields: [
            {
              title: 'Name',
              name: 'name',
              type: 'string',
            },
            {
              title: 'quantity',
              name: 'qty',
              type: 'number',
            },
            {
              title: 'Price',
              name: 'price',
              type: 'number',
            },
            {
              title: 'Size',
              name: 'size',
              type: 'string',
            },
            {
              title: 'Product Id',
              name: 'id',
              type: 'string',
            },
            {
              title: 'Available Quantity',
              name: 'AvailableQty',
              type: 'number',
            },
           
            {
              title: 'Weight In Grams',
              name: 'grams',
              type: 'string',
            },
          ],
        },
      ],
    },
    {
      title: 'Status',
      name: 'STATUS',
      type: 'string',
    },
    {
      title: 'IsPaid',
      name: 'isPaid',
      type: 'boolean',
    },
    {
      title: 'Delivery Status',
      name: 'sanitydeliverystatus',
      type: 'array',
      of: [{type:'string'}
    ],
      options: {
         list: [
        { title: 'Order Placed', value: 'Placed' },
          { title: 'Dispatched', value: 'Dispatched' },
          { title: 'On The Way', value: 'OnTheWay' },
          { title: 'Delivered', value: 'Delivered' },
        ],
       initialValue:['Placed']
      },
      
    },
    {
      title: 'COD STATUS',
      name: 'codStatus',
      type: 'boolean',
    },
    {
      title: 'IsDelivered',
      name: 'isDelivered',
      type: 'boolean',
    },
    {
      title: 'Delivered At',
      name: 'deliveredAt',
      type: 'datetime',
    },
    {
      title: 'Created At',
      name: 'createdAt',
      type: 'datetime',
    },
  ],
  preview: {
    select: {
      title: 'sanityname',
      subtitle: 'subTotal'
    }
  }
};
