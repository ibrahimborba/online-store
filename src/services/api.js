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
    let requestObject = {};
    if (!categoryId) {
      const requestReturn = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${query}`);
      requestObject = await requestReturn.json();
    }
    if (!query) {
      const requestReturn = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`);
      requestObject = await requestReturn.json();
    }
    if (categoryId && query) {
      const requestReturn = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`);
      requestObject = await requestReturn.json();
    }
    return requestObject;
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
