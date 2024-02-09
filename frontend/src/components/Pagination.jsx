export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handleClick = (type) => {
    if (type === 'prev') {
      onPageChange(currentPage - 1);
    } else if (type === 'next') {
      onPageChange(currentPage + 1);
    }
  }
  return (
    <div className='pagination'>
      <button onClick={() => handleClick('prev')} disabled={currentPage === 1}>
        {'<'}
      </button>
      <span>{currentPage} of {totalPages}</span>
      <button onClick={() => handleClick('next')} disabled={currentPage >= totalPages}>
        {'>'}
      </button>
    </div>
  )
}