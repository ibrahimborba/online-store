export async function getCategories() {
  // Implemente aqui
  try {
    const requestReturn = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
    const requestObject = await requestReturn.json();
    return requestObject;
  } catch (error) {
    return error;
  }
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  // Implemente aqui! Quando o fizer, descomente os parâmetros que essa função recebe
  try {
    if (!categoryId) {
      const requestReturn = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${query}`);
      const requestObject = await requestReturn.json();
      return requestObject;
    }
    if (!query) {
      const requestReturn = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`);
      const requestObject = await requestReturn.json();
      return requestObject;
    }
    if (categoryId && query) {
      const requestReturn = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`);
      const requestObject = await requestReturn.json();
      return requestObject;
    }
  } catch (error) {
    return error;
  }
}
export async function getDetailsProducts(id) {
  try {
    const requestReturn = await fetch(`https://api.mercadolibre.com/items/${id}`);
    const requestObject = await requestReturn.json();
    return requestObject;
  } catch (error) {
    return error;
  }
}
