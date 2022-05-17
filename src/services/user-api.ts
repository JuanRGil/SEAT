import axios from 'axios';
import { User } from './types/User';

const userApi = `${process.env.REACT_APP_API_HOST}/user`;

const getAllUsers = () => axios.get(userApi);

const getUser = (userId: number | string) => axios.get(`${userApi}/${userId}`);

const updateUser = (user: User) => axios.put(`${userApi}/${user.id}`, user);
const deleteUser = (userId: number | string) => axios.delete(`${userApi}/${userId}`);

const saveUser = (user: User) => axios.post(userApi, user);

export {
  getAllUsers, getUser, saveUser, updateUser, deleteUser,
};
