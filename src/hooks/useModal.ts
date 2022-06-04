import { useState } from 'react';
import { User } from '../types';

// import { Container } from './styles';

const useModal = () => {
    const [userCreateModal, setUserCreateModal] = useState<boolean>(false);
    const [userEditModal, setUserEditModal] = useState<User>({} as User);

    //Função abrir modal
    const handleOpenCreateUserModal = () => {
        setUserCreateModal(true)
    }

    //Função fechar modal
    const handleCloseCreateUserModal = () => {
        setUserCreateModal(false)
    }

    //Função para abrir o modal de edição
    const handleOpenEditUserModal = (user: User) => {
        {
            setUserEditModal(user)
        }
    }

    //Função para fechar o modal de edição
    const handleCloseEditUserModal = () => {
        setUserEditModal({} as User)

    }

    return { 
        userCreateModal,
        handleOpenCreateUserModal,
        handleCloseCreateUserModal, 
        userEditModal,
        handleOpenEditUserModal,
        handleCloseEditUserModal
        };
}

export default useModal;