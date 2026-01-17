import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Pagination, Select, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { deleteDiamond, listDimond, weightRange } from "../api/dimondServer";
import { useEffect } from "react";
import ReactSelect from 'react-select'
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { grey } from '@mui/material/colors';
import DiamondStatus from "./DiamondStatus";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";


function DiamondListTable() {
    const user = JSON.parse(localStorage.getItem("user"));
    // console.log("User:", user);
    const userRole = user?.role || ''
    const userPermissions = user?.permissions || [];
    const hasDiamondEditPermission = userPermissions.includes('Diamond_update') && (userRole === 'user') || (userRole === 'admin');
    const hasDiamondDeletePermission = userPermissions.includes('Diamond_delete') && (userRole === 'user') || (userRole === 'admin');



    const navigate = useNavigate()

    const [weight, setWeight] = useState([]);
    const [weightLimits, setWeightLimits] = useState([]);
    const [amount, setamount] = useState([]);
    const [amountLimits, setAmountLimits] = useState([]);
    const [diamondData, setDiamondData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(5);
    const [shape, setShape] = useState('showAll')
    const [status, setStatus] = useState('showAll')
    const [color, setColor] = useState(['showAll'])
    const [clarity, setClarity] = useState(['showAll'])
    const [searchQuery, setSearchQuery] = useState('');
    // const [weightrange, setWeightRange] = useState();

    // console.log("Selected colors:", color);
    const colorOptions = [
        { value: 'showAll', label: 'Show All' },
        { value: 'G', label: 'G' },
        { value: 'H', label: 'H' },
        { value: 'I', label: 'I' },
        { value: 'J', label: 'J' }
    ]

    const clarityOptions = [
        { value: 'showAll', label: 'Show All' },
        { value: 'SI1', label: 'SI1' },
        { value: 'VS1', label: 'VS1' },
        { value: 'VVS1', label: 'VVS1' },
        { value: 'VVS2', label: 'VVS2' }
    ]

    const customSelectStyles = {
        control: (base) => ({
            ...base,
            backgroundColor: '#364153',
            color: '#000000',
        }),
        singleValue: (base) => ({
            ...base,
            color: '#000000',
        }),
        multiValue: (base) => ({
            ...base,
            backgroundColor: '#4b5563',
        }),
        multiValueLabel: (base) => ({
            ...base,
            color: '#000000',
        }),
        input: (base) => ({
            ...base,
            color: '#000000',
        }),
        placeholder: (base) => ({
            ...base,
            color: '#000000',
        }),
        menu: (base) => ({
            ...base,
            backgroundColor: '#364153',
        }),
        option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected ? '#4b5563' : state.isFocused ? '#9ca3af' : '#364153',
            color: '#000000',
            cursor: 'pointer',
        }),
    }

    const findWeightRange = async () => {
        const res = await weightRange()
        console.log("Weight Range Response:", res);
        // setWeightRange(res);
        setWeightLimits([res.minWeight, res.maxWeight]);
        setWeight([res.minWeight, res.maxWeight]);
        setAmountLimits([res.minAmount, res.maxAmount]);
        setamount([res.minAmount, res.maxAmount]);
        console.log("Weight Range Data:", weight);
        console.log("amount Range Data:", amount);
    }

    const fetchDiamondData = async () => {
        const res = await listDimond({
            page: currentPage,
            limit: 5,
            shape,
            status,
            color: color.length > 0 ? color : undefined,
            clarity: clarity.length > 0 ? clarity : undefined,
            weight,
            amount,
            search: searchQuery
        });
        // console.log(res);
        setDiamondData(res.data);
        if (res.status === true) {
            setTotalPages(res.totalPages);
            if (res.pagination) {
                setTotalPages(res.totalPages);
            }
        }
        // console.log("Diamond data fetched:", data);
    };

    function valuetext(value) {
        return `${value}`;
    }

    const handleWeightChange = (event, newValue) => {
        setWeight(newValue);
    };

    function amountText(amount) {
        return `${amount}`;
    }
    const handleAmountChange = (event, newValue) => {
        setamount(newValue);
    };

    useEffect(() => {
        findWeightRange()
    }, []);

    useEffect(() => {

        // setCurrentPage(1);
        fetchDiamondData();

    }, [currentPage]);

    useEffect(() => {

        setCurrentPage(1);
        fetchDiamondData();


    }, [shape, color, clarity, weight, amount, status, searchQuery]);

    const onDeleteHandel = async (id) => {
        console.log("Delete Diamond with ID:", id);
        let res = await deleteDiamond(id);
        toast.success(res.message);
        console.log("Delete Diamond Response:", res);
        fetchDiamondData();
    }
    const onEditHandel = (id) => {

        navigate(`/add-diamond/${id}`)


        // let diamond = diamondData.find(d => d._id === id);
        // console.log("Edit Diamond:", diamond);
        // setDimondValue(diamond);
        // setDimondPrice(diamond.rap);
        // setDiscount(diamond.discount);
        // setCaratePrice(diamond.pricePerCarat);
        // setTotalPrice(diamond.amount);
        // setDiamondId(id);
    }

    // console.log("Diamond Data:", diamondData.find({ "weight": { "$exists": true } }));

    return (
        <div className="p-4 mt-10 max-w-[1500px] mx-auto">
            {/* <ToastContainer /> */}
            <div className="flex items-center  pb-2 gap-3">
                <div className="w-35">
                    <div className="mb-2 block">
                        <Label htmlFor="search" value="Search" >search</Label>
                    </div>

                    <TextInput
                        id="search"
                        placeholder="Search "
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="w-35">
                    <div className="mb-2 block">
                        <Label htmlFor="shape">Shape</Label>
                    </div>
                    <Select value={shape} onChange={(e) => setShape(e.target.value)} id="shape" required>
                        <option value='showAll'>Show All</option>
                        <option value='round'>round</option>
                        <option value='pear'>pear</option>
                        <option value='heart'>heart</option>

                    </Select>
                    {/* <Select options={options} /> */}
                </div>
                <div className="w-35">
                    <div className="mb-2 block">
                        <Label htmlFor="status">Status</Label>
                    </div>
                    <Select value={status} onChange={(e) => setStatus(e.target.value)} id="status" required>
                        <option value='showAll'>Show All</option>
                        <option value='available'>available</option>
                        <option value='hold'>hold</option>
                        <option value='sold'>sold</option>
                        <option value='deleted'>deleted</option>

                    </Select>
                    {/* <Select options={options} /> */}
                </div>

                <div className="flex  justify-center flex-col">
                    <div className="mb-2 block">
                        <Label htmlFor="color">Color</Label>
                    </div>
                    <ReactSelect
                        options={colorOptions}
                        isMulti
                        value={colorOptions.filter(option => color.includes(option.value))}
                        onChange={(selectedOptions) => {
                            const values = selectedOptions ? selectedOptions.map(opt => opt.value) : [];
                            setColor(values);
                        }}
                        placeholder="colors"
                        className="basic-multi-select"
                        classNamePrefix="select"
                        styles={customSelectStyles}
                    />
                </div>

                <div className="flex  justify-center flex-col">
                    <div className="mb-2 block">
                        <Label htmlFor="clarity">Clarity</Label>
                    </div>
                    <ReactSelect
                        options={clarityOptions}
                        isMulti
                        value={clarityOptions.filter(option => clarity.includes(option.value))}
                        onChange={(selectedOptions) => {
                            const values = selectedOptions ? selectedOptions.map(opt => opt.value) : [];
                            setClarity(values);
                        }}
                        placeholder="clarity"
                        className=""
                        classNamePrefix="select"
                        styles={customSelectStyles}
                    />
                </div>
                <div className="flex  justify-center flex-col ">
                    <div className="mb-2 block">
                        <Label htmlFor="weight">Weight</Label>
                    </div>
                    <div className="px-4 rounded bg-gray-700 flex items-center justify-center flex-col">
                        <Box sx={{ width: 100 }} className="flext items-center justify-center mt-1">
                            {weight.length === 2 && weightLimits.length === 2 && (
                                <Slider className="text-white bg-"
                                    getAriaLabel={() => 'Weight range'}
                                    value={weight}
                                    onChange={handleWeightChange}
                                    valueLabelDisplay="auto"
                                    getAriaValueText={valuetext}
                                    min={weightLimits[0]}
                                    step={Number(((weightLimits[1] - weightLimits[0]) / 100).toFixed(2))}
                                    max={weightLimits[1]}
                                    color={grey[800]}
                                />
                            )}
                        </Box>
                    </div>

                </div>

                <div className="flex  justify-center flex-col ">
                    <div className="mb-2 block">
                        <Label htmlFor="amount">Amount</Label>
                    </div>
                    <div className="px-4 rounded bg-gray-700 flex items-center justify-center flex-col">
                        <Box sx={{ width: 100 }} className="flext items-center justify-center mt-1">
                            {amount.length === 2 && amountLimits.length === 2 && (
                                <Slider className="text-white"
                                    getAriaLabel={() => 'Amount range'}
                                    value={amount}
                                    onChange={handleAmountChange}
                                    valueLabelDisplay="auto"
                                    getAriaValueText={amountText}
                                    min={amountLimits[0]}
                                    max={amountLimits[1]}
                                    step={Number(((amountLimits[1] - amountLimits[0]) / 100).toFixed(2))}
                                    color={grey[500]}
                                />
                            )}
                        </Box>
                    </div>

                </div>

            </div>
            <div className="overflow-x-auto rounded">
                <Table >
                    <TableHead>
                        <TableHeadCell>Stock Id</TableHeadCell>
                        <TableHeadCell>Shape</TableHeadCell>
                        <TableHeadCell>Color</TableHeadCell>
                        <TableHeadCell>clarity</TableHeadCell>
                        <TableHeadCell>weight</TableHeadCell>
                        <TableHeadCell>rap</TableHeadCell>
                        <TableHeadCell>discount</TableHeadCell>
                        <TableHeadCell>pricePerCarat</TableHeadCell>
                        <TableHeadCell>amount</TableHeadCell>
                        {hasDiamondEditPermission && (
                            <>
                                <TableHeadCell>Edit</TableHeadCell>
                            </>
                        )}
                        {hasDiamondDeletePermission && (
                            <>
                                <TableHeadCell>Delete</TableHeadCell>
                            </>
                        )}

                        <TableHeadCell>Status</TableHeadCell>
                    </TableHead>
                    <TableBody className="divide-y">
                        {diamondData.map((diamondData, index) => {
                            const isDeleted = diamondData.status === 'deleted';

                            return (
                                <TableRow key={index} className={`dark:border-gray-700 dark:bg-gray-800  bg-gray-500 ${isDeleted ? 'bg-gray-300 opacity-60' : ''}`}>
                                    <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{diamondData.stockId}</TableCell>
                                    <TableCell>{diamondData.shape}</TableCell>
                                    <TableCell>{diamondData.color}</TableCell>
                                    <TableCell>{diamondData.clarity}</TableCell>
                                    <TableCell>{diamondData.weight}</TableCell>
                                    <TableCell>{diamondData.rap}</TableCell>
                                    <TableCell>{diamondData.discount}</TableCell>
                                    <TableCell>{diamondData.pricePerCarat}</TableCell>
                                    <TableCell>{diamondData.amount}</TableCell>
                                    {hasDiamondEditPermission && (
                                        <>
                                            <TableCell className={`text-blue-500  ${isDeleted ? 'disabled' : 'cursor-pointer'}`} > <button disabled={isDeleted} onClick={() => onEditHandel(diamondData._id)}>Edit</button></TableCell>
                                        </>
                                    )}
                                    {hasDiamondDeletePermission && (
                                        <>
                                            <TableCell className={`text-red-500  ${isDeleted ? 'disabled' : 'cursor-pointer'}`} > <button disabled={isDeleted} onClick={() => onDeleteHandel(diamondData._id)}>{isDeleted ? 'Deleted' : 'Delete'}</button></TableCell>
                                        </>
                                    )}
                                    <TableCell className={!hasDiamondEditPermission ? 'bg-gray-300 opacity-60' : ''}><DiamondStatus diamondDataStatus={diamondData.status} diamondData={diamondData} fetchDiamondData={fetchDiamondData} hasEditPermission={hasDiamondEditPermission} /></TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>

                <div className="flex justify-center mt-4">
                    {totalPages > 1 && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={(page) => setCurrentPage(page)}
                            showIcons
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default DiamondListTable
