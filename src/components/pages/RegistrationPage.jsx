import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, MenuItem, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { styled } from '@mui/material/styles';
import Logo from '../log/Logo';

const Container = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  width: '100vw',
  background: '#ffffff',
  overflow: 'hidden',
});

const Form = styled('form')(({ show }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  maxWidth: '400px',
  width: '100%',
  padding: '30px',
  borderRadius: '12px',
  boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.3)',
  backgroundColor: '#ffffff',
  opacity: show ? 1 : 0,
  transform: show ? 'translateY(0)' : 'translateY(20px)',
  transition: 'opacity 1s ease, transform 0.8s ease',
}));

const LogoContainer = styled('div')({
  width: '100px',
  height: '100px',
  borderRadius: '50%',
  backgroundColor: '#e0e0e0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '10px',
  position: 'relative',
  cursor: 'pointer',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
  },
});

const LogoImage = styled('img')({
  width: '100%',
  height: '100%',
  borderRadius: '50%',
  objectFit: 'cover',
});

const CloseIconButton = styled(IconButton)({
  position: 'absolute',
  top: '5px',
  right: '5px',
  backgroundColor: '#f50057',
  color: '#ffffff',
  borderRadius: '50%',
  cursor: 'pointer',
});

const InputField = styled(TextField)({
  marginBottom: '16px',
  width: '100%',
  '& .MuiOutlinedInput-root': {
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  '&:hover .MuiOutlinedInput-root': {
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
    transform: 'scale(1.02)',
  },
});

const SubmitButton = styled(Button)({
  width: '100%',
  padding: '12px',
  marginTop: '20px',
  backgroundColor: '#333',
  color: '#fff',
  borderRadius: '6px',
  transition: 'background-color 0.3s ease, transform 0.3s ease',
  '&:hover': {
    backgroundColor: '#555',
    transform: 'scale(1.05)',
    boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.3)',
  },
});

const StatusMessage = styled(Typography)({
  marginTop: '15px',
  fontSize: '14px',
  color: '#4caf50',
});

function RegistrationPage() {
  const [logo, setLogo] = useState(null);
  const [name, setName] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [section, setSection] = useState('');
  const [branch, setBranch] = useState('');
  const [errors, setErrors] = useState({});
  const [submissionStatus, setSubmissionStatus] = useState('');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setShowForm(true);
  }, []);

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!validTypes.includes(file.type)) {
        setErrors({ ...errors, logo: 'Only .jpg, .jpeg, and .png formats are allowed' });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result);
      };
      reader.readAsDataURL(file);
      setErrors({ ...errors, logo: '' });
    }
  };

  const removeLogo = () => {
    setLogo(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let validationErrors = {};

    if (!/^\d{12}$/.test(registrationNumber)) {
      validationErrors.registrationNumber = 'Must be a 12-digit number';
    }

    if (!/^[a-zA-Z\s]+$/.test(name)) {
      validationErrors.name = 'Name must contain only letters and spaces';
    }

    if (!logo) validationErrors.logo = 'Logo upload is required';
    if (name.trim() === '') validationErrors.name = 'Name is required';
    if (!section) validationErrors.section = 'Please select a section';
    if (!branch) validationErrors.branch = 'Please select a branch';

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const formData = {
        name,
        registrationNumber,
        section,
        branch,
        logo, 
      };

      const minimalData = {
        name,
        sec: section,
        regno: registrationNumber
      };

      axios
        .post('http://localhost:8081/api/students/register', formData)
        .then(() => {
          setSubmissionStatus('Registration submitted successfully to primary database!');
        })
        .catch((error) => {
          console.error('Error during registration in primary database:', error.response);
          setSubmissionStatus('Error submitting to primary database. Please try again.');
        });

      axios
        .post('http://localhost:8084/api/students', minimalData)
        .then(() => {
          setSubmissionStatus((prevStatus) => `${prevStatus} Also saved in secondary database.`);
        })
        .catch((error) => {
          console.error('Error during registration in secondary database:', error.response);
          setSubmissionStatus((prevStatus) => `${prevStatus} Error saving in secondary database.`);
        });
    }
};


  const sections = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
  const branches = ['CSE', 'ECE', 'ME', 'CE', 'EE'];

  return (
    <>
      <Container>
        <Form id="form" onSubmit={handleSubmit} show={showForm}>
          <label htmlFor="logo-upload">
            <LogoContainer>
              {logo ? (
                <>
                  <LogoImage src={logo} alt="Logo" />
                  <CloseIconButton onClick={removeLogo}>
                    <CloseIcon fontSize="small" />
                  </CloseIconButton>
                </>
              ) : (
                <CameraAltIcon fontSize="large" style={{ color: '#333' }} />
              )}
            </LogoContainer>
          </label>
          <input
            id="logo-upload"
            type="file"
            accept="image/*"
            onChange={handleLogoUpload}
            style={{ display: 'none' }}
          />
          {errors.logo && <Typography color="error">{errors.logo}</Typography>}

          <InputField
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={!!errors.name}
            helperText={errors.name}
          />

          <InputField
            label="Registration Number"
            variant="outlined"
            value={registrationNumber}
            onChange={(e) => setRegistrationNumber(e.target.value)}
            error={!!errors.registrationNumber}
            helperText={errors.registrationNumber}
          />

          <InputField
            select
            label="Section"
            value={section}
            onChange={(e) => setSection(e.target.value)}
            error={!!errors.section}
            helperText={errors.section}
          >
            {sections.map((sec) => (
              <MenuItem key={sec} value={sec}>{sec}</MenuItem>
            ))}
          </InputField>

          <InputField
            select
            label="Branch"
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            error={!!errors.branch}
            helperText={errors.branch}
          >
            {branches.map((b) => (
              <MenuItem key={b} value={b}>{b}</MenuItem>
            ))}
          </InputField>

          <SubmitButton type="submit" variant="contained">
            Submit
          </SubmitButton>

          {submissionStatus && <StatusMessage>{submissionStatus}</StatusMessage>}
        </Form>
      </Container>
      <Logo />
    </>
  );
}

export default RegistrationPage;
