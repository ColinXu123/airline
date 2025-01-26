import React, { useState } from 'react';

function AdminPage() {
  // Sample data representing requests
  const initialRequests = [
    { id: 1, name: 'Request 1', description: 'Description for request 1', completed: false },
    { id: 2, name: 'Request 2', description: 'Description for request 2', completed: false },
    { id: 3, name: 'Request 3', description: 'Description for request 3', completed: false },
  ];

  // State to store the list of requests
  const [requests, setRequests] = useState(initialRequests);

  // Function to mark a request as completed
  const markComplete = (id) => {
    const updatedRequests = requests.map((request) => {
      if (request.id === id) {
        return { ...request, completed: true };
      }
      return request;
    });
    setRequests(updatedRequests);
  };

  // Function to delete a request
  const deleteRequest = (id) => {
    const updatedRequests = requests.filter((request) => request.id !== id);
    setRequests(updatedRequests);
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <h2>Requests</h2>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.id}>
              <td>{request.name}</td>
              <td>{request.description}</td>
              <td>{request.completed ? 'Completed' : 'Pending'}</td>
              <td>
                {/* Mark as complete button */}
                {!request.completed && (
                  <button onClick={() => markComplete(request.id)}>Mark as Complete</button>
                )}

                {/* Delete button */}
                <button onClick={() => deleteRequest(request.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPage;