export const productId = async () => {
  try {
    const response = await fetch('http://3.223.25.80:8080/rentole-api/api/Product/GetProductIds', {
      method: "GET",
    })
    const result = await response.json()
    return result
  } catch (error) {
    console.log(error)
  }
}


export const productData = async (id) => {
  try {
    const response = await fetch(`http://3.223.25.80:8080/TestAPI/api/Product/GetProductDetailById?ProductId=${id}`, {
      method: "GET",
    })
    const result = await response.json()
    return result
  } catch (error) {
    console.log(error)
  }
}