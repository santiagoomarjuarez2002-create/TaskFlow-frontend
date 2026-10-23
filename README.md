# TaskFlow - Gestor de tareas

## Descripción del proyecto

TaskFlow es una aplicación web que hice con React y Vite para organizar tareas, asignarles una prioridad y llevar un seguimiento de los pendientes.

La desarrollé para los Trabajos Prácticos Nº 5 y Nº 6 de Programación Web. Durante el proyecto trabajé con componentes, props, estados, efectos y navegación entre páginas.

## Funcionalidades

- Registro de usuarios, inicio y cierre de sesión.
- Acceso a la página de tareas después de iniciar sesión.
- Creación, edición y eliminación de tareas.
- Opción para marcar tareas como completadas o volver a dejarlas pendientes.
- Prioridades alta, media y baja.
- Fecha límite opcional para cada tarea.
- Filtros para ver todas las tareas, las pendientes o las completadas.
- Contador de tareas pendientes.
- Guardado de tareas en el navegador, separado por el correo de cada usuario.
- Diseño adaptable con React Bootstrap y estilos propios.

El registro y el inicio de sesión funcionan como una demostración. Las cuentas se guardan en memoria y se pierden al recargar la página. Las tareas quedan guardadas en localStorage, por lo que se pueden recuperar registrándose de nuevo con el mismo correo en el mismo navegador.

## Tecnologías utilizadas

- HTML5 y CSS3 para la estructura y los estilos.
- JavaScript para la lógica de la aplicación.
- React para crear la interfaz y los componentes.
- Vite para ejecutar el proyecto y generar la versión de producción.
- Bootstrap y React Bootstrap para los componentes visuales.
- React Router para la navegación y las rutas protegidas.
- Git y GitHub para el control de versiones.

## Conceptos de React implementados

Dividí la interfaz en componentes reutilizables y organicé las vistas en páginas. Usé props para pasar datos y funciones entre componentes, useState para manejar usuarios, tareas y filtros, y useEffect para guardar los cambios de las tareas en el navegador.

También utilicé map para mostrar la lista de tareas y React Router para configurar las rutas y controlar el acceso a la página de tareas.

## Estructura del proyecto

```text
src/
├── assets/
├── components/
│   ├── Navegacion.jsx
│   ├── Inicio.jsx
│   ├── Login.jsx
│   ├── Registro.jsx
│   ├── Tareas.jsx
│   ├── Tarea.jsx
│   ├── FormularioTarea.jsx
│   ├── FiltroTareas.jsx
│   └── PiePagina.jsx
├── pages/
│   ├── InicioPage.jsx
│   ├── LoginPage.jsx
│   ├── RegistroPage.jsx
│   └── TareasPage.jsx
├── App.jsx
├── App.css
├── index.css
└── main.jsx
```

## Instalación y ejecución

Para ejecutar el proyecto necesitás tener Node.js y npm instalados.

1. Cloná el repositorio:

```bash
git clone https://github.com/santiagoomarjuarez2002-create/TaskFlow-frontend.git
```

2. Entrá a la carpeta que se crea al clonarlo:

```bash
cd TaskFlow-frontend
```

3. Instalá las dependencias:

```bash
npm install
```

4. Iniciá el servidor de desarrollo:

```bash
npm run dev
```

5. Abrí la dirección que aparece en la terminal. Por lo general es http://localhost:5173/.

Para probar la aplicación, creá una cuenta desde Registro. Después vas a poder agregar tareas, editarlas y probar los filtros.

## Otros comandos

Para generar la versión de producción:

```bash
npm run build
```

Para verla de forma local después de generarla:

```bash
npm run preview
```

Para revisar el código con ESLint:

```bash
npm run lint
```

## Estrategias SEO

Configuré el idioma de la página en español, agregué un título descriptivo y una metadescripción en index.html. También usé etiquetas semánticas como main, section y footer, junto con encabezados h1 y h2 para organizar el contenido.

## Control de versiones

El repositorio está en GitHub: [TaskFlow-frontend](https://github.com/santiagoomarjuarez2002-create/TaskFlow-frontend).

Uso Git para registrar los cambios y mantener el historial del proyecto.

## Estado del proyecto

Es un proyecto académico en desarrollo para los Trabajos Prácticos Nº 5 y Nº 6 de Programación Web. La gestión de tareas funciona en el navegador y el registro de usuarios es demostrativo, sin conexión a un backend.
