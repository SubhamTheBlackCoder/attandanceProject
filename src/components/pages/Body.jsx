import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Grid, Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const MAX_ASSIGNMENT = 10;
const MAX_LAB_RECORD = 10;
const MAX_LEARNING_RECORD = 10;

const TeacherAttendancePage = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setShowContent(true);

    // Fetch students data from the backend
    axios.get('http://localhost:8084/api/students')

      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const calculateMarksAndPercentage = (student) => {
    const totalMarks = parseInt(student.assignment) + parseInt(student.labRecord) + parseInt(student.learningRecord);
    const percentage = (totalMarks / (MAX_ASSIGNMENT + MAX_LAB_RECORD + MAX_LEARNING_RECORD)) * 100;
    return { totalMarks, percentage };
  };

  const handleEditChange = (field, value) => {
    if (selectedStudent !== null) {
      const updatedStudent = { ...selectedStudent, [field]: value };

      const { totalMarks, percentage } = calculateMarksAndPercentage(updatedStudent);
      updatedStudent.totalMarks = totalMarks;
      updatedStudent.percentage = percentage;

      const updatedStudents = students.map((student) =>
        student.id === selectedStudent.id ? updatedStudent : student
      );

      setStudents(updatedStudents);
      setSelectedStudent(updatedStudent);
    }
  };

  const handleSelectStudent = (student) => {
    setSelectedStudent(student);
  };

  const handleSaveChanges = () => {
    if (selectedStudent) {
      axios.put(`http://localhost:8084/api/students/${selectedStudent.id}`, selectedStudent)

        .then((response) => {
          // Update the student data in the list with the saved response data
          const updatedStudents = students.map((student) =>
            student.id === selectedStudent.id ? response.data : student
          );
          setStudents(updatedStudents);
          setSelectedStudent(null); // Clear selected student after save
        })
        .catch((error) => {
          console.error('Error saving data:', error);
        });
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Box
        sx={{
          opacity: showContent ? 1 : 0,
          transform: showContent ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 1s ease, transform 1s ease',
        }}
      >
        <Typography variant="h4" gutterBottom>Manage Attendance and Records</Typography>
      </Box>

      <Box
        sx={{
          opacity: showContent ? 1 : 0,
          transform: showContent ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 1s ease, transform 1s ease',
          marginBottom: 3
        }}
      >
        {selectedStudent && (
          <Box sx={{ marginBottom: 3 }}>
            <Typography variant="h6">Edit Student Record</Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Name"
                  value={selectedStudent.name}
                  fullWidth
                  disabled
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Section"
                  value={selectedStudent.sec}
                  fullWidth
                  disabled
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Registration Number"
                  value={selectedStudent.regno}
                  fullWidth
                  disabled
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label={`Assignment (Out of ${MAX_ASSIGNMENT})`}
                  value={selectedStudent.assignment}
                  onChange={(e) => handleEditChange('assignment', e.target.value)}
                  fullWidth
                  type="number"
                  inputProps={{ max: MAX_ASSIGNMENT }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label={`Lab Record (Out of ${MAX_LAB_RECORD})`}
                  value={selectedStudent.labRecord}
                  onChange={(e) => handleEditChange('labRecord', e.target.value)}
                  fullWidth
                  type="number"
                  inputProps={{ max: MAX_LAB_RECORD }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label={`Learning Record (Out of ${MAX_LEARNING_RECORD})`}
                  value={selectedStudent.learningRecord}
                  onChange={(e) => handleEditChange('learningRecord', e.target.value)}
                  fullWidth
                  type="number"
                  inputProps={{ max: MAX_LEARNING_RECORD }}
                /> 
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Total Marks"
                  value={selectedStudent.totalMarks}
                  fullWidth
                  disabled
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Percentage"
                  value={selectedStudent.percentage.toFixed(2)}
                  fullWidth
                  disabled
                />
              </Grid>
            </Grid>
            <Button variant="contained" color="primary" sx={{ marginTop: 2 }} onClick={handleSaveChanges}>Save Changes</Button>
          </Box>
        )}
      </Box>

      <Box
        sx={{
          opacity: showContent ? 1 : 0,
          transform: showContent ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 1s ease, transform 1s ease',
        }}
      >
        <Typography variant="h6" gutterBottom>Student Records</Typography>
      </Box>

      <Box
        sx={{
          opacity: showContent ? 1 : 0,
          transform: showContent ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 1s ease, transform 1s ease'
        }}
      >
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Section</TableCell>
                <TableCell>Reg No</TableCell>
                <TableCell>Assignment</TableCell>
                <TableCell>Lab Record</TableCell>
                <TableCell>Learning Record</TableCell>
                <TableCell>Total Marks</TableCell>
                <TableCell>Percentage</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id} onClick={() => handleSelectStudent(student)} sx={{ cursor: 'pointer' }}>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.sec}</TableCell>
                  <TableCell>{student.regno}</TableCell>
                  <TableCell>{student.assignment}</TableCell>
                  <TableCell>{student.labRecord}</TableCell>
                  <TableCell>{student.learningRecord}</TableCell>
                  <TableCell>{student.totalMarks}</TableCell>
                  <TableCell>{student.percentage.toFixed(2)}%</TableCell>
                  <TableCell><Button variant="outlined" color="primary">Edit</Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default TeacherAttendancePage;
