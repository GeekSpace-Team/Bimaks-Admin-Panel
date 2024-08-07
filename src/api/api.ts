// api.ts
export const fetchProductsByGroup = async (groupId: number) => {
  const response = await fetch(
    `http://95.85.121.153:5634/product/product-by-group?group=${groupId}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
};
