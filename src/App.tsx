import { Fragment, useEffect, useState } from 'react'
import Navbar from './components/Navbar';
import UserTable from './components/UserTable';
import ModalCreateUser from './components/ModalCreateUser';
import ModalEditUser from './components/ModalEditUser';
import './App.css';
import { renderUsers, createUser, deleteUser, updateUser } from './interfaces/users';
import { User } from './types';
import useModal from './hooks/useModal'
import userUser from './hooks/userUser';

function App(): JSX.Element {

  // MODAL
  const {
    userCreateModal,
    handleOpenCreateUserModal,
    handleCloseCreateUserModal,
    userEditModal,
    handleOpenEditUserModal,
    handleCloseEditUserModal
  } = useModal()

  const {
    userList,
    handleCreateUser,
    handleDeleteUser,
    handleUpdateUser,
  } = userUser()

  return (
    <Fragment>
      {/*Navbar*/}
      <Navbar onClick={handleOpenCreateUserModal} />
      {/*Container*/}
      <UserTable
        onClick={handleOpenEditUserModal}
        users={userList}
        onDelete={handleDeleteUser} />
      {/*Modal de criação do usuário*/}
      <ModalCreateUser
        show={userCreateModal}
        createUser={handleCreateUser}
        onHide={handleCloseCreateUserModal} />
      {/*Modal de edição do usuário*/}
      <ModalEditUser
        show={userEditModal}
        updateUser={handleUpdateUser}
        onHide={handleCloseEditUserModal} />
    </Fragment>
  )
}

export default App
