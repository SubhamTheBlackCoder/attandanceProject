
{/* import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Grid } from '@mui/material';

const data = [
  {
    title: 'Marks',
    description: 'Click here to view all your marks',
    image: 'images/marksheet1.png', // Replace with the actual image path if needed
    link: '/marks'
  },
  {
    title: 'Attendance',
    description: 'Click here to view all your attendance records',
    image: 'images/attendance2.png', // Replace with the actual image path if needed
    link: '/attendance'
  }
];

function Dashboard() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Trigger the animation after component mounts
    setShowContent(true);
  }, []);

  const handleClick = (link) => {
    window.location.href = link;
  };

  return (
    <Grid container spacing={3} justifyContent="center" style={{ marginTop: '20px' }}>
      {data.map((item, index) => (
        <Grid 
          item 
          xs={12} 
          sm={6} 
          md={4} 
          key={index}
          style={{
            opacity: showContent ? 1 : 0,
            transform: showContent ? 'translateY(0)' : 'translateY(30px)',
            transition: `opacity 0.8s ease ${index * 0.2}s, transform 0.8s ease ${index * 0.2}s`
          }}
        >
          <Card 
            onClick={() => handleClick(item.link)} 
            style={{
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              borderRadius: '12px',
              overflow: 'hidden',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
            }}
          >
            <CardMedia
              component="img"
              height="250"
              image={item.image} // Replace with actual image paths
              alt={item.title}
              style={{ objectFit: 'cover' }} // Fills the card with the image
            />
            <CardContent style={{ padding: '20px' }}>
              <Typography gutterBottom variant="h5" component="div" style={{ fontWeight: 'bold' }}>
                {item.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" style={{ marginBottom: '15px' }}>
                {item.description}
              </Typography>
              <Button 
                variant="contained" 
                color="primary" 
                fullWidth
                style={{ padding: '10px 0', borderRadius: '8px' }}
              >
                {item.title}
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default Dashboard;*/}

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Grid } from '@mui/material';

const data = [
  {
    title: 'Marks',
    description: 'Click here to view all your marks',
    image: 'images/marksheet1.png', // Replace with the actual image path if needed
    link: '/marks'
  },
  {
    title: 'Attendance',
    description: 'Click here to view all your attendance records',
    image: 'images/attendance2.png', // Replace with the actual image path if needed
    link: '/attendance'
  }
];

function Dashboard() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setShowContent(true);
  }, []);

  const handleClick = (link) => {
    window.location.href = link;
  };

  return (
    <Grid container spacing={3} justifyContent="center" style={{ marginTop: '20px' }}>
      {data.map((item, index) => (
        <Grid 
          item 
          xs={12} 
          sm={6} 
          md={4} 
          key={index}
          style={{
            opacity: showContent ? 1 : 0,
            transform: showContent ? 'translateY(0)' : 'translateY(30px)',
            transition: `opacity 0.8s ease ${index * 0.2}s, transform 0.8s ease ${index * 0.2}s`
          }}
        >
          <Card 
            onClick={() => handleClick(item.link)} 
            sx={{
              cursor: 'pointer',
              borderRadius: '16px',
              overflow: 'hidden',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              transform: 'scale(1)',
              background: 'linear-gradient(135deg, #ece9e6, #ffffff)', // Gradient background
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
              },
              '&:active': {
                transform: 'scale(0.98)',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
              },
            }}
          >
            <CardMedia
              component="img"
              height="250"
              image={item.image} // Replace with actual image paths
              alt={item.title}
              style={{ objectFit: 'cover', filter: 'brightness(0.9)' }} // Darker overlay on image
            />
            <CardContent 
              sx={{
                padding: '20px',
                background: 'linear-gradient(135deg, #ffffff, #f7f7f7)',
                textAlign: 'center',
              }}
            >
              <Typography 
                gutterBottom 
                variant="h5" 
                component="div" 
                sx={{ 
                  fontWeight: 'bold', 
                  color: '#333' 
                }}
              >
                {item.title}
              </Typography>
              <Typography 
                variant="body2" 
                color="text.secondary" 
                sx={{ marginBottom: '15px', color: '#666' }}
              >
                {item.description}
              </Typography>
              <Button 
                variant="contained" 
                color="primary" 
                fullWidth
                sx={{
                  padding: '10px 0',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  background: 'linear-gradient(135deg, #3f51b5, #5c6bc0)',
                  color: '#fff',
                  transition: 'background 0.3s ease',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #3f51b5, #3949ab)',
                  },
                }}
              >
                {item.title}
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default Dashboard;
