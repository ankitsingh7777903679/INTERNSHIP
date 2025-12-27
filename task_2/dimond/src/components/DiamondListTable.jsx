import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { useState } from "react";
import { listDimond } from "../api/dimondServer";
import { useEffect } from "react";

function DiamondListTable({addDiamond}) {
    const [diamondData, setDiamondData] = useState([]);

    useEffect(() => {
        const fetchDiamondData = async () => {
            const data = await listDimond();
            setDiamondData(data.data);
            // console.log("Diamond data fetched:", data);
        };
        fetchDiamondData();
    }, [addDiamond()]); // Re-fetch data when addDiamond changes
   

    return (
        <div>
            <div className="overflow-x-auto rounded">
                <Table striped>
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
                    </TableHead>
                    <TableBody className="divide-y">
                        {diamondData.map((diamondData, index) => {
                            return (
                                <TableRow key={index} className="dark:border-gray-700 dark:bg-gray-800 text-black bg-gray-500">
                                    <TableCell className="whitespace-nowrap font-medium text-gray-900">{diamondData.stockId}</TableCell>
                                    <TableCell>{diamondData.shape}</TableCell>
                                    <TableCell>{diamondData.color}</TableCell>
                                    <TableCell>{diamondData.clarity}</TableCell>
                                    <TableCell>{diamondData.weight}</TableCell>
                                    <TableCell>{diamondData.rap}</TableCell>
                                    <TableCell>{diamondData.discount}</TableCell>
                                    <TableCell>{diamondData.pricePerCarat}</TableCell>
                                    <TableCell>{diamondData.amount}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default DiamondListTable
