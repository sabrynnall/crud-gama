import axios from 'axios';
import {User} from '../types';

const api = axios.create({
    baseURL: 'http://localhost:3333'
})

export const renderUsers = (): Promise<User[]> => {
    return api.get<User[]>('/users').then(response => response.data)
}

export const createUser = (user: Omit<User, 'id'>): Promise<User> => {
    return api.post<User>('/users', user).then(response => response.data)
}

export const deleteUser = async (id: number): Promise<void> => {
    await api.delete(`/users/${id}`)
}

export const updateUser = (id: number, user: Omit<User, 'id'>): Promise<User> => {
    return api.put<User>(`/users/${id}`, user).then(response => response.data)
}