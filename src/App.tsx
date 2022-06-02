import { Fragment, useEffect, useState } from 'react'
import Navbar from './components/Navbar';
import UserTable from './components/UserTable';
import ModalCreateUser from './components/ModalCreateUser';
import './App.css';
import { renderUsers, createUser, deleteUser } from './api';
import {User} from './types';

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

  //Função de exclusão de usuário
  const handleDeleteUser = async (id: number) => {
    await deleteUser(id)
    setUsers(
      oldUserList => oldUserList.filter(user => user.id != id)
    )
  }
  //Função de edição de usuári

  //Função abrir modal
  const handleOpenCreateUserModal = () => {
    setUserCreateModal(true)
  }

  //Função fechar modal
  const handleCloseCreateUserModal = () => {
    setUserCreateModal(false)
  }

  return (
    <Fragment>
      {/*Navbar*/}
      <Navbar onClick={handleOpenCreateUserModal} />
      {/*Container*/}
      <UserTable users={userList} onDelete={handleDeleteUser}/>
      {/*Modal de criação do usuário*/}
      <ModalCreateUser 
      show={userCreateModal}
      createUser={handleCreateUser}
      onHide={handleCloseCreateUserModal}/>
      {/*Modal de edição do usuário*/}

      
    </Fragment>
  )
}

export default App
