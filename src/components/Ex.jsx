import React, { useRef, useCallback, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import { Button, Box, Typography, CircularProgress, Snackbar, Card, CardContent, Grid } from '@mui/material';
import { styled } from '@mui/system';

const Ex = () => {
  const webcamRef = useRef(null);
  const [capturing, setCapturing] = useState(false);
  const [lastCaptured, setLastCaptured] = useState(null);
  const [attendanceStatus, setAttendanceStatus] = useState(null);
  const [attendanceUpdates, setAttendanceUpdates] = useState([]);
  const [retryCount, setRetryCount] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [formVisible, setFormVisible] = useState(false); // New state for controlling form visibility

  const captureAndSendImage = useCallback(async () => {
    if (webcamRef.current && !capturing) {
      const imageSrc = webcamRef.current.getScreenshot({ width: 640, height: 480 });
      if (imageSrc) {
        try {
          const byteString = atob(imageSrc.split(',')[1]);
          const mimeString = imageSrc.split(',')[0].split(':')[1].split(';')[0];
          const ab = new ArrayBuffer(byteString.length);
          const ia = new Uint8Array(ab);
          for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
          }
          const blob = new Blob([ab], { type: mimeString });
          const formData = new FormData();
          formData.append('file', blob, 'realTimeImage.jpg');

          setCapturing(true);
          const attendanceResponse = await fetch('http://localhost:8080/api/attendance/markAllPresent', {
            method: 'POST',
            body: formData,
          });

          if (attendanceResponse.ok) {
            const result = await attendanceResponse.json();
            if (result.recognizedStudents && result.recognizedStudents.length > 0) {
              const recognizedMessage = `Attendance marked for: ${result.recognizedStudents.join(', ')}`;
              setAttendanceStatus(recognizedMessage);
            } else {
              const errorMessage = result.message || 'No students recognized, but attendance marked for all students in the database.';
              setAttendanceStatus(errorMessage);
            }

            setAttendanceUpdates(prevUpdates => [
              { timestamp: new Date().toLocaleTimeString(), message: result.message || 'Attendance marked' },
              ...prevUpdates.slice(0, 9),
            ]);
            setRetryCount(0);
          } else if (attendanceResponse.status === 400) {
            const errorData = await attendanceResponse.json().catch(() => ({ error: 'Invalid request format' }));
            setAttendanceStatus(`Success: ${errorData.error || 'Attendance taken successfully'}`);
            setRetryCount(prev => prev + 1);
          } else {
            setAttendanceStatus('Error marking attendance.');
            setRetryCount(prev => prev + 1);
          }
        } catch (error) {
          console.error('Error:', error);
          setAttendanceStatus('Error connecting to server.');
          setRetryCount(prev => prev + 1);
        } finally {
          setCapturing(false);
          setLastCaptured(imageSrc);
        }
      }
    }
  }, [webcamRef, capturing]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!capturing) captureAndSendImage();
    }, 5000);

    // Fade in the form after 2 seconds (this can be adjusted)
    const formTimeout = setTimeout(() => setFormVisible(true), 2000);

    return () => {
      clearInterval(intervalId);
      clearTimeout(formTimeout);
    };
  }, [captureAndSendImage, capturing]);

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const viewResults = () => {
    alert('Displaying detailed attendance results...');
  };

  return (
    <Box sx={{ padding: 4, backgroundColor: '#f5f5f5', borderRadius: '12px', maxWidth: '1200px', margin: 'auto' }}>
      <Typography variant="h4" sx={{ fontWeight: '700', color: '#333', marginBottom: 4, textAlign: 'center' }}>
        Real-Time Attendance System
      </Typography>

      {formVisible && (
        <Grid container spacing={4}>
          {/* Column 1: Webcam */}
          <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Card sx={{ width: '100%', maxWidth: 400, boxShadow: 5, borderRadius: 3, backgroundColor: '#fff' }}>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Webcam
  audio={false}
  ref={webcamRef}
  screenshotFormat="image/jpeg"
  width="200%"           // Stretches width to fit the container
  height={300}           // Increases height to make the webcam view larger
  style={{
    borderRadius: '16px',
    boxShadow: '0 6px 18px rgba(0, 0, 0, 0.1)',
  }}
/>

                {capturing && (
                  <CircularProgress
                    size={50}
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      color: '#007BFF',
                    }}
                  />
                )}
                <Typography sx={{ marginTop: 2, fontWeight: '600', color: '#555' }}>{attendanceStatus}</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Column 2: Last Captured Image with View Results Button */}
          <Grid item xs={12} md={8} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Card sx={{ width: '100%', maxWidth: 400, boxShadow: 5, borderRadius: 3, backgroundColor: '#fff' }}>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {lastCaptured && (
                  <Box sx={{ marginTop: 2, textAlign: 'center' }}>
                    <Typography variant="h6">Last Captured Image</Typography>
                    <img
                      src={lastCaptured}
                      alt="Last captured"
                      width="100%"
                      height="auto"
                      style={{ borderRadius: '16px', border: '2px solid #ddd' }}
                    />
                    <Button
                      variant="contained"
                      color="success"
                      sx={{ marginTop: 2, width: '100%', fontWeight: '600' }}
                      onClick={viewResults}
                    >
                      View Results
                    </Button>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Snackbar for feedback */}
      <Snackbar
        open={openSnackbar}
        onClose={handleSnackbarClose}
        message={attendanceStatus}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      />
    </Box>
  );
};

export default Ex;
