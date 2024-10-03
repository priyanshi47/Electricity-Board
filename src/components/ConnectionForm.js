import React, { useState, useEffect } from 'react';
import './ConnectionForm.css'; // Assuming you create a CSS file for styling

const ConnectionForm = ({ initialData, onSave }) => {
  const [formData, setFormData] = useState({
    applicantId: '',
    name: '',
    loadApplied: '',
    status: 'Pending', // Fixed status
    dateOfApplication: new Date().toISOString().split("T")[0], // Set to current date
    govtIdType: '',
    govtIdNumber: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.loadApplied > 200) {
      alert("Load applied cannot exceed 200 KV");
      return;
    }
    const dataToSave = {
      ...formData,
      id: initialData ? formData.id : new Date().getTime() // Use timestamp as a unique id for new entries
    };
    onSave(dataToSave);
    // Reset form after save
    setFormData({
      applicantId: '',
      name: '',
      loadApplied: '',
      status: 'Pending', // Reset to fixed status
      dateOfApplication: new Date().toISOString().split("T")[0], // Reset to current date
      govtIdType: '',
      govtIdNumber: ''
    });
  };

  return (
    <form className="connection-form" onSubmit={handleSubmit}>
      <h2>{initialData ? 'Edit Connection' : 'Add New Connection'}</h2>
      <div className="form-row">
        <div className="form-group">
          <input
            type="text"
            name="applicantId"
            placeholder="Applicant ID"
            value={formData.applicantId}
            onChange={handleChange}
            disabled={!!initialData} // Disable if editing
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            name="loadApplied"
            placeholder="Load Applied (KV)"
            value={formData.loadApplied}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="status"
            placeholder="Status"
            value={formData.status}
            readOnly
            className="status-input"
          />
        </div>
        <div className="form-group">
          <input
            type="date"
            name="dateOfApplication"
            value={formData.dateOfApplication}
            onChange={handleChange}
            readOnly={!!initialData} // Read-only if editing
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="govtIdType"
            placeholder="Government ID Type"
            value={formData.govtIdType}
            onChange={handleChange}
            readOnly={!!initialData} // Read-only if editing
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="govtIdNumber"
            placeholder="Government ID Number"
            value={formData.govtIdNumber}
            onChange={handleChange}
            readOnly={!!initialData} // Read-only if editing
            required
          />
        </div>
      </div>
      <button type="submit" className="submit-button">Save</button>
    </form>
  );
};

export default ConnectionForm;
