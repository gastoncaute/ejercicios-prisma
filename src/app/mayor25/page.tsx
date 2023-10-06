import React, { useEffect, useState } from 'react';

async function obtenerUsuarios() {
    const res = await fetch("http://localhost:3000/api/usuarios", {
    cache: "no-store"
    });
    const datos = await res.json();
    return datos;
}

type Usuario = {
    id: string;
    nombre: string;
    edad: number;
    email: string;
    password: string;
    activo: boolean;
}

export default async function Pagina() {
    const usuarios = await obtenerUsuarios();

    const usuariosMayoresDe25 = usuarios.filter((usuario: Usuario) => usuario.edad > 25);

    return (
        <section>
            <h2>Usuarios Mayores de 25</h2>
            <ul>
                {usuariosMayoresDe25.map((usuario: Usuario) => (
                <li key={usuario.id}>
                    {usuario.nombre} - {usuario.edad}
                </li>
                ))}
            </ul>
        </section>
    );
}
