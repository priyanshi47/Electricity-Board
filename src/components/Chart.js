import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

// Month names for x-axis labeling
const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const Chart = ({ data }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Filter data based on date range and status
  const filterData = (data) => {
    return data.filter(item => {
      const itemDate = new Date(item.dateOfApplication);
      const isDateInRange = (!startDate || itemDate >= startDate) && (!endDate || itemDate <= endDate);
      const isStatusMatch = selectedStatus === 'All' || item.status === selectedStatus;
      return isDateInRange && isStatusMatch;
    });
  };

  const filteredData = filterData(data);

  // Aggregate data by month and year
  const getMonthlyData = (filteredData) => {
    const monthlyData = filteredData.reduce((acc, item) => {
      const date = new Date(item.dateOfApplication);
      const month = date.getMonth();
      const year = date.getFullYear();
      const monthYearKey = `${monthNames[month]} ${year}`;

      acc[monthYearKey] = (acc[monthYearKey] || 0) + 1;
      return acc;
    }, {});

    // Convert to chart data format
    return Object.keys(monthlyData).map(monthYear => ({
      month: monthYear,
      connections: monthlyData[monthYear]
    }));
  };

  const chartData = getMonthlyData(filteredData);

  return (
    <div style={{ display: 'flex', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
      {/* Filters Section */}
      <div style={{ width: '250px', padding: '20px', marginLeft: '20px', backgroundColor: '#ffffff', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ textAlign: 'center', color: '#333', marginBottom: '15px' }}>Filters</h3>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ marginBottom: '5px', display: 'block' }}>Select Start Date:</label>
          <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ marginBottom: '5px', display: 'block' }}>Select End Date:</label>
          <DatePicker selected={endDate} onChange={date => setEndDate(date)} />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ marginBottom: '5px', display: 'block' }}>Select Status:</label>
          <select 
            onChange={(e) => setSelectedStatus(e.target.value)} 
            style={{ padding: '8px', width: '100%', borderRadius: '5px', border: '1px solid #ccc', fontSize: '16px', cursor: 'pointer' }} 
            onMouseEnter={(e) => e.target.style.borderColor = '#888'}
            onMouseLeave={(e) => e.target.style.borderColor = '#ccc'}
          >
            <option value="All">All</option>
            <option value="Approved">Approved</option>
            <option value="Pending">Pending</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>
      {/* Bar Chart */}
      <div style={{ flex: 1, paddingRight: '20px' }}>
        <h2 style={{ textAlign: 'center', color: '#333' }}>Monthly Connection Requests</h2>
        <BarChart width={600} height={300} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis dataKey="month" type="category" stroke="#555" fontSize={12} />
          <YAxis 
            stroke="#555" 
            fontSize={12} 
            domain={[0, 'dataMax']} // Set domain to start from 0 to max value
            tickFormatter={(value) => value} // Ensure ticks are displayed as integers
          />
          <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc' }} />
          <Legend />
          <Bar dataKey="connections" fill="url(#colorConnections)" />
          <defs>
            <linearGradient id="colorConnections" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: '#8884d8', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#82ca9d', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
        </BarChart>
      </div>

     
    </div>
  );
};

export default Chart;
