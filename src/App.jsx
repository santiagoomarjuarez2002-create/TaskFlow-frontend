import './App.css'

function App() {
  return (
    <>
      <header className="encabezado">
        <h1>TaskFlow</h1>

        <nav>
          <a href="#inicio">Inicio</a>
          <a href="#tareas">Mis tareas</a>
        </nav>
      </header>

      <main>
        <section id="inicio" className="presentacion">
          <h2>Bienvenido a TaskFlow</h2>
          <p>Organizá tus tareas de manera fácil y rápida.</p>
          <a href="#tareas" className="boton">
            Ver mis tareas
          </a>
        </section>

        <section id="tareas" className="seccion-tareas">
          <h2>Mis tareas</h2>
          <p>Acá vamos a mostrar y administrar tus tareas.</p>
        </section>
      </main>

      <footer className="pie-pagina">
        <p>TaskFlow - Proyecto de Programación Web</p>
      </footer>
    </>
  )
}

export default App