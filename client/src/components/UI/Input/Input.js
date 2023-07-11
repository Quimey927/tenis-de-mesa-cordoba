import classes from './Input.module.css';

const Input = ({
  label,
  id,
  type,
  onChange,
  autoFocus,
  required,
  disabled,
  defaultValue,
  readOnly,
  style = {},
  placeholder,
}) => {
  return (
    <div className={classes.input}>
      <label htmlFor={id}>{label}</label>
      <input
        type={type ? type : 'text'}
        name={id}
        id={id}
        placeholder={placeholder !== undefined ? placeholder : `${label}...`}
        autoFocus={autoFocus ? true : false}
        required={required ? true : false}
        disabled={disabled ? true : false}
        onChange={onChange ? onChange : () => {}}
        defaultValue={defaultValue ? defaultValue : ''}
        readOnly={readOnly ? readOnly : null}
        style={style}
      />
    </div>
  );
};

export default Input;
