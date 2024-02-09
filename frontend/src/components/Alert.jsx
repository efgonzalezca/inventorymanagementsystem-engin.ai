export const Alert = ({ id, message, type, onClose }) => {
  const className = `alert alert-${type} alert-dismissible fade show`;
  return (
    <div className={className}>
      <button type="button" className='close' data-dismiss="alert" aria-label="Close" onClick={() => onClose(id)}>
        <span aria-hidden="true">&times;</span>
      </button>
      <p>{message}</p>
    </div>
  )
}