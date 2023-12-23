import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

export default function Loading() {
  return (
    <Grid data-testid={'loading'} container sx={{ display: 'flex', padding: 1 }}>
      <Grid sx={{mx: 'auto'}}>
        <CircularProgress sx={{marginLeft: '20px'}} />
        <Typography variant="button" display="block" gutterBottom>Loading...</Typography> 
      </Grid>
    </Grid>
  );
}