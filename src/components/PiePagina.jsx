import Container from 'react-bootstrap/Container'

function PiePagina({ nombreProyecto }) {
  return (
    <footer className="pie-pagina">
      <Container>
        <p className="mb-0">
          {nombreProyecto} - Proyecto de Programación Web
        </p>
      </Container>
    </footer>
  )
}

export default PiePagina