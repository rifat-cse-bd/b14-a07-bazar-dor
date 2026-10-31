const API_URL = "https://openapi.programming-hero.com/api/bazardor";

async function getJson(path) {
  "use cache";
  const res = await fetch(`${API_URL}${path}`);
  if (!res.ok) return null;
  return res.json();
}

export async function getCategories() {
  return (await getJson("/categories")) ?? [];
}

export async function getCategory(slug) {
  return getJson(`/categories/${encodeURIComponent(slug)}`);
}

export async function getProducts() {
  return (await getJson("/products")) ?? [];
}

export async function getProductsByCategory(slug) {
  return (await getJson(`/products?category=${encodeURIComponent(slug)}`)) ?? [];
}

// The API only looks up products by id, so find the slug in the full list
export async function getProductBySlug(slug) {
  const products = await getProducts();
  return products.find((product) => product.slug === slug) ?? null;
}
