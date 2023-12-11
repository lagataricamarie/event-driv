import React, { useState } from 'react';
import { Button, Modal} from 'react-bootstrap';

const Category_List = ({ categories, onDelete, onUpdate }) => {
  const [showModal, setShowModal] = useState(false);
  const [editCategory, setEditCategory] = useState('');
  const [newCategoryName, setNewCategoryName] = useState('');

  const handleShowModal = (category) => {
    setShowModal(true);
    setEditCategory(category);
    setNewCategoryName(category); 
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditCategory('');
    setNewCategoryName('');
  };

  const formSubmit = (e) => {
    e.preventDefault();
    if (newCategoryName) {
      onUpdate(editCategory, newCategoryName);
      handleCloseModal();
    }setEditCategory('');
    setTimeout(() => {
      setShowModal(false);
    }, 500);
  };

 

  return (
    <div>
      <h2>Category List</h2>
      <table class="table">
      <thead class="table-dark">
          <tr>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category}>
              <td>{category}</td>
              <td>
                <Button onClick={() => handleShowModal(category)}>Edit</Button> &nbsp;
                <Button variant='danger' onClick={() => onDelete(category)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editCategory && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={formSubmit}>
              <input
                type="text"
                name="name"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                required
              />&nbsp;
              <button type="submit">Update Category</button>
            
            </form>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default Category_List;