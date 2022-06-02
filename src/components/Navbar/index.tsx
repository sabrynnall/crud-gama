import React from 'react';
import {Navbar as NavbarComponent, Container, Button} from 'react-bootstrap';

interface NavbarProps {
    onClick: () => void
}

const Navbar: React.FC<NavbarProps> = ({onClick}) => {
  return (
    <NavbarComponent bg='light' expand='lg'>
    <Container fluid style={{padding: '0 10rem'}}>
      <NavbarComponent.Brand>CRUD-GAMA</NavbarComponent.Brand>
      <Button variant='outline-success' onClick={onClick}>
        Adicionar Usuário
      </Button>
    </Container>
  </NavbarComponent>
  );
}

export default Navbar;