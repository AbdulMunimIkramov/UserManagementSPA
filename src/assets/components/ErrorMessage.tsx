import { Alert, AlertTitle } from '@mui/material';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => (
  <Alert severity="error" sx={{ mb: 2 }}>
    <AlertTitle>Ошибка</AlertTitle>
    {message}
  </Alert>
);

export default ErrorMessage;