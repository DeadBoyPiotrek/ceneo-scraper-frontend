import axios from 'axios';

export const deleteItemHandler = async name => {
  // console.log('deleteItem');
  const response = await axios.post(`/api/deleteItem`, { name });
};

export const addItemHandler = async name => {
  // console.log('addItem');
  // console.log('name', name);
  const response = await axios.post(`/api/addItem`, { name });
};

export const scrapeNowHandler = async names => {
  // console.log('names', names);
  // console.log('scrapeNow');
  //TODO fix naming
  const response = await axios.post(`/api/addItem`, { name: names });
};
