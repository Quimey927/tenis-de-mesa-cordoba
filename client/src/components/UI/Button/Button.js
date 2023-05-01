import classes from './Button.module.css';

const Button = ({ children, className, type, onClick, disabled }) => {
  const btnClasses = `${classes['ui-btn']} ${className ? className : ''}`;

  return (
    <button
      type={type ? type : 'button'}
      className={btnClasses}
      onClick={onClick ? onClick : () => {}}
      disabled={disabled ? disabled : false}
    >
      {children}
    </button>
  );
};

export default Button;
