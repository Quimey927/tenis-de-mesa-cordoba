import classes from './Input.module.css';

const Input = ({
  label,
  id,
  type,
  onChange,
  autoFocus,
  required,
  defaultValue,
}) => {
  return (
    <div className={classes.input}>
      <label htmlFor={id}>{label}</label>
      <input
        type={type ? type : 'text'}
        name={id}
        id={id}
        placeholder={`${label}...`}
        autoFocus={autoFocus ? true : false}
        required={required ? true : false}
        onChange={onChange ? onChange : () => {}}
        defaultValue={defaultValue ? defaultValue : ''}
      />
    </div>
  );
};

export default Input;
