import { CircularProgress } from '@mui/material';
import React from 'react';
import { ToastContentProps } from 'react-toastify';

export const ProgressPopUp = ({
  data
}: ToastContentProps<{ message: string }>) => {
  return (
    <div className="progress-main">
      <div>
        <CircularProgress
          size={18}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
      <div><p className="progress-message">{data!.message}</p></div>
      
    </div>
  );
};
