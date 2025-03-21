import ReactDom from 'react-dom';

export const Modal = ({ children, handleModalClose }) => {
  return ReactDom.createPortal(
    <div className='modal-container'>
      <button onClick={handleModalClose} className='modal-underlay' />
      <div className='modal-content'>{children}</div>
    </div>,

    document.getElementById('portal')
  );
};
