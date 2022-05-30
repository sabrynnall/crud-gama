import { Fragment, useEffect, useState } from 'react'
import { Navbar, Container, Button, Table, Modal, Form } from 'react-bootstrap'
import { useFormik } from 'formik'
import logo from './logo.svg'
import './App.css'
import { renderUsers, createUser } from './api'

interface User {
  id: number,
  nome: string,
  idade: number,
}

function App(): JSX.Element {
  // Estado dos usuários
  const [userList, setUsers] = useState<User[]>([] as User[])
  //1. count: demonstrar o valor da varável
  //2. setCount: alterar o valor da variável através de uma função

  // MODAL
  const [userCreateModal, setUserCreateModal] = useState<boolean>(false)
  //Estado inicial do componente
  useEffect(() => {
    renderUsers().then(users => setUsers(users))
  }, [])

  // Função para adicionar um novo usuário
  const handleCreateUser = async (user: Omit<User, 'id'>) => {
    const newUser = await createUser(user)
    setUsers(
      oldUserList => [...oldUserList, newUser]
    )
  }

  //Função abrir modal
  const handleOpenCreateUserModal = () => {
    setUserCreateModal(true)
  }

  //Função fechar modal
  const handleCloseCreateUserModal = () => {
    setUserCreateModal(false)
  }

  const formik = useFormik({
    initialValues: {
      nome:'',
      idade:0,
    },
    onSubmit: values => {
      handleCreateUser({
        nome: values.nome,
        idade: values.idade,
      })
      handleCloseCreateUserModal()
    }
  })

  return (
    <Fragment>
      {/*Navbar*/}
      <Navbar bg='light' expand='lg'>
        <Container fluid style={{padding: '0 10rem'}}>
          <Navbar.Brand>CRUD-GAMA</Navbar.Brand>
          <Button variant='outline-success' onClick={handleOpenCreateUserModal}>
            Adicionar Usuário
          </Button>
        </Container>
      </Navbar>
      {/*Container*/}
      <Container fluid='sm' style={{marginTop: 25}}>
        <h1>Lista de Usuários</h1>
        <Table striped borderless responsive hover variant='light'>
          <thead>
            <tr>
              <th>#</th>
              <th>Nome</th>
              <th>Idade</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {userList.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.nome}</td>
                <td>{user.idade}</td>
                <td>Ações</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
      {/*Modal de criação do usuário*/}
      <Modal show={userCreateModal} onHide={handleCloseCreateUserModal}>
        <Modal.Header closeButton>
          <Modal.Title>Criar Usuário</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className='mb-5'>
              <Form.Label>Nome</Form.Label>
              <Form.Control 
                id='nome' 
                type='text' 
                placeholder='Nome Completo' 
                value={formik.values.nome} 
                onChange={formik.handleChange}/>
            </Form.Group>
            <Form.Group className='mb-5'>
              <Form.Label>Idade</Form.Label>
              <Form.Control 
              id='idade' 
              type='number' 
              placeholder='Sua Idade' 
              value={formik.values.idade} 
              onChange={formik.handleChange}/>
            </Form.Group>
            <Form.Group>
              <Button variant='success' type='submit' style={{marginRight: 15}}>Salvar</Button>
              <Button variant='danger' onClick={formik.handleReset}>Limpar</Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </Fragment>
  )
}

export default App
