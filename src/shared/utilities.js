const convertDate = (date) => {
  const dateOfRelease = new Date(date);
  // eslint-disable-next-line
  if (dateOfRelease == "Invalid Date") {
    return `No date found`;
  } else {
    const y = dateOfRelease.getFullYear();
    const m = dateOfRelease.getMonth() + 1;
    const d = dateOfRelease.getDate();

    return `${d}/${m}/${y}`;
  }
};

export { convertDate };
