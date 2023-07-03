import classes from './Textarea.module.css';

const Textarea = ({
  id,
  label,
  rows,
  defaultValue,
  required,
  onChange,
  placeholder,
}) => {
  return (
    <div className={classes.textarea}>
      <label htmlFor={id}>{label}</label>
      <textarea
        id={id}
        name={id}
        label={label}
        rows={rows}
        defaultValue={defaultValue}
        required={required}
        onChange={onChange ? onChange : () => {}}
        placeholder={placeholder ? placeholder : ''}
      ></textarea>
    </div>
  );
};

export default Textarea;
