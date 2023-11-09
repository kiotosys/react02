import React, { useState } from 'react';
import { useAuth } from '../ruteo/AuthContext'; // (7). Importando contexto
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  
  const { signIn } = useAuth();                 // (7). Usando el contexto

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Por favor, completa ambos campos.');
      return;
    }

    try {
      await signIn(email, password);
      // Inicio de sesión exitoso: limpiar el error
      setError(null);
      navigate('/sistema-crud'); // Redirigir a ruta /sistema-crud
    } catch (error) {
      setError('Error al iniciar sesión: ' + error.message);
    }
  }

  return (
    <center>
      <form className='card card-body' onSubmit={handleSignIn} style={{ maxWidth:"600px"}}>

        <button className='btn btn-warning btn-block'>
          Iniciar Sesión
        </button>

        <div className='form-group input-group'>
          <div className='input-group-text bd-light'>
            <i className='material-icons'>group_add</i>
          </div>
          <input className='form-control float-start' type='text' placeholder='Correo...'  
            onChange={(e) => setEmail(e.target.value)} value={email} />
        </div>

        <div className='form-group input-group'>
          <div className='input-group-text bd-light'>
            <i className='material-icons'>star_half</i>
          </div>
          <input className='form-control float-start' placeholder='Contraseña...'  
            type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
          
        <button className='btn btn-primary btn-block'>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          Iniciar Sesión
        </button>

      </form>

    </center>
  );
}

export default LoginForm;


/*
const handleSignIn = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Por favor, completa ambos campos.');
      return;
    }

    try {
      await signIn(email, password);
      // Inicio de sesión exitoso: limpiar el error
      setError(null);
      navigate('/sistema-crud'); // Redirigir a ruta /sistema-crud
    } catch (error) {
      setError('Error al iniciar sesión: ' + error.message);
    }
  }
*/
