export type Product = {
  _id: string;
  name: string;
  description: string;
  category: string;
  images: string[];
  tags: string[];
  location: string;
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type Category = {
  id: string;
  name: string;
};
