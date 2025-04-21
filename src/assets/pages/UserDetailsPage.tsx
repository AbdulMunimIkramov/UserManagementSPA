import { useEffect, useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { Box, Typography, Card, CardContent, Button, Divider } from '@mui/material';
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: { street: string; suite: string; city: string; zipcode: string };
  company: { name: string };
}

interface Post {
  id: number;
  title: string;
  body: string;
}

const UserDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        if (!userResponse.ok) throw new Error('Не удалось загрузить данные пользователя');
        const userData = await userResponse.json();
        setUser(userData);

        const postsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`);
        if (!postsResponse.ok) throw new Error('Не удалось загрузить посты');
        const postsData = await postsResponse.json();
        setPosts(postsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Произошла ошибка');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!user) return null;

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 2 }}>
      <Button
        component={RouterLink}
        to="/users"
        color="primary"
        sx={{ mb: 2 }}
      >
        ← Назад к списку пользователей
      </Button>
      
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>{user.name}</Typography>
          <Typography><strong>Email:</strong> {user.email}</Typography>
          <Typography><strong>Телефон:</strong> {user.phone}</Typography>
          <Typography><strong>Адрес:</strong> {user.address.street}, {user.address.suite}, {user.address.city}, {user.address.zipcode}</Typography>
          <Typography><strong>Компания:</strong> {user.company.name}</Typography>
        </CardContent>
      </Card>

      <Typography variant="h6" gutterBottom>Посты</Typography>
      <Divider sx={{ mb: 2 }} />
      {posts.map(post => (
        <Card key={post.id} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="subtitle1" gutterBottom>{post.title}</Typography>
            <Typography color="textSecondary">{post.body}</Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default UserDetailsPage;