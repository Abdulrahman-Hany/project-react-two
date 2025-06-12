export const productValidation = (product: {title: string; description: string; imageURL: string; price: string;}) => {
  const errors: {title: string; description: string; imageURL: string; price: string} = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
  };
  const validUrl = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif))$/i;
  if(!product.title.trim() || product.title.length < 10 || product.title.length > 50 ){
    errors.title = "product tittle must be beetweeb 10 and 50 chaaracteres"
  }
  if(!product.description.trim() || product.description.length < 10 || product.description.length > 900 ){
    errors.description = "product description must be beetweeb 10 and 900 chaaracteres"
  }
  if (!validUrl.test(product.imageURL.trim())) {
    errors.imageURL = "Please enter a valid image URL";
  }
    if(!product.price.trim() || isNaN(Number(product.price))){
    errors.price = "valid price is not required!"
  }
  return errors;
};
