import React from 'react';
import { Box, keyframes } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.1);
    opacity: 1;
  }
`;

const LoadingAnimation = ({ size = 60, color }) => {
  const theme = useTheme();
  const defaultColor = theme.palette.primary.main;

  return (
    <Box
      sx={{
        position: 'relative',
        width: size,
        height: size,
        margin: 'auto',
      }}
    >
      {/* Outer Ring */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          border: `3px solid ${color || defaultColor}`,
          borderRadius: '50%',
          borderTopColor: 'transparent',
          animation: `${spin} 1s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite`,
        }}
      />

      {/* Inner Ring */}
      <Box
        sx={{
          position: 'absolute',
          top: '25%',
          left: '25%',
          width: '50%',
          height: '50%',
          border: `3px solid ${color || defaultColor}`,
          borderRadius: '50%',
          borderBottomColor: 'transparent',
          animation: `${spin} 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite reverse`,
        }}
      />

      {/* Center Dot */}
      <Box
        sx={{
          position: 'absolute',
          top: '45%',
          left: '45%',
          width: '10%',
          height: '10%',
          backgroundColor: color || defaultColor,
          borderRadius: '50%',
          animation: `${pulse} 1s ease-in-out infinite`,
        }}
      />
    </Box>
  );
};

export default LoadingAnimation; 