import axios from 'axios';
import { AdminPageProps } from 'model/props';
import { PageInfo, Reservation } from 'model/types';
import React, { useEffect, useState } from 'react';

const ReservationList:React.FC<AdminPageProps> = ({navi, userInfo, getToken, axiosConfig}) => {
    const [reserves, setReserves] = useState<Reservation[]>([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [pageInfo, setPageInfo] = useState<PageInfo>();

    
      

    useEffect(()=>{
        axios.get(`/api/admin/findReservationList?page=${pageNumber}&size=${pageSize}`,axiosConfig).then(data=>{
            setReserves(data.data.content);
            setPageInfo({
              pageNumber: data.data.number + 1,
              pageSize: data.data.size,
              totalElement: data.data.totalElement,
              totalPages: data.data.totalPages,
            });
        })
    },[])


    const ReservationList = reserves?.map(reserve => (
<tr key={reserve.r_num}>
              <td>{reserve.r_num}</td>
              <td>{reserve.r_regDate}</td>
              <td>{reserve.visitDate}</td>
              <td>{reserve.petNum}</td>
              <td>{reserve.customerNum}</td>
              <td>{reserve.g_num}</td>
              <td>{reserve.r_expired ? 'Yes' : 'No'}</td>
              <td>{reserve.r_filnalAmount}</td>
            </tr>
    ));
    
    


  return (
    <>
        <table>
        <tr>
            <th>Reservation Number</th>
            <th>Registration Date</th>
            <th>Visit Date</th>
            <th>Pet Number</th>
            <th>Customer Number</th>
            <th>Grooming Number</th>
            <th>Expired</th>
            <th>Final Amount</th>
          </tr>
        </table>
        {ReservationList}
    </>
  )
}

export default ReservationList