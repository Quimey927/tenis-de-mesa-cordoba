export const getFullName = (
  first_name,
  middle_name,
  last_name,
  second_last_name
) => {
  return `${
    second_last_name
      ? `${last_name.toUpperCase()} ${second_last_name.toUpperCase()},`
      : `${last_name.toUpperCase()},`
  } ${middle_name ? `${first_name} ${middle_name}` : first_name}`;
};
