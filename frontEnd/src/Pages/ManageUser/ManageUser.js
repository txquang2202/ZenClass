import React, { useState, useEffect } from "react";
import SearchIcon from '@mui/icons-material/Search';
import DataTable from 'react-data-table-component';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteListUserbyID,getAllUsers, blockUserbyID,changestatusbyListuser } from "../../services/adminServices";
import { ToastContainer, toast } from "react-toastify";
import Modal from "react-modal";
import Tooltip from "../../components/Tooltip/Tooltip";

function ManageUser() {
  const columns = [
    {
      name: 'UserName',
      cell: (row) => (
        <>
          <Tooltip text = {userinfor(row)}><div>{row.username}</div></Tooltip>
        </>
      ),
      sortable: true,
      
    },
    {
      name: 'Email',
      selector: row => row.email,
      sortable: true,
    },
    {
      name: 'Status',
      cell: ((row) => {
        if (row.status === "Normal") {
            return <div className="w-[80px] border-solid  border-[1px] p-[5px] pl-[10px] pr-[10px] bg-[#00FF41] text-center">{row.status}</div>;
        } else {
            return <div className="w-[80px] border-solid  border-[1px] p-[5px] pl-[10px] pr-[10px] bg-[#FFCC00] text-center">{row.status}</div>;
        }
      })  
    },
    {
      name:"Action",
      cell: ((row) => {
        if (row.status === "Normal") {
            return (
            <div>
              <button className="w-[80px] mr-[20px] border-solid  border-[1px] p-[5px] pl-[10px] pr-[10px] bg-[#FF0000]" /*onClick={()=>handleBlockUser(row._id,row.username,row.status)}*/ onClick={()=>openModalstatuschange(addUserToListUser(row._id,row.username,row.status))}>Block</button>
              <button className="" /*onClick={()=>handleDeleteUser(row._id,row.username)}*/ onClick={()=>openModalDel(addUserToListUser(row._id,row.username,row.status))}><DeleteIcon/></button>
            </div>);
        } else {
          return (
            <div>
              <button className="w-[80px] mr-[20px] border-solid  border-[1px] p-[5px] pl-[10px] pr-[10px] bg-[#00FF41]" /*onClick={()=>handleBlockUser(row._id,row.username,row.status)}*/ onClick={()=>openModalstatuschange(addUserToListUser(row._id,row.username,row.status))}>Unblock</button>
              <button className="" /*onClick={()=>handleDeleteUser(row._id,row.username)}*/onClick={()=>openModalDel(addUserToListUser(row._id,row.username,row.status))}><DeleteIcon/></button>
            </div>);
        } 
      })
  }
  ]


  const [userlist, setUserlist] = useState("");
  const [search, SetSearch]= useState('');
  const [filter, setFilter]= useState([]);
	const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
  const [selectedRows, setSelectedRows] = React.useState([]);
	const [toggleCleared, setToggleCleared] = React.useState(false);
  const [listUser, setListUser] = React.useState([]);
  const [modalDelIsOpen, setModalDelIsOpen] = useState(false);
  const [modalStatusIsOpen, setModalStatusIsOpen] = useState(false);
  const [dataFile, setDataFile] = useState([]);

  const fetchUserData = async () => {
    try {
      const response = await getAllUsers();
      const userData = response.data.users;
      if (userData) {
        setUserlist(userData);
        setFilter(userData);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);
  
  useEffect(()=>{
    const resultUsername= Object.values(userlist).filter(item =>{
     return item.username.toLowerCase().match(search.toLocaleLowerCase());
    });
    const resultEmail= Object.values(userlist).filter(item =>{
     return item.email.toLowerCase().match(search.toLocaleLowerCase());
    });

    const result = Array.from(new Set(resultUsername.concat(resultEmail)));
    setFilter(result);
  },[search]);

  const handleDeleteUser = async  (user) => {
    const ids = user.map(item => item.id)
    try {
      const response = await deleteListUserbyID(ids);
      if (response.status === 200) {
        toast.success("Users deleted successfully");
        fetchUserData();
        setToggleCleared(!toggleCleared);
      } else {
        toast.error("Failed to delete users");
      }
    } catch (error) {
      console.error("Error deleting users:", error);
    }
    closeModaldel()
    /*if (window.confirm(`Are you sure you want to delete ${username}`)) {
      try {
        const response = await deleteUserbyID(id);
        if (response.status === 200) {
          toast.success(`User ${username} deleted successfully`);
          fetchUserData()
        } else {
          toast.error(`Failed to delete user ${username}`);
        }
      } catch (error) {
        console.error("Error deleting user:", error);
        toast.error(`An error occurred while deleting user ${username}`);
      }
      } else {
      }*/
  };

  const handleBlockUser = async  (user) => {

    const ids = user.map(item => item.id)
    try {
      const response = await changestatusbyListuser(ids);
      if (response.status === 200) {
        toast.success("Users Block successfully");
        fetchUserData();
        setToggleCleared(!toggleCleared);
      } else {
        toast.error("Failed to Block users");
      }
    } catch (error) {
      console.error("Error Block users:", error);
    }
    closeModalstatuschange()
    /*if (window.confirm(`Are you sure you want to block ${username}`)) {
      try {
        const response = await blockUserbyID(id);
        if (response.status === 200) {
          if(status === "Normal"){
            toast.success(`User ${username} blocked successfully`);
          }
          else {
            toast.success(`User ${username} Unblocked successfully`);
          }
          fetchUserData()
          console.log(status);
        } else {
          toast.error(`Failed to block user ${username}`);
        }
      } catch (error) {
        console.error("Error block user:", error);
        toast.error(`An error occurred while block user ${username}`);
      }
      } else {
      }*/
  };

  const tableHeaderstyle={
    headCells:{
        style:{
            fontWeight:"bold",
            fontSize:"14px",
            backgroundColor:"#ccc",
        },
    },
  }

  const handleRowSelected = React.useCallback(state => {
		setSelectedRows(state.selectedRows.map(s => ({ id: s._id, username: s.username, status: s.status})));
	}, []);
  
  const contextActions = React.useMemo(() => {
		return (
      <div >
        <button key="delete" onClick={()=>openModalstatuschange(selectedRows)}  className="w-[150px] mr-[20px]  pt-[5px] pb-[5px] pl-[10px] pr-[10px] bg-[#d7c573]" icon>
          Status change
        </button>
        <button key="delete" onClick={()=>openModalDel(selectedRows)}  className="pt-[5px] pb-[5px] pl-[10px] pr-[10px] bg-[#FF0000]" icon>
          Delete
        </button>
      </div>
      );
    }, [listUser, toggleCleared, fetchUserData]);

  const addUserToListUser = (id, username, status) => {
    return [...listUser, { id, username, status}];
  };
  const clearList = () => {
    setListUser([]);
  };
  const openModalDel = (user) => {
    setListUser(user)
    setModalDelIsOpen(true);
  };

  const closeModaldel = () => {
    setModalDelIsOpen(false);
    clearList();
  };

  const openModalstatuschange = (user) => {
    setListUser(user)
    setModalStatusIsOpen(true);
  };

  const closeModalstatuschange = () => {
    setModalStatusIsOpen(false);
    clearList();
  };



  const userinfor = (user) => {
    return(
      <>
        <div>Username: {user.username}</div>
        <div>Email: {user.email}</div>
        <div>Fullname: {user.fullname}</div>
      </>
    )
  };
  return (
    <>
      <div className="relative  ">
        <div className="flex w-[100%]  justify-between pb-2">
          <h1 className="text-xl">
            User
          </h1>
          <div className="flex items-center relative ">
            <SearchIcon className="absolute ml-[85%] "/>
            <input className=" border-black border-[1px]  p-1 " placeholder="Search User" value={search} onChange={(e)=>SetSearch(e.target.value)}></input>
          </div>
        </div>

        <div className="bg-black">
          <DataTable
            title= " "
            customStyles={ tableHeaderstyle}
            columns={columns}
            data={filter}
            pagination
            paginationResetDefaultPage={resetPaginationToggle} 
            selectableRows
            contextActions={contextActions}
            onSelectedRowsChange={handleRowSelected}
            clearSelectedRows={toggleCleared}
            persistTableHead
          />
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Modal
            isOpen={modalDelIsOpen}
            onRequestClose={closeModaldel}
            contentLabel="Create Class Modal"
            // className="h-36 w-[400px] hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center  md:inset-0  "
            className="h-36 w-[400px] absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 "
            // overlayClassName="overlay"
          >
            <div className="bg-white p-8 rounded-md border-solid border-2 border-gray-200">
              <h2 className="text-2xl font-semibold mb-4">Are you sure Delete?</h2>
              <div className="mb-4">
                <label className="block text-lg font-medium text-gray-600">
                  User:
                </label>
                <ul className="text-sm pl-3">
                {listUser.map((item) => (
                  <li >{item.username}</li>
                ))}
                </ul>
              </div>
              <div className="flex justify-center">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
                  onClick={()=>handleDeleteUser(listUser)}
                >
                  Delete
                </button>
                <button
                  onClick={closeModaldel}
                  className="border border-gray-300 px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </div>
          </Modal>
          <Modal
            isOpen={modalStatusIsOpen}
            onRequestClose={closeModalstatuschange}
            contentLabel="Create Class Modal"
            // className="h-36 w-[400px] hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center  md:inset-0  "
            className="h-36 w-[400px] absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 "
            // overlayClassName="overlay"
          >
            <div className="bg-white p-8 rounded-md border-solid border-2 border-gray-200">
              <h2 className="text-2xl font-semibold mb-4">Are you sure Change status?</h2>
              <div className="mb-4">
                <label className="block text-lg font-medium text-gray-600">
                  User:
                </label>
                <ul className="text-sm pl-3">
                {listUser.map((item) => (
                  <li className="flex justify-between">
                    <div>{item.username}</div>
                    <div className="font-semibold">{item.status}</div>
                  </li>
                ))}
                </ul>
              </div>
              <div className="flex justify-center">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
                  onClick={()=>handleBlockUser(listUser)}
                >
                  Change status
                </button>
                <button
                  onClick={closeModalstatuschange}
                  className="border border-gray-300 px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </div>
          </Modal>
    </>
  );
}

export default ManageUser;
