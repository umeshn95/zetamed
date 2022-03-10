import React from 'react'
import CircularProgress from '@mui/material/CircularProgress'

const Loader = () => {
  return (
    <div style={{textAlign: 'center'}}>
        <CircularProgress color="secondary" />
    </div>
  )
}

export default Loader