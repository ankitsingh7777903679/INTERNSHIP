import { Button, Checkbox, Label, TextInput, Select } from "flowbite-react";
import { useState } from "react";
import { findDimondPrice } from "./api/dimondServer";
import { validationDimondPriceField, validationDimondPriceForm } from "./validation/dimondPriceValidation";

function DimondPrice() {
  const [dimondPrice, setDimondPrice] = useState(null);
  const [error, setError] = useState({})
  const [dimondValue, setDimondValue] = useState({
    shape: "",
    color: "",
    clarity: "",
    size: "",
    weight: "",
  });

  const setFormDimondPrice = (e) => {
    const { id, value } = e.target;
    const updatedValue = { ...dimondValue, [id]: value };
    setDimondValue(updatedValue);

    const fieldError = validationDimondPriceField(id, value);
            setError(prev => ({
                ...prev,
                [id]: fieldError
            }));
  }

  const handelFormDimondPrice = async (e) => {
    e.preventDefault();
    // alert("Dimond Value Submitted");
    console.log("Dimond Value Submitted:", dimondValue);
    const errors = validationDimondPriceForm(dimondValue);
            if (errors) {
                setError(errors);
                console.log("Validation errors:", error);
                // alert("Validation errors. Please check the form fields.");
                return;
            }
    let res = await findDimondPrice(dimondValue);
    console.log("Response from server:", res.total_price);
    setDimondPrice(res.total_price);


  }
  return (
    <div>
      <form onSubmit={handelFormDimondPrice} className="flex w-full flex-col gap-4 bg-gray-500 p-4 rounded-lg">
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
              <Label htmlFor="size">Size</Label>
            </div>
            <TextInput id="size" type="number" min={0} value={dimondValue.size} onChange={(e) => setFormDimondPrice(e)} placeholder="Enter 0.19.."  />
            {error.size && <p className='text-red-300 text-sm mt-1'>{error.size}</p>}
          </div>
          <div>
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="weight">Weight</Label>
            </div>
            <TextInput id="weight" type="number" min={0} value={dimondValue.weight} onChange={(e) => setFormDimondPrice(e)} placeholder="enter 0.29.."  />
            {error.weight && <p className='text-red-300 text-sm mt-1'>{error.weight}</p>}
          </div>
        </div>
        <Button type="submit" className="bg-black">Total Price</Button>

        {dimondPrice !== null && (
          <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-lg text-black font-semibold mb-2">Total Diamond Price:</h2>  
            <p className="text-gray-700">₹{dimondPrice.toFixed(2)}</p>
          </div>
        )}
      </form>
    </div>
  )
}

export default DimondPrice
