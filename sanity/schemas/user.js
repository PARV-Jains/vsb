import { FaUserCheck } from 'react-icons/fa';


export default {
 name:'sanityuser',
 title:'Users',
 icon: FaUserCheck,
 type: 'document',
 fields: [{
    name:'name',
    title:'Name',
    type: 'string',
 },
 {
    name: 'email',
    title: 'Email',
    type: 'string',
 },
 {
   name: 'password',
   title: 'Password',
   type: 'string',
 },
 {
   name: 'address',
   title: 'Address',
   type: 'string',
 },
 {
   name: 'pincode',
   title: 'Pincode',
   type: 'string',
 },
 {
   name: 'phone',
   title: 'Phone',
   type: 'string',
 },
 {
   name: 'isAdmin',
   title: 'Admin',
   type: 'boolean',
 },

]
}