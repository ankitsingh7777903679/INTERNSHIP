import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { findDimond } from '../api/dimondServer';
import { useEffect } from 'react';
function DimondTable({dimondValue}) {
    const dimondTableRow = ["Shape", "Color", "Clarity", "From", "To", "Price"];
    const [dimondData, setDimondData] = React.useState([]);

    let fetchDimondData = async () => {
        // Fetch data from server (replace with actual API call)
        const response = await findDimond();
        // console.log("Fetched dimond data:", response);
        setDimondData(response.data || []);                                                                                    
        // console.log("Fetch dimond data function called");
    }

    useEffect(() => {
        fetchDimondData();
    }, [dimondValue]);
  return (
    <div>
      <div className="overflow-x-auto rounded-xl">
      <Table>
        <TableHead>
          <TableRow>
            {dimondTableRow.map((header) => (
              <TableHeadCell key={header}>{header}</TableHeadCell>
            ))}
            
          </TableRow>
        </TableHead>
        <TableBody className="divide-y">
            {dimondData.length > 0 ? dimondData.map((dimond, index) => (
                <TableRow key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{dimond.shape}</TableCell>
                    <TableCell>{dimond.color}</TableCell>
            <TableCell>{dimond.clarity}</TableCell>
            <TableCell>{dimond.from}</TableCell>
            <TableCell>{dimond.to}</TableCell>
            <TableCell>₹{dimond.price}</TableCell>
            </TableRow>
            )) : (
                <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">   
            <TableCell colSpan={6} className="text-center text-gray-500 dark:text-gray-400">
                No diamond data available.
            </TableCell>
          </TableRow>
            )}
          
        </TableBody>
      </Table>
    </div>
    </div>
  )
}



export default DimondTable
