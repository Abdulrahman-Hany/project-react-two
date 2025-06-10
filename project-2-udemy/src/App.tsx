import { useState } from "react";
import ProductCard from "./components/ProductCard";
import Modal from "./components/ui/Modal";
import { productList } from "./data";
import { Button } from "@headlessui/react";

function App() {
  // STATE
  let [isOpen, setIsOpen] = useState(true);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  //runder
  const renderProductList = productList.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));
  return (
    <main className="container mx-auto ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center gap-y-6">
        {renderProductList}
      </div>
      <Modal isOpen={isOpen} closeModal={closeModal} title="Add New Product">
       <div className="flex items-center space-x-3">
        <Button className="bg-blue-700 hover:bg-indigo-800">Submit</Button>
        <Button className="bg-gray-300 hover:bg-gray-600">Cancel</Button>
       </div>
      </Modal>
    </main>
  );
}

export default App;
