import { Button, Checkbox, Label, TextInput, Select } from "flowbite-react";
import { useState } from "react";
import { findDimondPrice } from "./api/dimondServer";

function DimondPrice() {
  const [dimondPrice, setDimondPrice] = useState(null);
  const [dimondValue, setDimondValue] = useState({
    shape: "",
    color: "",
    clarity: "",
    size: "",
    weight: "",
  });

  const handelFormDimondPrice = async (e) => {
    e.preventDefault();
    // alert("Dimond Value Submitted");
    console.log("Dimond Value Submitted:", dimondValue);
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
          <Select id="shape" value={dimondValue.shape} onChange={(e) => setDimondValue({ ...dimondValue, shape: e.target.value })} required>
            <option value="">Select shape</option>
            <option value="round">Round</option>
            <option value="pear">Pear</option>
            <option value="heart">Heart</option>
          </Select>
        </div>
        <div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="color">Color</Label>
            </div>
            {/* <TextInput id="color" value={dimondValue.color} onChange={(e) => setDimondValue({ ...dimondValue, color: e.target.value })} required /> */}
            <Select id="color" value={dimondValue.color} onChange={(e) => setDimondValue({ ...dimondValue, color: e.target.value })} required>
              <option value="">Select color</option>
              <option value="G">G</option>
              <option value="H">H</option>
              <option value="I">I</option>
              <option value="J">J</option>
            </Select>

          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="clarity">Clarity</Label>
            </div>
            {/* <TextInput id="clarity" value={dimondValue.clarity} onChange={(e) => setDimondValue({ ...dimondValue, clarity: e.target.value })} required /> */}
            <Select id="clarity" value={dimondValue.clarity} onChange={(e) => setDimondValue({ ...dimondValue, clarity: e.target.value })} required>
              <option value="">Select clarity</option>
              <option value="SI1">SI1</option>
              <option value="VS1">VS1</option>
              <option value="VVS1">VVS1</option>
              <option value="VVS2">VVS2</option>
            </Select>

          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="size">Size</Label>
            </div>
            <TextInput id="size" type="number" value={dimondValue.size} onChange={(e) => setDimondValue({ ...dimondValue, size: e.target.value })} placeholder="Enter 0.19.." required />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="weight">Weight</Label>
            </div>
            <TextInput id="weight" type="number" value={dimondValue.weight} onChange={(e) => setDimondValue({ ...dimondValue, weight: e.target.value })} placeholder="enter 0.29.." required />
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
