export type Product = {
  _id: string;
  name: string;
  description: string;
  category: string;
  images: string[];
  tags: string[];
  owner: string;
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
