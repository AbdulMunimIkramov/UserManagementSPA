import { CircularProgress, Box } from '@mui/material';

const Spinner = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
    <CircularProgress />
  </Box>
);

export default Spinner;