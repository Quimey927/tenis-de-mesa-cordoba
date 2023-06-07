import classes from './Textarea.module.css';

const Textarea = ({ id, label, rows, defaultValue }) => {
  return (
    <div className={classes.textarea}>
      <label htmlFor={id}>{label}</label>
      <textarea
        id={id}
        name={id}
        label={label}
        rows={rows}
        defaultValue={defaultValue}
      ></textarea>
    </div>
  );
};

export default Textarea;
