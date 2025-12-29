import { Button, Checkbox, Label, TextInput, Select } from "flowbite-react";
import { useState } from "react";
import { addDiamond, findDimondPrice } from "../api/dimondServer";
import { validationDimondPriceField, validationDimondPriceForm } from "../validation/dimondPriceValidation";
import { validationAddDimondField, validationAddDimondForm } from "../validation/addDimondValidation";
import DiamondListTable from "./DiamondListTable";
import { ToastContainer, toast } from 'react-toastify';

function AddDimond() {
  const [dimondPrice, setDimondPrice] = useState(null);
  const [discount, setDiscount] = useState(null);
  const [caratePrice, setCaratePrice] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);
  const [error, setError] = useState({})
  const [dimondValue, setDimondValue] = useState({
    stockId: "",
    shape: "",
    color: "",
    clarity: "",
    weight: "",
    rap: "",
    discount: "",
    pricePerCarat: "",
    amount: ""
  });

  const DiscountPrice = (e) => {
    setDiscount(e.target.value);
    setCaratePrice(null);
    setTotalPrice(null);

  }

  const setFormDimondPrice = (e) => {
    const { id, value } = e.target;
    const updatedValue = { ...dimondValue, [id]: value };
    setDimondValue(updatedValue);

    const fieldError = validationAddDimondField(id, value);
    setError(prev => ({
      ...prev,
      [id]: fieldError
    }));
  }

  const handelFormDimondPrice = async (e) => {
    let DimondPrice = {
      shape: dimondValue.shape,
      color: dimondValue.color,
      clarity: dimondValue.clarity,
      weight: dimondValue.weight
    }
    e.preventDefault();
    console.log("Dimond Value Submitted:", DimondPrice);
    const errors = validationDimondPriceForm(DimondPrice);
    if (errors) {
      setError(errors);
      console.log("Validation errors:", error);
      return;
    }
    let res = await findDimondPrice(DimondPrice);
    console.log("Response from server:", res);
    if (res.status === true) {
    console.log("Response from server:", res.total_price);
    setError('');
    }
    else {
      // alert(res.message);
      toast.error(res.message);
    }
    setDimondPrice(res.total_price);
  }

  const pricePerCarat = () => {
    if (dimondPrice && dimondValue.weight) {
      // let diss = (dimondPrice * discount) / 100;
      let rapPrice = dimondPrice;
      // console.log("Rap Price:", rapPrice);
      let diss = Number(discount);
      // console.log("DiscountType:", typeof diss);

      // console.log("Discount:", diss);
      

      if (diss >= 0) {
        let totalDis = ((rapPrice * diss) / 100);
      // console.log("Total Discount:", totalDis);

      let totalPricePerCar = rapPrice + totalDis
      // console.log("Total Price Per Carat:", totalPricePerCar);
        return setCaratePrice(totalPricePerCar);
      }
      else if (diss <= 0) {
        return setCaratePrice((dimondPrice + ((dimondPrice * discount) / 100)).toFixed(2));
      }
      return null;
    }
  }
  const countTotalPrice = () => {
    if (caratePrice && dimondValue.weight) {
      return setTotalPrice((caratePrice * dimondValue.weight).toFixed(2));
    }
    return null;
  }

  const addDimond = async (e) => {
    e.preventDefault();

    let valuesd = {
      stockId: dimondValue.stockId,
      shape: dimondValue.shape,
      color: dimondValue.color,
      clarity: dimondValue.clarity,
      weight: dimondValue.weight,
      rap: dimondPrice,
      discount: discount,
      pricePerCarat: caratePrice,
      amount: totalPrice
    }
    console.log(valuesd);

    const errors = validationAddDimondForm(valuesd)
    if (errors) {
      setError(errors);
      console.log("Validation errors:", errors);
      toast.error(errors.stockId || errors.shape || errors.color || errors.clarity || errors.weight || errors.rap || errors.discount);
      // alert(errors.stockId || errors.shape || errors.color || errors.clarity || errors.weight || errors.rap || errors.discount);
      return;
    }

    const res = await addDiamond(valuesd)
    console.log("Add Diamond Response from server:", res);
    if (res.status === true) {
      toast.success(res.message);
      // alert(res.message);
      setDimondValue({
        stockId: "",
        shape: "",
        color: "",
        clarity: "",
        weight: "",
        rap: "",
        discount: "",
        pricePerCarat: "",
        amount: ""

      });
      setDimondPrice(null);
      setDiscount(null);
      setCaratePrice(null);
      setTotalPrice(null);
      setError({});
    }
    else {
      alert(res.message);
    }

    // alert("Dimond Added Successfully");
  }

  return (
    <div className="p-2 grid grid-cols-[25%_auto] gap-1.5">

      <div>
        <ToastContainer />
        <h1 className="text-2xl font-bold p-3">Add Dimond</h1>
        <form className="flex max-w-md flex-col gap-4 bg-gray-500 p-4 rounded-lg" onSubmit={(e) => addDimond(e)}>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="stockId">Stock Id</Label>
            </div>
            <TextInput id="stockId" value={dimondValue.stockId} type="text" onChange={(e) => setFormDimondPrice(e)} placeholder="Enter stock id" />
            {error.stockId && <p className='text-red-300 text-sm mt-1'>{error.stockId}</p>}
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="shape">Shape</Label>
            </div>
            <Select id="shape" value={dimondValue.shape} onChange={(e) => setFormDimondPrice(e)} >
              <option value="">Select shape</option>
              <option value="round">Round</option>
              <option value="pear">Pear</option>
              <option value="heart">Heart</option>
            </Select>
            {error.shape && <p className='text-red-300 text-sm mt-1'>{error.shape}</p>}
          </div>
          <div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="color">Color</Label>
              </div>
              <Select id="color" value={dimondValue.color} onChange={(e) => setFormDimondPrice(e)} >
                <option value="">Select color</option>
                <option value="G">G</option>
                <option value="H">H</option>
                <option value="I">I</option>
                <option value="J">J</option>
              </Select>
              {error.color && <p className='text-red-300 text-sm mt-1'>{error.color}</p>}
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="clarity">Clarity</Label>
              </div>
              <Select id="clarity" value={dimondValue.clarity} onChange={(e) => setFormDimondPrice(e)} >
                <option value="">Select clarity</option>
                <option value="SI1">SI1</option>
                <option value="VS1">VS1</option>
                <option value="VVS1">VVS1</option>
                <option value="VVS2">VVS2</option>
              </Select>
              {error.clarity && <p className='text-red-300 text-sm mt-1'>{error.clarity}</p>}
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="weight">Weight</Label>
              </div>
              <TextInput id="weight" type="number" value={dimondValue.weight} onChange={(e) => setFormDimondPrice(e)} placeholder="enter 0.29.." />
              {error.weight && <p className='text-red-300 text-sm mt-1'>{error.weight}</p>}
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="price">RAP</Label>
              </div>
              <div className="grid grid-cols-[70%_auto]">
                <TextInput id="price" type="number" value={dimondPrice || ''} readOnly placeholder="Price will appear here..." />
                <Button onClick={(e) => { handelFormDimondPrice(e) }} className="bg-black ml-2">Find RAP</Button>
              </div>
              {error.rap && <p className='text-red-300 text-sm mt-1'>{error.rap}</p>}
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="addDiscount">Add Discount</Label>
              </div>
              <TextInput id="discount" type="number" value={discount || ''} onChange={(e) => DiscountPrice(e)} placeholder="enter 0.29.." />
              {error.discount && <p className='text-red-300 text-sm mt-1'>{error.discount}</p>}
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="price">PPC</Label>
              </div>
              <div className="grid grid-cols-[70%_auto]">
                <TextInput id="price" type="number" value={caratePrice || ''} readOnly placeholder="Price will appear here..." />
                <Button onClick={() => { pricePerCarat() }} className="bg-black ml-2">PPC</Button>
              </div>
              {error.pricePerCarat && <p className='text-red-300 text-sm mt-1'>{error.pricePerCarat}</p>}
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="totalPrice">Total Price</Label>
              </div>
              <div className="grid grid-cols-[70%_auto]">
                <TextInput id="price" type="number" value={totalPrice || ''} readOnly placeholder="Price will appear here..." />
                <Button onClick={() => { countTotalPrice() }} className="bg-black ml-2">Total Price</Button>
              </div>
              {/* {error.amount && <p className='text-red-300 text-sm mt-1'>{error.amount}</p>} */}
            </div>
          </div>
          <Button type="submit" className="bg-black">Add Dimond</Button>
        </form>
      </div>


      <div>
        <h1 className="text-2xl font-bold p-3"> Dimond List</h1>
        <DiamondListTable addDiamond={addDiamond} />

      </div>
    </div>
  )
}

export default AddDimond
