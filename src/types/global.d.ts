interface ProductInterface {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: ReviewInterface[];
  images: string[];
  thumbnail: string;
}

interface ReviewInterface {
  rating: number;
  comment: string;
  reviewerName: string;
}
