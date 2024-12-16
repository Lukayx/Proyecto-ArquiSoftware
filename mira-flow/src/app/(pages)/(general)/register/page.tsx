'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';  // Importa el archivo CSS como un módulo

export default function Register() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const clientData = {
      nombre,
      email,
      telefono
    };

    try {
      // Llamada al servidor para registrar al cliente
      const response = await fetch('http://localhost:3000/api/postClient', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(clientData),
      });

      // Verifica si la respuesta es exitosa
      if (!response.ok) {
        throw new Error('Error en la conexión con el servidor');
      }

      const data = await response.json();
      console.log('Datos de cliente enviados:', data);

      // Si el registro es exitoso
      if (data.message === 'Cliente creado con éxito') {
        setSuccessMessage('Cliente registrado con éxito');
        
        // Redirigir al login inmediatamente después de un registro exitoso
        router.push('/login'); // Redirige al login
      } else {
        setError('Hubo un problema al registrar al cliente');
      }
    } catch (error) {
      console.error('Error en el registro:', error);
      setError('Hubo un error al registrar al cliente');
    }
  };

  return (
    <div className={styles['register-container']}>
      <h1 className={styles.title}>Registro de Cliente</h1>
      <form onSubmit={handleRegister} className={styles['register-form']}>
        <div>
          <label htmlFor="nombre">Nombre:</label>
          <input
            className={styles['input-field']}
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Correo Electrónico:</label>
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
          <label htmlFor="telefono">Teléfono:</label>
          <input
            className={styles['input-field']}
            type="text"
            id="telefono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            required
          />
        </div>

        {/* Mostrar mensajes de éxito o error */}
        {successMessage && <p className={styles.success}>{successMessage}</p>}
        {error && <p className={styles.error}>{error}</p>}

        <button type="submit" className={styles.button}>Registrar Cliente</button>
      </form>
    </div>
  );
}
