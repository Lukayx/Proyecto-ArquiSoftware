'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';  // Usamos js-cookie para manejar las cookies
import styles from './page.module.css';  // Importa el archivo CSS como un módulo

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');  // Aunque no usamos la contraseña, la mantenemos
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log('Email enviado:', email); // Verifica que el email sea el correcto

    try {
      // Llamada al servidor para verificar el correo
      const response = await fetch(`/api/getEmail/${email}`);

      // Verifica si la respuesta es exitosa
      if (!response.ok) {
        throw new Error('Error en la conexión con el servidor');
      }

      const data = await response.json();

      // Verifica los datos recibidos de la API
      console.log('Datos recibidos de la API:', data);

      // Si el mensaje indica que el usuario fue encontrado
      if (data.message === 'Usuario encontrado con éxito') {
        // Si necesitas guardar el token (el id del usuario), asegúrate de que la API lo retorne
        const userId = data.usuario.id;

        // Guardar el id del usuario como "token" en la cookie
        Cookies.set('user_token', userId, { expires: 7 });  // Guardamos el "token" por 7 días

        // Hacer un console log del token (id del usuario)
        console.log('Token guardado en la cookie:', Cookies.get('user_token'));

        // Redirigir al usuario a la página principal (main)
        router.push('/main');
      } else {
        setError('Usuario no encontrado o datos incorrectos');
      }
    } catch (error) {
      console.error('Error en el login:', error);
      setError('Hubo un error al iniciar sesión');
    }
  };

  return (
    <div className={styles['login-container']}>
      <h1 className={styles.title}>Login</h1>
      <form onSubmit={handleLogin} className={styles['login-form']}>
        <div>
          <label htmlFor="email">Correo Electrónico</label>
          <input
            className={styles['input-field']}
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña</label>
          <input
            className={styles['input-field']}
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit" className={styles.button}>Iniciar sesión</button>
      </form>
    </div>
  );
}
