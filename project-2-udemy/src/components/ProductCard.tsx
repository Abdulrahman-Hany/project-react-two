import type { IProduct } from "../interfaces";
import { textSlicers } from "../utils/funcionsDesc";
import CircelColor from "./CircelColor";
import Image from "./Image";
import Button from "./ui/Button";
interface Iprops {
  product: IProduct;
  setProductToEdit: (product: IProduct) => void;
  openEditModal: () => void;
  setProductToEditIdx: (value: number) => void;
  openConFirmModal: () => void;
  idx: number;
}
const ProductCard = ({
  product,
  setProductToEdit,
  openEditModal,
  idx,
  setProductToEditIdx,
  openConFirmModal,
}: Iprops) => {
  const { title, imageURL, description, price, colors, category } = product;

  const renderProuductColors = colors.map((color) => (
    <CircelColor key={color} color={color} />
  ));
  const onEdit = () => {
    setProductToEdit(product);
    openEditModal();
    setProductToEditIdx(idx);
  };
  const onRemove = () => {
    setProductToEdit(product);
    openConFirmModal();
  };
  const formatPrice = (price: number | string): string => {
    const numericPrice = typeof price === "string" ? parseFloat(price) : price;
    return `$${numericPrice.toLocaleString()}`;
  };

  return (
    <div className="max-w-sm md:max-w-lg md:mx-3 border rounded-md p-2 flex flex-col justify-between space-y-3">
      <Image
        imgURL={imageURL}
        alt={"prouduact Namme"}
        className="rounded-md h-52 w-full lg:object-cover"
      />
      <h3 className="text-lg font-medium my-2">{title}</h3>
      <p className="text-sm text-gray-500 break-words ">
        {textSlicers(description)}
      </p>
      <div className="flex items-center flex-wrap space-x-1">
        {renderProuductColors}
      </div>
      <div className="flex items-center justify-between">
        <span className="text-blue-600 text-lg font-semibold">
          {formatPrice(price)}
        </span>
        <div className="flex items-center gap-2">
          <Image
            imgURL={category.imageURL}
            alt={category.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="text-xl">{category.name}</span>
        </div>
      </div>
      <div className="flex items-center justify-between mt-3 mb-2 space-x-2 ">
        <Button className="bg-blue-700 w-full" onClick={onEdit}>
          Edit
        </Button>
        <Button className="bg-red-700 w-full" onClick={onRemove}>
          Remove
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
