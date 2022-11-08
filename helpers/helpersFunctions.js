import axios from 'axios';

export const deleteItemHandler = async name => {
  await axios.post(`/api/deleteItem`, { name });
};

export const addItemHandler = async name => {
  await axios.post(`/api/addItem`, { name });
};

export const scrapeNowHandler = async names => {
  //TODO fix naming
  await axios.post(`/api/addItem`, { name: names });
};
