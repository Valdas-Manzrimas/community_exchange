export type Product = {
  _id: string;
  name: string;
  description: string;
  category: Categories;
  images: string[];
  tags: string[];
  owner: string;
  ownerName: string;
  isMine: boolean;
  location: string;
  isAvailable: boolean;
  inWishlist: number;
  createdAt: Date;
  updatedAt?: Date;
};

export type Category = {
  id: string;
  name: string;
};

export type MainColor =
  | 'pink'
  | 'red'
  | 'gray'
  | 'green'
  | 'purple'
  | 'indigo'
  | 'yellow'
  | 'blue';

export type Categories =
  | 'Electronics'
  | 'Furniture'
  | 'Clothing'
  | 'Books'
  | 'Services'
  | 'Home & Kitchen'
  | 'Toys & Games'
  | 'Sports & Outdoors'
  | 'Health & Personal Care'
  | 'Automotive'
  | 'Grocery & Gourmet Food'
  | 'Office Products'
  | 'Beauty & Personal Care'
  | 'Pet Supplies'
  | 'Arts, Crafts & Sewing'
  | 'Patio, Lawn & Garden'
  | 'Musical Instruments'
  | 'Industrial & Scientific'
  | 'Baby'
  | 'Collectibles & Fine Art';

export const categoryColors: Record<Categories, MainColor> = {
  Electronics: 'blue',
  Furniture: 'green',
  Clothing: 'red',
  Books: 'purple',
  Services: 'indigo',
  'Home & Kitchen': 'yellow',
  'Toys & Games': 'pink',
  'Sports & Outdoors': 'gray',
  'Health & Personal Care': 'blue',
  Automotive: 'green',
  'Grocery & Gourmet Food': 'red',
  'Office Products': 'purple',
  'Beauty & Personal Care': 'indigo',
  'Pet Supplies': 'yellow',
  'Arts, Crafts & Sewing': 'pink',
  'Patio, Lawn & Garden': 'gray',
  'Musical Instruments': 'blue',
  'Industrial & Scientific': 'green',
  Baby: 'red',
  'Collectibles & Fine Art': 'purple',
};
