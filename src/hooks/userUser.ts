import { useEffect, useState } from 'react';
import { createUser, deleteUser, renderUsers, updateUser } from '../interfaces/users';
import { User } from '../types';


const useUser = () => {

    const [userList, setUsers] = useState<User[]>([] as User[])
    //1. count: demonstrar o valor da varável
    //2. setCount: alterar o valor da variável através de uma função

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
    //Função de edição de usuário
    const handleUpdateUser = async (id: number, user: Omit<User, 'id'>) => {
        const newUser = await updateUser(id, user)
        setUsers(
            oldUserList => oldUserList.map(
                oldUser => oldUser.id == newUser.id ? newUser : oldUser
            )
        )
    }

    return {
        userList,
        handleCreateUser,
        handleDeleteUser,
        handleUpdateUser,
    };
}

export default useUser;