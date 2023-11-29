import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import SearchIcon from '@mui/icons-material/Search';
import DataTable from 'react-data-table-component';
import DeleteIcon from '@mui/icons-material/Delete';

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
            return <div className="w-[80px] border-solid  border-[1px] p-[5px] pl-[10px] pr-[10px] bg-[#FF0000] text-center">{row.status}</div>;
        }
      })
    },
    {
      name:"Action",
      cell: ((row) => {
        if (row.status === "Normal") {
            return (
            <div>
              <button className="w-[80px] mr-[20px] border-solid  border-[1px] p-[5px] pl-[10px] pr-[10px] bg-[#FF0000]" >Block</button>
              <button className="" ><DeleteIcon/></button>
            </div>);
        } else {
          return (
            <div>
              <button className="w-[80px] mr-[20px] border-solid  border-[1px] p-[5px] pl-[10px] pr-[10px] bg-[#FF0000]" >Unblock</button>
              <button className="" ><DeleteIcon/></button>
            </div>);
        }
      })
      /*cell:(row)=>(
          <div>
            <button className="mr-[20px] border-solid  border-[1px] p-[5px] pl-[10px] pr-[10px] bg-[#FF0000]" >Block</button>
            <button className="" ><DeleteIcon/></button>
          </div>
      )*/
  }
  ]


  const [userlist, setUserlist] = useState("");
  const [search, SetSearch]= useState('');
  const [filter, setFilter]= useState([]);
  const [filterText, setFilterText] = React.useState('');
	const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);


  useEffect(() => {
    const fetchUserData = async () => {

        const response = await axios.get(
          `http://localhost:8080/api/v1/getallusers`
        );
        const userData = response.data.users;
        if (userData) {
          setUserlist(userData);
          setFilter(userData);
        }

    };

    fetchUserData();
  }, []);
  
	console.log(filter)
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

        <DataTable
          columns={columns}
          data={filter  }
          pagination
          paginationResetDefaultPage={resetPaginationToggle} 
          subHeader
          selectableRows
          persistTableHead
        />
      </div>
    </>
  );
}

export default ManageUser;
