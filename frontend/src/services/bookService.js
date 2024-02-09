import axios from 'axios';

const baseURL = 'http://localhost:4800/api';

export const getBooks = async (page, limit) => {
  try {
    const response = await axios.get(`${baseURL}/books`, {
      params: {
        page: page,
        limit:limit
      }
    })
    return response.data;
  } catch(error) {
    if(!error.response) {
      throw error;
    }
    if(error.response.status === 400) {
      const stringErrors = [];
      for (let key of Object.keys(error.response.data.errors)) {
        stringErrors.push(`${key}: ${error.response.data.errors[key].join('.\n')}`) ;
      }
      throw new Error(stringErrors.join('.\n'));
    }
    if(error.response.status === 500) {
      throw new Error('Service error');
    }
    throw error;
  }
}

export const createBook = async (bookData) => {
  try {
    const response = await axios.post(`${baseURL}/books`, bookData);
    return response.data;  
  } catch(error) {
    if(!error.response) {
      throw error;
    }
    if(error.response.status === 400) {
      const stringErrors = [];
      for (let key of Object.keys(error.response.data.errors)) {
        stringErrors.push(`${key}: ${error.response.data.errors[key].join('.\n')}`) ;
      }
      throw new Error(stringErrors.join('.\n'));
    }
    if(error.response.status === 500) {
      throw new Error('Service error');
    }
    throw error;
  }
}

export const updateBook = async (id, bookData) => {
  try {
    const response = await axios.put(`${baseURL}/books/${id}`, bookData);
    return response.data;  
  } catch(error) {
    if(!error.response) {
      throw error;
    }
    if(error.response.status === 400) {
      const stringErrors = [];
      for (let key of Object.keys(error.response.data.errors)) {
        stringErrors.push(`${key}: ${error.response.data.errors[key].join('.\n')}`) ;
      }
      throw new Error(stringErrors.join('.\n'));
    }
    if(error.response.status === 404) {
      throw new Error(error.response.data.message);
    }
    if(error.response.status === 500) {
      throw new Error('Service error');
    }
    throw error;
  }
}

export const deleteBook = async (id) => {
  try {
    const response = await axios.delete(`${baseURL}/books/${id}`);
    return response.data;  
  } catch(error) {
    if(!error.response) {
      throw error;
    }
    if(error.response.status === 404) {
      throw new Error(error.response.data.message);
    }
    if(error.response.status === 500) {
      throw new Error('Service error');
    }
    throw error;
  }
}