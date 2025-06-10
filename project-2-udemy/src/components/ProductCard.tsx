import type { IProduct } from "../interfaces";
import { textSlicers } from "../utils/funcionsDesc";
import Image from "./Image";
import Button from "./ui/Button";
interface Iprops {
    product: IProduct;
}
function ProductCard({product: {title ,imageURL,description,price}}: Iprops) {
  return (
    <div className="max-w-sm md:max-w-lg md:mx-3 border rounded-md p-2 flex flex-col justify-between space-y-3">
      <Image imgURL={imageURL} alt={"prouduact Namme"} className="rounded-md h-52 w-full lg:object-cover"/>
      <h3 className="text-lg font-medium my-2">{title}</h3>
      <p className="text-sm text-gray-500 break-words ">
        {textSlicers(description)}
      </p>
      <div className="flex items-center my-4 gap-4">
        <span className="w-5 h-5 bg-indigo-600 rounded-full cursor-pointer"></span>
        <span className="w-5 h-5 bg-red-600 rounded-full cursor-pointer"></span>
        <span className="w-5 h-5 bg-yellow-500 rounded-full cursor-pointer"></span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-blue-600 text-lg font-semibold">${price}</span>
        <div className="flex items-center gap-2">
          <Image
            imgURL={imageURL}
            alt={"prouduact Namme"}
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="text-xl">Car</span>
        </div>
      </div>
      <div className="flex items-center justify-between mt-3 mb-2 space-x-2">
        <Button className="bg-blue-700" onClick={() => {console.log("center")}}>DEIT</Button>
        <Button className="bg-red-700">DELLET</Button>
      </div>
    </div>
  );
}

export default ProductCard;
