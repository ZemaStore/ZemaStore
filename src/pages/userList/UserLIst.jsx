// import * as React from 'react';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';

// function createData(
//   name: string,
//   favorite_music: string,
//   Fan_of: string,
//   habit: string,
//   email: number,
// ) {
//   return { name, favorite_music, Fan_of, habit, email, edit, delete };
// }

// const rows = [
//   createData('Nathnael', 'Regge', 'Dawit Getachew', 'rare', 'zemaStore12@gmail.com'),
//   createData('Hawultu', 'Waltz', 'Dawit Getachew', 'always', 'zemaStore12@gmail.com'),
//   createData('Henock', 'Ballad', 'Dawit Getachew', 'sometimes', 'zemaStore12@gmail.com'),
//   createData('Menase', 'Ragga_music', 'Dawit Getachew', 'rare', 'zemaStore12@gmail.com'),
//   createData('Solomon', 'Rock', 'Dawit Getachew', 'always', 'zemaStore12@gmail.com'),
// ];

// export default function DenseTable() {
//   return (
//     <TableContainer component={Paper}>
//       <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
//         <TableHead>
//           <TableRow>
//             <TableCell>User Name</TableCell>
//             <TableCell align="right">Email</TableCell>
//             <TableCell align="right">Fan_of&nbsp;(artist)</TableCell>
//             <TableCell align="right">Habit&nbsp;(g)</TableCell>
//             <TableCell align="right">Favorite music</TableCell>
//             <TableCell align="right">Favorite music</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {rows.map((row) => (
//             <TableRow key={row.name}
//               sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//             >
//               <TableCell component="th" scope="row">
//                 {row.name}
//               </TableCell>
//               <TableCell align="right">{row.email}</TableCell>
//               <TableCell align="right">{row.Fan_of}</TableCell>
//               <TableCell align="right">{row.habit}</TableCell>
//               <TableCell align="right">{row.favorite_music}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//       <div>
//       <button className='edtbtn'> Edit</button>
//       <button className='dltbtn'> Delete</button>
//       </div>
//     </TableContainer>
//   );
// }