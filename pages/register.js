import { useState } from 'react';
import axios from 'axios';
import { styled } from 'styled-components';
import Link from 'next/link';
import Header from '@/components/Header';

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

const RegLink = styled(Link)`
  text-decoration: none;
  color: #aaa;
`

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // Realizar la solicitud de registro al backend
      await axios.post('/api/register', { name, email, password });
      // Aquí puedes manejar la respuesta en caso de que desees mostrar un mensaje de éxito o realizar alguna otra acción
      setSuccessMessage('Registro exitoso. Ahora puedes iniciar sesión.');

      window.location.href = '/login';
    } catch (error) {
      console.error('Error al registrarse:', error);
      setError('Ocurrió un error al registrar la cuenta. Inténtalo de nuevo.');
    }
  };

  return (
    <>
      <Header/>
      <FormCenter>
      <h2>Registrate</h2>
        <Box>
          <form onSubmit={handleRegister}>
            <div>
              <label htmlFor="name">Nombre</label>
              <br />
              <Input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
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
              {successMessage && <p>{successMessage}</p>}
              <RegLink href={'/login'}>Ya tienes una cuenta? Ingresa aqui!</RegLink>
            </div>
            <Button type="submit">Registrarse</Button>
          </form>
        </Box>
      </FormCenter>
    </>
  );
}

export default Register;