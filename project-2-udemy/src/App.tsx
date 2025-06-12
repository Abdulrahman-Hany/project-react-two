import { useState, type ChangeEvent, type FormEvent } from "react";
import ProductCard from "./components/ProductCard";
import Modal from "./components/ui/Modal";
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";
import { categories, colors, formInputsList, productList } from "./data";
import type { IProduct } from "./interfaces";
import { productValidation } from "./validation";
import ErrorMessage from "./components/Erorr.masage";
import CircelColor from "./components/CircelColor";
import { v4 as uuid } from "uuid";
import Select from "./components/ui/Select";
import type { prouduactName } from "./types";
import toast, { Toaster } from "react-hot-toast";


function App() {
  const defaultProductObj = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: [],
    category: {
      name: "",
      imageURL: "",
    },
  };

  const [products, setProducts] = useState<IProduct[]>(productList);
  let [isOpen, setIsOpen] = useState(false);
  let [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [productToEditIdx, setProductToEditIdx] = useState<number>(0);
  const [product, setProduct] = useState<IProduct>(defaultProductObj);
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
  const [productToEdit, setProductToEdit] =
    useState<IProduct>(defaultProductObj);
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    imageURL: "",
    price: "",
  });
  const [tempColors, setTempColor] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);
  const closeEditModal = () => setIsOpenEditModal(false);
  const openEditModal = () => setIsOpenEditModal(true);
  const openConFirmModal = () => setIsOpenConfirmModal(true);
  const closeConfirmModal = () => setIsOpenConfirmModal(false);

  const onchangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setProduct({ ...product, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const onchangeEditHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setProductToEdit({ ...productToEdit, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };
  
  const onCancel = () => {
    setProduct(defaultProductObj);
    closeEditModal();
  };

  const removePruductHandler = () => {
    const filtered = products.filter(product => product.id !== productToEdit.id);
    setProducts(filtered);
    closeConfirmModal();
    toast("Product has been deleted successfully!", {
      icon: "👏",
      style: {
        backgroundColor: "#c2344d",
        color: "white",
      },
    });
  };

  const submitHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const errors = productValidation(product);
    const hasErrors =
      Object.values(errors).some((value) => value == "") &&
      Object.values(errors).every((value) => value == "");
    if (hasErrors) {
      setErrors(errors);
      return;
    }

    const newProduct = {
      ...product,
      id: uuid(),
      colors: tempColors,
      category: selectedCategory,
    };

    setProducts((prev) => [newProduct, ...prev]);
    setProduct(defaultProductObj);
    setTempColor([]);
    closeModal();
  };

  const submitEditHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const errors = productValidation(productToEdit);
    const hasErrors =
      Object.values(errors).some((value) => value == "") &&
      Object.values(errors).every((value) => value == "");
    if (hasErrors) {
      setErrors(errors);
      return;
    }

    const updatedProduct = {
      ...productToEdit,
      colors: [...new Set([...productToEdit.colors, ...tempColors])],
    };

    const updatedProducts = [...products];
    updatedProducts[productToEditIdx] = updatedProduct;
    setProducts(updatedProducts);

    setProductToEdit(defaultProductObj);
    setTempColor([]);
    closeEditModal();
  };

  const renderProductList = products.map((product, idx) => (
    <ProductCard
      key={product.id}
      product={product}
      setProductToEdit={setProductToEdit}
      openEditModal={openEditModal}
      openConFirmModal={openConFirmModal}
      idx={idx}
      setProductToEditIdx={setProductToEditIdx}
    />
  ));

  const renderFormInputList = formInputsList.map((input) => (
    <div className="flex flex-col" key={input.id}>
      <label
        htmlFor={input.id}
        className="mb-[2px] text-sm font-medium text-gray-700"
      >
        {input.label}
      </label>
      <Input
        type="text"
        id={input.id}
        name={input.name}
        value={product[input.name]}
        onChange={onchangeHandler}
      />
      <ErrorMessage msg={errors[input.name]} />
    </div>
  ));

  const renderProuductColors = colors.map((color) => (
    <CircelColor
      key={color}
      color={color}
      onClick={() => {
        const isInTemp = tempColors.includes(color);
        const isInProduct = productToEdit.colors.includes(color);

        if (isInTemp) {
          setTempColor((prev) => prev.filter((item) => item !== color));
        } else if (isInProduct) {
          setProductToEdit((prev) => ({
            ...prev,
            colors: prev.colors.filter((item) => item !== color),
          }));
        } else {
          setTempColor((prev) => [...prev, color]);
        }
      }}
    />
  ));

  const renderProductEditWithErorrFunction = (
    id: string,
    label: string,
    name: prouduactName
  ) => (
    <div className="flex flex-col">
      <label
        htmlFor={id}
        className="mb-[2px] text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <Input
        type="text"
        id={id}
        name={name}
        value={productToEdit[name]}
        onChange={onchangeEditHandler}
      />
      <ErrorMessage msg={errors[name]} />
    </div>
  );

  return (
    <main className="container mx-auto flex flex-col items-center my-10">
      <Button
        className="w-1/3 bg-indigo-700 hover:bg-indigo-800 my-5"
        onClick={openModal}
      >
        Add product
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center gap-y-6">
        {renderProductList}
      </div>

      {/* ADD MODAL */}
      <Modal isOpen={isOpen} closeModal={closeModal} title="Add New Product">
        <form className="space-y-3" onSubmit={submitHandler}>
          {renderFormInputList}
          <Select
            selected={selectedCategory}
            setSelected={setSelectedCategory}
          />
          <div className="flex items-center flex-wrap space-x-1">
            {renderProuductColors}
          </div>
          <div className="flex items-center flex-wrap space-x-1">
            {tempColors.map((color) => (
              <span
                className="p-1 mr-1 mb-1 text-xs rounded-md text-white"
                style={{ backgroundColor: color }}
                key={color}
              >
                {color}
              </span>
            ))}
          </div>
          <div className="flex items-center space-x-3">
            <Button className="bg-blue-700 hover:bg-indigo-800 w-full">Submit</Button>
            <Button
              className="bg-gray-300 hover:bg-gray-600 w-full"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>

      {/* EDIT MODAL */}
      <Modal
        isOpen={isOpenEditModal}
        closeModal={closeEditModal}
        title="Edit This Product"
      >
        <form className="space-y-3" onSubmit={submitEditHandler}>
          {renderProductEditWithErorrFunction(
            "title",
            "Product Title",
            "title"
          )}
          {renderProductEditWithErorrFunction(
            "description",
            "Product Description",
            "description"
          )}
          {renderProductEditWithErorrFunction(
            "imageURL",
            "Product ImageURL",
            "imageURL"
          )}
          {renderProductEditWithErorrFunction(
            "price",
            "Product Price",
            "price"
          )}
          <Select
            selected={productToEdit.category}
            setSelected={(value) =>
              setProductToEdit({ ...productToEdit, category: value })
            }
          />
          <div className="flex items-center flex-wrap space-x-1">
            {renderProuductColors}
          </div>

          <div className="flex items-center flex-wrap space-x-1">
            {[...new Set([...productToEdit.colors, ...tempColors])].map(
              (color) => (
                <span
                  key={color}
                  className="p-1 mr-1 mb-1 text-xs rounded-md text-white"
                  style={{ backgroundColor: color }}
                >
                  {color}
                </span>
              )
            )}
          </div>

          <div className="flex items-center space-x-3">
            <Button className="bg-blue-700 hover:bg-indigo-800 w-full">Submit</Button>
            <Button
              className="bg-gray-300 hover:bg-gray-600 w-full"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>

      <Modal
      isOpen={isOpenConfirmModal}
      closeModal={closeConfirmModal}
      title="Are you sure you want to remove this Product from your Store?"
      description="Deleting this product will remove it permanently from your inventory. Any associated data, sales history, and other related information will also be deleted. Captured screenshot - this is the intended action."
    >
      <div className="flex items-center space-x-3">
        <Button
          className="bg-[#c2344d] hover:bg-red-800"
          onClick={removePruductHandler}
        >
          Yes, remove
        </Button>
        <Button
          className="bg-[#f5f5fa] hover:bg-gray-300 text-black"
          onClick={closeConfirmModal}
        >
          Cancel
        </Button>
      </div>
    </Modal>
    <Toaster />
    </main>
  );
}

export default App;
