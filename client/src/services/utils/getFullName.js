export const getFullName = (
  first_name,
  middle_name,
  last_name,
  second_last_name
) => {
  return `${
    second_last_name ? `${last_name} ${second_last_name},` : `${last_name},`
  } ${middle_name ? `${first_name} ${middle_name}` : first_name}`;
};
