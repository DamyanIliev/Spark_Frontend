const CustomButton = ({ title, containerStyles, iconRight, type, onClick, disabled  }) => {
    return (
      <button
        disabled={disabled}
        onClick={onClick}
        type={type || "button"}
        className={`inline-flex items-center text-base ${containerStyles}`}
      >
        {title}
  
        {iconRight && <div className='ml-2'>{iconRight}</div>}
      </button>
    );
  };
  
  export default CustomButton;