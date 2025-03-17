// src/controllers.ts
import { Request, Response } from 'express';
import pool from './db';

// Obtener todos los usuarios
export const getUsuarios = async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM usuarios');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener usuarios');
  }
};

// Crear un nuevo usuario
export const postUsuario = async (req: Request, res: Response) => {
  const { nombre, apellido, direccion, telefono, edad, correo } = req.body;
  try {
    await pool.query(
      `INSERT INTO usuarios (nombre, apellido, direccion, telefono, edad, correo)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [nombre, apellido, direccion, telefono, edad, correo]
    );
    res.status(201).send('Usuario creado correctamente');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al crear el usuario');
  }
};
