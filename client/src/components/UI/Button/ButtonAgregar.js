import classes from './Button.module.css';

const ButtonAgregar = ({ children, className, type, onClick, disabled }) => {
  const btnClasses = `${classes.btn} ${className ? className : ''}`;

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

export default ButtonAgregar;
