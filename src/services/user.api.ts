import axios from 'axios';

const userApi = `${process.env.REACT_APP_API_HOST}/user`;

const getUser = (userId: number | string) => axios.get(`${userApi}/${userId}`);

const saveUser = (user : { name: string,
  surname: string,
  age: number }) => axios.post(userApi, user);

export { getUser, saveUser };
