import {
    Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow,
    Button, Checkbox, Label, Modal, ModalBody, ModalHeader, TextInput, Select

} from "flowbite-react";

import { getAllUser, updateUserPermission } from "../api/authServer";
import { useEffect, useState } from "react";

function UserListTable() {
    const Permissions = {
        DIAMOND_READ: 'Diamond_read',
        DIAMOND_WRITE: 'Diamond_write',
        DIAMOND_DELETE: 'Diamond_delete',
        DIAMOND_UPDATE: 'Diamond_update',
        STONEGROUP_READ: 'stoneGroup_read',
        STONEGROUP_WRITE: 'stoneGroup_write',
        STONEGROUP_DELETE: 'stoneGroup_delete',
        STONEGROUP_UPDATE: 'stoneGroup_update'
    }
    const userStatus = [
        {v:'active', label:'Active'},
        {v:'deleted', label:'Deleted'}
    ]
    const [openModal, setOpenModal] = useState(false);
    const [userData, setUserData] = useState([])
    const [selectedUser, setSelectedUser] = useState({
        _id: '',
        username: "",
        email: "",
        status: '',
        permissions: []
    })

    const users = async () => {
        const res = await getAllUser()
        setUserData(res.data)

    }
    // console.log(userData)

    useEffect(() => {
        users()
    }, [])

    const handelEditeClick = (user) => {
        setSelectedUser(user);
        setOpenModal(true);
    }


    // 4. Handle Checkbox Toggle
    const togglePermission = (permValue) => {
        let currentPerms = [...selectedUser.permissions];

        if (currentPerms.includes(permValue)) {
            // If exists, remove it (Uncheck)
            currentPerms = currentPerms.filter(p => p !== permValue);
        } else {
            // If not exists, add it (Check)
            currentPerms.push(permValue);
        }

        // Update local state for immediate UI feedback
        setSelectedUser({ ...selectedUser, permissions: currentPerms });
    };

    const handelUpdate = async () => {
        // console.log("Updating Permissions for User ID:", selectedUser._id);
        // console.log("Updated Permissions for User:", selectedUser);

        const res = await updateUserPermission(selectedUser._id, { permissions: selectedUser.permissions, status: selectedUser.status });
        // console.log("Update Response:", res);
        // Refresh user list to reflect changes
        console.log(res);
        if (res.status === true) {
            alert("User permissions updated successfully");
            users();
            setOpenModal(false);
        } else {
            alert("Failed to update user permissions");
        }

    }


    return (
        <>
            <div className="overflow-x-auto p-6 mt-8 rounded-xl max-w-[1200px] mx-auto">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableHeadCell>UserName</TableHeadCell>
                            <TableHeadCell>Email</TableHeadCell>
                            <TableHeadCell>Role</TableHeadCell>
                            <TableHeadCell>Permissions</TableHeadCell>
                            <TableHeadCell>Status</TableHeadCell>
                            <TableHeadCell>
                                <span className="sr-only">Edit</span>
                            </TableHeadCell>
                        </TableRow>
                    </TableHead>

                    <TableBody className="divide-y">
                        {userData.map((user, index) => {
                            return (
                                <TableRow key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {user.username}
                                    </TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell> {user.role} </TableCell>
                                    <TableCell className="flex gap-2 flex-wrap "> 
                                        {/* {Array.isArray(user.permissions) ? <p className="">{user.permissions.join(", ")}</p> : "No permissions"}  */}
                                        {user.permissions?.map((perm) => {
                                        return (
                                            <p key={perm} className="flex items-center px-1 text-black bg-amber-50 border-white border-1 rounded-lg">  {perm}  </p>
                                        )
                                    })}
                                        </TableCell>
                                    <TableCell >
                                        <p className={` px-2 rounded-xl text-center ${user.status === 'active' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'} `}>{user.status}</p>
                                    </TableCell>
                                    
                                    <TableCell>
                                        <a onClick={() => handelEditeClick(user)} className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                                            Edit
                                        </a>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </div>




            <Modal className="" show={openModal} size="md" onClose={() => setOpenModal(true)} popup>
                
                <ModalBody className="border-white border-1 rounded-lg p-6 ">
                    <div className="text-center ">
                        {/* User Info (Read Only) */}
                        <div className="grid grid-cols-2 gap-4 ">
                            <div>
                                <Label value="Username" />
                                <TextInput className="border-white border-1 rounded-lg" value={selectedUser.username} readOnly color="gray" />
                            </div>
                            <div>
                                <Label value="Email" />
                                <TextInput className="border-white border-1 rounded-lg" value={selectedUser.email} readOnly color="gray" />
                            </div>

                            <div>
                                <Label value="Status" />
                                <select value={selectedUser.status} onChange={(e) => setSelectedUser({ ...selectedUser, status: e.target.value })}className="text-white rounded-lg flex bg-gray-700 w-full" required>
                                    {
                                    userStatus?.map((status) => (
                                        <option key={status.v} value={status.v}>{status.v}</option>
                                    ))
                                }
                                </select>
                                
                            </div>
                        </div>

                        {/* Permissions Checkboxes */}
                        <div>
                            <Label className="mb-2 block text-lg" value="Manage Permissions" />
                            <div className="grid grid-cols-2 gap-4 p-4 border rounded-lg bg-gray-50 dark:bg-gray-700">
                                {Object.values(Permissions).map((perm) => (
                                    <div key={perm} className="flex items-center gap-2">
                                        <Checkbox
                                            id={perm}
                                            // Checked if permission exists in selectedUser.permissions array
                                            checked={selectedUser.permissions.includes(perm)}
                                            onChange={() => togglePermission(perm)}
                                        />
                                        <Label htmlFor={perm} className="cursor-pointer">
                                            {perm}
                                        </Label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-center gap-4 mt-2">
                            <Button color="red" onClick={() => setOpenModal(false)}>
                                cancle
                            </Button>
                            <Button color="alternative" onClick={() => handelUpdate()}>
                                update
                            </Button>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </>

    )
}

export default UserListTable
