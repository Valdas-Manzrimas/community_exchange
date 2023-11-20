interface ModalContainerProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  toggleModal: () => void;
  confirm?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
}

const ModalContainer: React.FC<ModalContainerProps> = ({
  title,
  children,
  isOpen,
  toggleModal,
  confirm,
  onConfirm,
  onCancel,
}) => {
  const visibilityClass = isOpen ? 'flex' : 'hidden';

  const handleContainerClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      toggleModal();
    }
  };

  return (
    <div
      tabIndex={-1}
      aria-hidden='true'
      className={`${visibilityClass} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-gray-800 bg-opacity-60`}
      onClick={handleContainerClick}
    >
      <div className='relative p-4 w-full max-w-2xl max-h-full'>
        <div className='relative bg-white rounded-lg shadow border-2 border-narvik-600'>
          {/* Header */}
          <div className='flex items-center justify-between p-4 md:p-5 border-b rounded-t '>
            <h3 className='text-xl font-semibold text-gray-900 '>{title}</h3>
            <button
              type='button'
              className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center'
              data-modal-hide='default-modal'
              onClick={toggleModal}
            >
              <svg
                className='w-3 h-3'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 14 14'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
                />
              </svg>
              <span className='sr-only'>Close modal</span>
            </button>
          </div>
          {/* Body */}
          <div className='p-4 md:p-5'>{children}</div>
          {/* Footer */}

          {confirm && (
            <div className='p-4 md:p-5 text-center'>
              <button
                data-modal-hide='popup-modal'
                type='button'
                className='text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2'
                onClick={onConfirm}
              >
                Yes, I'm sure
              </button>
              <button
                data-modal-hide='popup-modal'
                type='button'
                className='text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 '
                onClick={onCancel}
              >
                No, cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalContainer;
