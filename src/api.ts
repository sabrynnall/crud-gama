import axios from 'axios';

interface User {
    id: number,
    nome: string,
    idade: number,
}

const api = axios.create({
    baseURL: 'http://localhost:3333'
})

export const renderUsers = (): Promise<User[]> => {
    return api.get<User[]>('/users').then(response => response.data)
}

export const createUser = (user: Omit<User, 'id'>): Promise<User> => {
    return api.post<User>('/users', user).then(response => response.data)
}