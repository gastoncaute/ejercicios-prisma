"use client"

import React, { useEffect, useState } from 'react';
import { PrismaClient, Usuarios } from '@prisma/client';

const prisma = new PrismaClient();

type Usuario = {
    id: string;
    nombre: string;
    edad: number;
    activo: boolean;
    publicaciones: {
    id: string;
    titulo: string;
    contenido: string;
    }[];
};

export default function UsuarioYPublicaciones() {
    const [usuario, setUsuario] = useState<Usuario | null>(null);

    useEffect(() => {
        const usuarioId = "1";

    async function obtenerUsuarioYPublicaciones() {
      try {
        const usuario = await prisma.usuarios.findUnique({
          where: { id: usuarioId },
          include: {
            publicaciones: {
              select: {
                id: true,
                titulo: true,
                contenido: true,
              },
            },
          },
        });
        setUsuario(usuario);
      } catch (error) {
        console.error(error);
      } finally {
        await prisma.$disconnect();
      }
    }

    obtenerUsuarioYPublicaciones();
  }, []);

  return (
    <div>
      {usuario && (
        <div>
          <h2>Usuario: {usuario.nombre}</h2>
          <h3>Publicaciones:</h3>
          <ul>
            {usuario.publicaciones.map((publicacion) => (
              <li key={publicacion.id}>
                {publicacion.titulo} - {publicacion.contenido}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
