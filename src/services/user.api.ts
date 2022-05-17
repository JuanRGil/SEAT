import axios from 'axios';

const userApi = `${process.env.REACT_APP_API_HOST}/user`;

const getAllUsers = () => axios.get(userApi);

const getUser = (userId: number | string) => axios.get(`${userApi}/${userId}`);

const saveUser = (user : { name: string,
  surname: string,
  age: number }) => axios.post(userApi, user);

export { getAllUsers, getUser, saveUser };
