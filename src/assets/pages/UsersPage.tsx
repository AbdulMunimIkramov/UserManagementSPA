import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useUsers } from "../hooks/useUsers";
import { Card, CardContent, Typography, TextField, Box } from "@mui/material";
import Grid from "@mui/material/Grid";

import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import { User } from "../types";

export const UsersPage = () => {
  const { users, loading, error } = useUsers();
  const [search, setSearch] = useState("");

  // Фильтрация пользователей
  const filteredUsers: User[] = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Пользователи
      </Typography>

      <TextField
        fullWidth
        label="Поиск по имени"
        variant="outlined"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 3 }}
      />

      {loading && <Spinner />}
      {error && <ErrorMessage message={error} />}

      <Grid container spacing={2}>
        {filteredUsers.map((user) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={user.id}
            component="div"
            {...({} as any)}
          >
            <Card
              component={RouterLink}
              to={`/users/${user.id}`}
              sx={{ textDecoration: "none", "&:hover": { boxShadow: 6 } }}
            >
              <CardContent>
                <Typography variant="h6">{user.name}</Typography>
                <Typography variant="h6">{user.name}</Typography>
                <Typography color="textSecondary">{user.email}</Typography>
                <Typography color="textSecondary">
                  {user.address.city}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default UsersPage;
