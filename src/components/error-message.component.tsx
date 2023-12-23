import Typography from '@mui/material/Typography';

type ErrorMessageProps = {
  title: string;
  text: string;
}

export default function ErrorMessage({title, text} : ErrorMessageProps) {
  return (
    <Typography sx={{my: 2, color: 'error.light'}}>
      <b>{title}</b>: {text}
    </Typography>
  )
}