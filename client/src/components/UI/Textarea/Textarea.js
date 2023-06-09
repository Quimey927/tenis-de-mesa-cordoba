import classes from './Textarea.module.css';

const Textarea = ({ id, label, rows, defaultValue, required }) => {
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
      ></textarea>
    </div>
  );
};

export default Textarea;
