import React, { useState } from 'react';
import ConnectionTable from '../components/ConnectionTable';
import ConnectionForm from '../components/ConnectionForm';
import Chart from '../components/Chart';
import initialData from '../data.json';

const Dashboard = () => {
  const [data, setData] = useState(initialData);
  const [editingData, setEditingData] = useState(null);

  const handleSave = (newData) => {
    if (editingData) {
      // Update existing user
      setData(data.map(item => (item.id === newData.id ? newData : item)));
    } else {
      // Add new user
      setData([...data, { ...newData, id: data.length + 1 }]);
    }
    setEditingData(null);
  };

  const handleEdit = (rowData) => {
    setEditingData(rowData);
  };

  const handleDelete = (id) => {
    setData(data.filter(item => item.id !== id));
  };

  return (
    <div>
         <h2>Incture Electricity Board</h2>
        <Chart data={data} />
      <ConnectionForm initialData={editingData} onSave={handleSave} />
      <h1>Connection Dashboard</h1>
      <ConnectionTable data={data} onEdit={handleEdit} onDelete={handleDelete} />
     
     
      
    </div>
  );
};

export default Dashboard;
