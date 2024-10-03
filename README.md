# Electricity Connection Management System

## Description
This project is a **Electricity Connection Management System** built using **React**. It allows users to manage electricity connection requests, including adding new requests, editing existing ones, and visualizing monthly connection trends through charts.

## Features
- User-friendly interface for managing connection requests.
- Form for adding and editing connection details.
- Monthly connection request visualization using bar charts.
- Filtering options for date range and application status.
- Responsive design for better accessibility on various devices.

## Technologies Used
- **React**: JavaScript library for building user interfaces.
- **Recharts**: For data visualization through charts.
- **React DatePicker**: For date selection.
- **CSS**: For styling the application.

## Installation

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Steps to Install
1. Clone the repository:
   ```bash
   git clone https://github.com/priyanshi47/Electricity-Board
   ```
2. Navigate to the project directory:
   ```bash
   cd Electricity-Board
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

## Usage
To run the application locally, use the following command:
```bash
npm start
```
This will start the development server, and you can access the application in your web browser at `http://localhost:3000`.

## Components
- **Chart**: Displays monthly connection requests using a bar chart.
- **ConnectionForm**: A form for adding and editing connection requests.

## Example JSON Data Structure
The application uses a JSON structure similar to the following for connection requests:

```json
[
  {
    "id": 1,
    "applicantId": "A123",
    "name": "John Doe",
    "loadApplied": 150,
    "status": "Approved",
    "dateOfApplication": "2023-08-15",
    "govtIdType": "Aadhar",
    "govtIdNumber": "1234-5678-9012"
  }
]
```

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request for any changes.

## License
This project is licensed under the MIT License

```

