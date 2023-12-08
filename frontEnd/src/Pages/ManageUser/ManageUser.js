import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import SearchIcon from '@mui/icons-material/Search';
import DataTable from 'react-data-table-component';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteUserbyID,deleteListUserbyID,getAllUsers, blockUserbyID } from "../../services/adminServices";
import { ToastContainer, toast } from "react-toastify";

function ManageUser() {
  const columns = [
    {
      name: 'UserName',
      selector: row => row.username
    },
    {
      name: 'Email',
      selector: row => row.email
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
              <button className="w-[80px] mr-[20px] border-solid  border-[1px] p-[5px] pl-[10px] pr-[10px] bg-[#FF0000]" onClick={()=>handleBlockUser(row._id,row.username,row.status)}>Block</button>
              <button className="" onClick={()=>handleDeleteUser(row._id,row.username)}><DeleteIcon/></button>
            </div>);
        } else {
          return (
            <div>
              <button className="w-[80px] mr-[20px] border-solid  border-[1px] p-[5px] pl-[10px] pr-[10px] bg-[#00FF41]" onClick={()=>handleBlockUser(row._id,row.username,row.status)}>Unblock</button>
              <button className="" onClick={()=>handleDeleteUser(row._id,row.username)}><DeleteIcon/></button>
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
  const [listIdDelete, setListIdDelete] = React.useState([]);

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

  const handleDeleteUser = async  (id, username) => {
    if (window.confirm(`Are you sure you want to delete ${username}`)) {
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
      }
  };

  const handleBlockUser = async  (id, username, status) => {
    if (window.confirm(`Are you sure you want to block ${username}`)) {
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
      }
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
		setSelectedRows(state.selectedRows);
    setListIdDelete(state.selectedRows.map(s=>s._id))
	}, []);
  
  const contextActions = React.useMemo(() => {
		const handleDelete = async  () => {
			if (window.confirm(`Are you sure you want to delete this list?`)) {
        try {
          const response = await deleteListUserbyID(listIdDelete);
          if (response.status === 200) {
            toast.success("Users deleted successfully");
            fetchUserData();
            setToggleCleared(!toggleCleared);
          } else {
            toast.error("Failed to delete users");
          }
        } catch (error) {
          console.error("Error deleting users:", error);
          alert("An error occurred while deleting users");
          console.log(error.response.data);
        }
			}
		};
		return (
			<button key="delete" onClick={handleDelete} className="pt-[5px] pb-[5px] pl-[10px] pr-[10px] bg-[#FF0000]" icon>
				Delete
			</button>
      );
    }, [listIdDelete, toggleCleared, fetchUserData]);


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
    </>
  );
}

export default ManageUser;
