'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';  // Importa el archivo CSS como un módulo

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Construir la URL del endpoint con el email ingresado
      const response = await fetch(`/api/apiLogin/${email}`);

      const data = await response.json();

      // Si el mensaje es "Usuario encontrado con éxito", redirigir al dashboard
      if (data.message === 'Usuario encontrado con éxito') {
        // Aquí puedes agregar el proceso para validar la contraseña si lo necesitas
        // Por ejemplo: si data.usuario.password === password
        router.push('/main');
      } else {
        setError('Usuario no encontrado');
      }
    } catch (error) {
      console.error('Error en el login:', error);
      setError('Hubo un error al iniciar sesión');
    }
  };

  return (
    <div className={styles['login-container']}>
      <h1>Login</h1>
      <form onSubmit={handleLogin} className={styles['login-form']}> {/* Aplica la clase local a la forma */}
        <div>
          <label htmlFor="email">Correo Electrónico</label>
          <input
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
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className={styles.error}>{error}</p>} {/* Usa la clase local para los errores */}
        <button type="submit" className={styles.button}>Iniciar sesión</button> {/* Usa la clase local para el botón */}
      </form>
    </div>
  );
}
