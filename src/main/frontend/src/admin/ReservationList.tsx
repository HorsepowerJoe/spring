import axios from 'axios';
import { AdminPageProps } from 'model/props';
import { PageInfo, Reservation } from 'model/types';
import React, { useEffect, useState } from 'react';
import './css/ReservationListStyle.css';

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


    const ReservationList = reserves?.map((reserve) => (
      <tr key={reserve.r_num}>
        <td>{reserve.r_num}</td>
        <td>{new Date(reserve.r_regDate).toLocaleString()}</td>
        <td>{new Date(reserve.visitDate).toLocaleString()}</td>
        <td>{reserve.petName}</td>
        <td>{reserve.customerName}</td>
        <td>{reserve.g_name}</td>
        <td>{reserve.r_expired ? 'Yes' : 'No'}</td>
        <td>{reserve.r_filnalAmount}</td>
      </tr>
    ));

   
    
    return (
      <>
        <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
          <thead>
            <tr>
              <th>Reservation Number</th>
              <th>Registration Date</th>
              <th>Visit Date</th>
              <th>Pet Name</th>
              <th>Customer Name</th>
              <th>Grooming Style Name</th>
              <th>Expired</th>
              <th>Final Amount</th>
            </tr>
          </thead>
          <tbody>{ReservationList}</tbody>
        </table>
      </>
    );
}

export default ReservationList