document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formUsuario');
    const listaUsuarios = document.getElementById('usuarios');

    // Función para cargar y mostrar usuarios
    const loadUsuarios = async () => {
        try {
            const response = await fetch('/api/usuarios');
            const usuarios = await response.json();
            
            listaUsuarios.innerHTML = '';
            usuarios.forEach(usuario => {
                const div = document.createElement('div');
                div.className = 'usuario';
                div.innerHTML = `
                    <strong>${usuario.nombre}</strong>
                    <p>${usuario.apellido}</p>
                    <p>${usuario.direccion}</p>
                    <p>${usuario.telefono}</p>
                    <p>Edad: ${usuario.edad}</p>
                    <p>${usuario.correo}</p>
                `;
                listaUsuarios.appendChild(div);
            });
        } catch (error) {
            console.error('Error al cargar usuarios:', error);
        }
    };

    // Enviar datos del formulario
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const usuario = {
            nombre: document.getElementById('nombre').value,
            apellido: document.getElementById('apellido').value,
            direccion: document.getElementById('direccion').value,
            telefono: document.getElementById('telefono').value,
            edad: document.getElementById('edad').value,
            correo: document.getElementById('correo').value
        };

        try {
            const response = await fetch('/api/usuarios', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(usuario)
            });

            if (response.ok) {
                alert('Usuario guardado correctamente');
                form.reset();
                loadUsuarios(); // Actualizar la lista
            } else {
                alert('Error al guardar el usuario');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error de conexión');
        }
    });

    // Cargar usuarios al iniciar
    loadUsuarios();
});
