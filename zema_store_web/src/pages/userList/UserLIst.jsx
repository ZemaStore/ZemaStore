import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import "./UserList.css";
import { Action } from 'history';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import {useState} from "react"


function createData(
  name,
  favorite_music,
  Fan_of,
  habit,
  email,
  
  
  
) {
  return { name, favorite_music, Fan_of, habit, email,  };
}

// function actions (
//   editbtn: 
// )

const rows = [
  createData('Nathnael', 'Regge', 'Dawit Getachew', 'rare', 'zemaStore12@gmail.com',  ),
  createData('Hawultu', 'Waltz', 'Dawit Getachew', 'always', 'zemaStore12@gmail.com', ),
  createData('Henock', 'Ballad', 'Dawit Getachew', 'sometimes', 'zemaStore12@gmail.com', ),
  createData('Menase', 'Ragga_music', 'Dawit Getachew', 'rare', 'zemaStore12@gmail.com', ),
  createData('Solomon', 'Rock', 'Dawit Getachew', 'always', 'zemaStore12@gmail.com', ),
  
  
];
// const handleDelete = () => {
//   const [delete, setDelete] = useState();


//   return (
//     )
// }
 

export default function DenseTable() {

  const [data, setData] =  useState(rows);

  const handleDelete = (id)=> {
    return (
      setData(data.filter(item=>item.id!== id))
    )
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>User Name</TableCell>
            <TableCell  align="right">Email</TableCell>
            <TableCell align="right">Fan_of&nbsp;(artist)</TableCell>
            <TableCell align="right">Habit&nbsp;(g)</TableCell>
            <TableCell align="right">Favorite music</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell className='tbemail' align="right">{row.email}</TableCell>
              <TableCell className='tbemail' align="right">{row.Fan_of}</TableCell>
              <TableCell className='tbemail' align="right">{row.habit}</TableCell>
              <TableCell className='tbemail' align="right">{row.favorite_music}</TableCell>
              
              <TableCell align="right">
                
                  <Link to={"../home/Home"}  >
                  <button onClick={(delet)=> handleDelete()} className='edtbtn' align="right">Delete</button>
                  </Link>
                  <button onClick={()=> alert("clicked!")} className='dltbtn' align="right">Edit</button>
                
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
// import React from 'react'

// export default function UserLIst() {
//   return (
//     <div className='userList'>
//         <table>
//             <thead>
//                 <tr>
//                     <th>Name</th>
//                     <th>Adress</th>
//                     <th>Phone number</th>
//                     <th>email</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 <tr>
                
//                         <td>Nathnael</td>
//                         <td>Solomon</td>
//                         <td>Henock</td>
//                         <td>Hawultu</td>
//                 </tr>
//             </tbody>
//         </table>
//     </div>
//   )
// }
