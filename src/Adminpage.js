import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminPage() {
  const [requests, setRequests] = useState([]);

  // Fetch requests on component mount
  useEffect(() => {
    axios.get('http://localhost:3001/get-requests')
      .then(response => {
        setRequests(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the requests!', error);
      });
  }, []);

  // Handle deleting a request
  const handleDelete = (id) => {
    console.log(id);
    let send = {
      delete : id
    }
    
    axios({
      method: "post",
      url:"http://localhost:3001/delete-request",
      data : send
    })
    window.location.reload();

      // .then(response => {
      //   // Remove the deleted request from the UI
      //   setRequests(response.filter(request => request.key !== id));
      //   alert(`Request with ID ${id} deleted successfully!`);
      // })
      // .catch(error => {
      //   console.error('There was an error deleting the request!', error);
      // });
  };

  return (
    <div>
      <h1>Admin Page</h1>
      <table border="1" style={{ width: '100%', textAlign: 'left' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Seat Number</th>
            <th>Help Topic</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.map(request => (
            <tr key={request.key}>
              <td>{request.key}</td>
              <td>{request.seat_num}</td>
              <td>{request.name}</td>
              <td>{request.complete ? 'Complete' : 'Incomplete'}</td>
              <td>
                <button onClick={() => handleDelete(request.key)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPage;
