import classes from './Select.module.css';

const Select = ({
  label,
  id,
  defaultValue,
  options,
  onChange = () => {},
  disabled = false,
}) => {
  return (
    <div className={classes.select}>
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        name={id}
        defaultValue={defaultValue}
        onChange={onChange}
        disabled={disabled}
      >
        {options.map((opt) => (
          <option key={opt.key ? opt.key : null} value={opt.value}>
            {opt.texto}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
