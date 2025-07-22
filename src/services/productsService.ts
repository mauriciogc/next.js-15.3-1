// services/productsService.ts

const FAKE_API_URL = process.env.NEXT_PUBLIC_FAKE_STORE_BASE_URL;

export type Product = {
  id: string;
  title: string;
  image: string;
  price: number;
  description: string;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
};

type ProductsResponse = {
  results: Product[];
};

export async function fetchProducts(): Promise<ProductsResponse> {
  try {
    const res = await fetch(`${FAKE_API_URL}/products`);
    if (!res.ok) throw new Error('Failed to fetch products');
    const data = await res.json();
    return { results: data };
  } catch (error) {
    console.error('Error fetchProducts:', error);
    throw error;
  }
}
