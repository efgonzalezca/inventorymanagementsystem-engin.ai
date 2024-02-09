export const ModalConfirmation = ({ book, onConfirm, onClose }) => {
  const handleConfirm = () => {
    onConfirm(book);
    onClose();
  }
  const handleCancel = () => {
    onClose();
  }
  return (
    <div className='modal-overlay'>
      <div className='modal'>
        <h2>{ `Are you sure to delete ${book.title} book?` }</h2>
        <div className='buttons'>
          <button onClick={handleConfirm}>Delete</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </div>
  )
}