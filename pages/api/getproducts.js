// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Product from '../../models/Product';
import connectDB from '../../middleware/mongoose';

const handler = async (req, res) => {
  let products = await Product.find();
  let namkeens = {};
  for (let item of products) {
    if (item.title in namkeens) {
      if (
        !namkeens[item.title].color.includes(item.color) &&
        item.availableQty > 0
      ) {
        namkeens[item.title].color.push(item.color);
      }
      if (
        !namkeens[item.title].size.includes(item.size) &&
        item.availableQty > 0
      ) {
        namkeens[item.title].size.push(item.size);
      }
    } else {
      namkeens[item.title] = JSON.parse(JSON.stringify(item));
      if (item.availableQty > 0) {
        namkeens[item.title].color = [item.color];
        namkeens[item.title].size = [item.size];
      }
    }
  }
  res.status(200).json({ namkeens });
};
export default connectDB(handler);
