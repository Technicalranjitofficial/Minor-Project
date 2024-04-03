"use client"
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableInfo } from '@/interfaces';
import { useAppDispatch, useAppSelector } from '@/Redux/hooks';
import { acceptUser, deleteUser } from '@/utils/functions';
import { setDisplayMessage, setLoading, setLoadingIndex, setMessage } from '@/Redux/reducers/sectionswap';
import { useSession } from 'next-auth/react';
import { acceptSwapRequest, deleteSwapByAdmin } from '@/ServerActions/actions';
import { loadToast, updateToast } from '@/utils/tostify';

export default function BasicTable() {
  const myData = useAppSelector((state) => state.sectionSwap.mydata);
  const loading = useAppSelector((state) => state.sectionSwap.loading);
  const LoadingIndex = useAppSelector((state) => state.sectionSwap.loadingIndex);
  const data = useAppSelector((state) => state.sectionSwap.tableInfo);
  const dispatch = useAppDispatch();
  const session = useSession();
  return (
    <TableContainer className='border-2 rounded-[5px]' sx={{ backgroundColor: "#151515", color: "wheat" }} color='white' component={Paper} >
      <Table sx={{ minWidth: 650 }} aria-label="simple table" >
        <TableHead>
          <TableRow sx={{ color: "white", backgroundColor: "#1F2937" }}  >
            <TableCell sx={{ color: "white", fontWeight: "bold", fontFamily: "sans-serif" }} >Requested Name</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", fontFamily: "sans-serif" }} align="left">Email</TableCell>

            <TableCell sx={{ color: "white", fontWeight: "bold", fontFamily: "sans-serif" }} align="left">Alloted</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", fontFamily: "sans-serif" }} align="left">looking For</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", fontFamily: "sans-serif" }} align="left">Accept Request </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

          {data.map((v, index) => (

            <TableRow
              key={index}
              className='text-gray-600'
              sx={{ '&:last-child td, &:last-child th': { border: 0, } }}
            >
              <TableCell className='text-gray-300' sx={{ color: "white" }} align='left' component="th" scope="row">
                {v.name}
              </TableCell>
              <TableCell className='text-gray-300' sx={{ color: "white" }} align="left">{v.email}</TableCell>

              <TableCell className='text-gray-300' sx={{ color: "white" }} align="left">{v.alloted}</TableCell>
              <TableCell className='text-gray-300' sx={{ color: "white" }} align="left">{v.lookingFor.join(",")}</TableCell>
              <TableCell className='text-gray-300' sx={{ color: "white" }} align="left">
                {v.remoteUser ? <button disabled className='bg-cyan-900 rounded-md text-white px-4 py-2 '>Matched: {v.remoteUser.name}</button> : myData.id === v.id ? <button disabled className='bg-green-900 text-white disabled:bg-gray-600 rounded-md px-4 py-2'>You</button> :


                  <>

                    {myData.branch === v.branch && myData.Semester === v.Semester && (myData.lookingFor.includes(v.alloted) && v.lookingFor.includes(myData.alloted)) ?

                      <button onClick={async () => {
                        if (myData.alloted == 0) {
                          dispatch(setMessage({ msg: "Create your match first,If you have already created then refresh first and try again!", type: "warning" }));
                          dispatch(setDisplayMessage(true));
                          return;

                        }

                        if (v.lookingFor.includes(myData.alloted) && myData.lookingFor.includes(v.alloted)) {
                          dispatch(setLoadingIndex(index));
                          dispatch(setLoading(true));

                          const toastId = loadToast("Accepting Request");
                          const res = await acceptSwapRequest({
                            currentUserEmail: myData.email,
                            remoteUserEmail: v.email,
                          });

                          if (res.status === 409) {
                            dispatch(setLoading(false));
                            return updateToast(toastId, res.message, "error");
                          }
                          if (res.status === 201) {
                            dispatch(setLoading(false));
                            return updateToast(toastId, "Swap Accepted Successfully", "success");
                          }
                          dispatch(setLoading(false));
                          return updateToast(toastId, res.message, "error");



                        }




                      }} disabled={myData.matched == true} className='bg-green-900 disabled:bg-gray-600  text-white rounded-md px-4 py-2 '> {loading ? "Accepting" : "Available For you"}</button>


                      : "Available"}
                  </>







                }

                {
                  session.data?.user?.email === "21053420@kiit.ac.in" && <button className='ml-1 bg-red-800 font-bold px-3 py-1' onClick={async () => {
                    const toastId = loadToast("Deleting Request");
                    const res = await deleteSwapByAdmin(v.email);

                   if(res.status===200){
                    return updateToast(toastId, "Deleted Successfully", "success");
                   }
                   return updateToast(toastId, res.message, "error");
                  }}>Delete</button>
                }


              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
