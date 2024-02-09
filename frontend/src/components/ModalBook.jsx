import { useContext, useState } from 'react';

import { AlertContext } from '../context/AlertContext';

export const ModalBook = ({ onClose, onSave, onUpdate, selectedBook }) => {
  const { addAlert } = useContext(AlertContext);
  const [formData, setFormData] = useState({
    title: selectedBook ? selectedBook.title : '',
    author: selectedBook ? selectedBook.author : '',
    price: selectedBook ? selectedBook.price : '',
    stockQuantity: selectedBook ? selectedBook.stockQuantity : ''
  })
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    validateField(name, value, setErrors);
    setFormData({ ...formData, [name]: value });
  }
  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value, setErrors);
  }
  const validateField = (fieldName, fieldValue, setErrorState) => {
    const validations = {
      title: (value) => {
        const localErrors = [];
        if (!value.trim()) {
          localErrors.push('title is required.');
        }
        if (/^\s+|\s+$/.test(value)) {
          localErrors.push('title cannot have leading or trailing spaces.');
        }
        if (/\s\s+/.test(value)) {
          localErrors.push('title cannot have multiple consecutive spaces.');
        }
        if (value.length > 100) {
          localErrors.push('title must be less than 100 characters.');
        }
        return localErrors.join(' ');
      },
      author: (value) => {
        const localErrors = [];
        if (!value.trim()) {
          localErrors.push('author is required.');
        }
        if (/^\s+|\s+$/.test(value)) {
          localErrors.push('author cannot have leading or trailing spaces.');
        }
        if (/\s\s+/.test(value)) {
          localErrors.push('author cannot have multiple consecutive spaces.');
        }
        if (value.length > 100) {
          localErrors.push('author must be less than 100 characters.');
        }
        return localErrors.join(' ');
      },
      price: (value) => {
        const localErrors = [];
        if (!value || isNaN(parseFloat(value))) {
          localErrors.push('price must be a valid number.');
        }
        if (parseFloat(value) <= 0) {
          localErrors.push('price must be greater than 0.');
        }
        return localErrors.join(' ');
      },
      stockQuantity: (value) => {
        const localErrors = [];
        if (!value || parseInt(value) !== parseFloat(value)) {
          localErrors.push('stockQuantity must be a valid number.');
        }
        if (parseInt(value) < 0) {
          localErrors.push('stockQuantity cannot be negative.');
        }
        return localErrors.join(' ');
      },
    }
    const error = validations[fieldName](fieldValue);
    setErrorState((prevErrors) => ({
      ...prevErrors,
      [fieldName]: error || ''
    }))
  }
  const handleSubmit = () => {
    const hasErrors = Object.values(errors).some((error) => !!error);
    const hasEmptyFields = Object.values(formData).some((value) => !value.trim());
    if (!hasErrors && !hasEmptyFields) {
      if(selectedBook) {
        onUpdate(formData);
      } else {
        onSave(formData);
      }
    } else {
      if(hasEmptyFields) {
        for (const field of Object.keys(formData)) {
          validateField(field, formData[field], setErrors);
        }
      }
      addAlert('Please fix the validation errors before submitting.', 'danger');
    }
  }
  const errorStyle = {
    color: 'red',
    fontSize: '12px'
  }
  return (
    <div className='modal-overlay' onClick={onClose}>
      <div className='modal' onClick={(e) => e.stopPropagation()}>
        <button type="button" className='close-button' data-dismiss="alert" aria-label="Close" onClick={onClose}>
          <span aria-hidden="true">&times;</span>
        </button>
        <h2>{selectedBook ? 'Edit Book' : 'Add Book'}</h2>
        <label>
          Title: {errors.title && <span style={errorStyle}>{errors.title}</span>}
        </label>
        <input type="text" maxLength="100" name="title" value={formData.title} onBlur={handleBlur} onChange={handleChange} />
        <label>
          Author: {errors.author && <span style={errorStyle}>{errors.author}</span>}
        </label>
        <input type="text" maxLength="100" name="author" value={formData.author} onBlur={handleBlur} onChange={handleChange} />
        <label>
          Price: {errors.price && <span style={errorStyle}>{errors.price}</span>}
        </label>
        <input type="number" min="0" name="price" value={formData.price} onBlur={handleBlur} onChange={handleChange} />
        <label>
          Stock Quantity: {errors.stockQuantity && <span style={errorStyle}>{errors.stockQuantity}</span>}
        </label>
        <input type="number" min="0" name="stockQuantity" value={formData.stockQuantity} onBlur={handleBlur} onChange={handleChange} />
        <div className='buttons'>
          <button onClick={handleSubmit}>{selectedBook ? 'Update' : 'Add'}</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  )
}