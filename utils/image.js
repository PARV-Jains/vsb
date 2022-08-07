import ImageUrlBuilder from '@sanity/image-url';
import client from './client';

const builder = ImageUrlBuilder(client);


export const urlFor = (source) => builder.image(source).width(580).url();
export const urlForThumbnail = (source) => builder.image(source).width(300).url();

// function urlForThumbnail(source) {
//   return ImageUrlBuilder(client).image(source);
// }

// function urlFor(source) {
//   return ImageUrlBuilder(client).image(source);
// }

// export {  urlForThumbnail };