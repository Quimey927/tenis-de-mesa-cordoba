import classes from './Select.module.css';

const Select = ({
  label,
  id,
  defaultValue,
  required = false,
  options,
  onChange = () => {},
  disabled = false,
  style = {},
}) => {
  return (
    <div className={classes.select}>
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        name={id}
        defaultValue={defaultValue}
        required={required}
        onChange={onChange}
        disabled={disabled}
        style={style}
      >
        {options.map((opt, i) => (
          <option key={opt.key ? opt.key : i} value={opt.value}>
            {opt.texto}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
