import axios from 'axios';

export const deleteItemHandler = async name => {
  console.log('deleteItem');
  const response = await axios.post(`/api/deleteItem`, { name });
};

export const addItemHandler = async name => {
  console.log('addItem');
  const response = await axios.post(`/api/addItem`, { name });
};
