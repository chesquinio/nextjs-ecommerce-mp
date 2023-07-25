import { useState } from 'react';
import axios from 'axios';
import { styled } from 'styled-components';
import Header from '@/components/Header';
import Link from 'next/link';

const FormCenter = styled.div`
    max-width: 800px;
    margin: 0 auto;
    padding: 0 20px;
`

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
`;

const Button = styled.button`
  width: 100%;
  height: 30px;
  background-color: #88f;
  color: #fff;
  font-family: 'Poppins', sans-serif;
  font-size: 15px;
  border:none;
  border-radius: 5px;
  margin-top: 15px;
`

const Input = styled.input`
  width: 100%;
  border: none;
  border-bottom: 1px solid #ddd;
  margin: 10px 0;
`

const LogLink = styled(Link)`
  text-decoration: none;
  color: #aaa;
`

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      const response = await axios.post('/api/login', { email, password });

      const token = response.data.token;
      localStorage.setItem('token', token);

      console.log('Inicio de sesión exitoso:', response.data);

      window.location.href = '/';
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError('Credenciales incorrectas. Inténtalo de nuevo.');
    }
  };

  return (
    <>
      <Header />
      <FormCenter>
        <h2>Iniciar sesión</h2>
        <Box>
          <form onSubmit={handleLogin}>
            <div>
              <label htmlFor="email">Correo electrónico</label>
              <br />
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password">Contraseña</label>
              <br />
              <Input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              {error && <p>{error}</p>}
              <LogLink href={'/register'}>No tienes una cuenta? Registrate aqui!</LogLink>
            </div>
            <Button type="submit">Iniciar sesión</Button>
          </form>
        </Box>
      </FormCenter>
    </>
  );
}

export default Login;