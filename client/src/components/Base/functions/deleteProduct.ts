// deleteProduct.ts
import axios from 'axios';

export const deleteProduct = async (
  productId: string,
  token?: string | null
) => {
  try {
    const response = await axios.delete(
      `http://localhost:8080/api/product/delete/${productId}`,
      {
        headers: token ? { 'x-access-token': token } : {},
      }
    );
    if (response.status === 200) {
      alert('Product deleted successfully');
    }
  } catch (error: any) {
    console.error('Failed to delete product', error);
    if (error.response) {
      alert(`Failed to delete product: ${error.response.data.message}`);
    }
  }
};
