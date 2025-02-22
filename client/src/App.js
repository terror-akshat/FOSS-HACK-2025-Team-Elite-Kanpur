import React from 'react';
import { Typography, AppBar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import VideoPlayer from './components/VideoPlayer';
import Sidebar from './components/Sidebar';
import Notifications from './components/Notifications';
import './index.css';

const useStyles = makeStyles((theme) => ({
  /* Animated Gradient Background */
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    minHeight: '100vh',
    background: 'linear-gradient(-45deg, #1e3c72, #2a5298, #0f2027, #203a43)',
    backgroundSize: '400% 400%',
    animation: '$gradientBG 10s ease infinite',
    padding: '20px',
  },

  /* Keyframes Animation */
  '@keyframes gradientBG': {
    '0%': { backgroundPosition: '0% 50%' },
    '50%': { backgroundPosition: '100% 50%' },
    '100%': { backgroundPosition: '0% 50%' },
  },

  /* Enhanced AppBar with Glassmorphism */
  appBar: {
    borderRadius: 20,
    margin: '30px auto',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    maxWidth: '800px',
    background: 'rgba(255, 255, 255, 0.2)', // Glass effect
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    transition: 'all 0.4s ease-in-out',

    '&:hover': {
      boxShadow: '0 6px 40px rgba(0, 0, 0, 0.3)',
      transform: 'translateY(-2px)',
    },

    [theme.breakpoints.down('sm')]: {
      width: '95%',
      fontSize: '18px',
    },
  },

  /* Stylish Typography */
  title: {
    fontWeight: 800,
    fontSize: '32px',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    color: '#fff',
    textShadow: '2px 2px 6px rgba(0, 0, 0, 0.3)',
    transition: 'color 0.3s ease-in-out',

    '&:hover': {
      color: '#f5f5f5',
      textShadow: '2px 2px 8px rgba(255, 255, 255, 0.4)',
    },
  },
}));

const App = () => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography variant="h2" align="center" className={classes.title}>
          Video Chat
        </Typography>
      </AppBar>
      <VideoPlayer />
      <Sidebar>
        <Notifications />
      </Sidebar>
    </div>
  );
};

export default App;
