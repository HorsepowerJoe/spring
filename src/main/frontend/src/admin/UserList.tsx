import axios from 'axios';
import { AdminPageProps } from 'model/props';
import { Customer, PageInfo } from 'model/types';
import React, { useEffect, useState } from 'react';
import './css/ReservationListStyle.css';

const UserList:React.FC<AdminPageProps> = ({navi, userInfo, getToken, axiosConfig}) => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [pageInfo, setPageInfo] = useState<PageInfo>();

    
      

    useEffect(()=>{
        axios.get(`/api/admin/findUserList?page=${pageNumber}&size=${pageSize}`,axiosConfig).then(data=>{
            setCustomers(data.data.content);
            setPageInfo({
              pageNumber: data.data.number + 1,
              pageSize: data.data.size,
              totalElement: data.data.totalElement,
              totalPages: data.data.totalPages,
            });
        })
    },[])


    const ReservationList = customers?.map((customer) => (
      <tr key={customer.customerNum}>
        <td>{customer.customerNum}</td>
        <td>{new Date(customer.customerRegDate).toLocaleString()}</td>
        <td>{customer.customerName}</td>
        <td>{customer.customerEmail}</td>
        <td>{customer.customerGender}</td>
        <td>{customer.customerAge}</td>
        <td>{customer.customerPhone}</td>
        <td>{customer.customerAddress}</td>
        <td>{customer.customerIsWithdrawal ? 'Yes' : 'No'}</td>
        <td>{customer.role}</td>
        <td>{customer.provider}</td>
        <td>{customer.providerId}</td>
      </tr>
    ));

   
    
    return (
      <>
        <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
          <thead>
            <tr>
              <th>Customer Number</th>
              <th>Registration Date</th>
              <th>Name</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Age</th>
              <th>Phone Number</th>
              <th>Address</th>
              <th>Withdrawal</th>
              <th>Role</th>
              <th>Provider</th>
              <th>Provider Id</th>
            </tr>
          </thead>
          <tbody>{ReservationList}</tbody>
        </table>
      </>
    );
}

export default UserList