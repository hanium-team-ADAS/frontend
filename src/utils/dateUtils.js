export const getMinMaxDates = () => {
  const formatDate = (date) => date.toISOString().split('T')[0];

  const today = new Date();
  const fourWeeksLater = new Date(today);
  fourWeeksLater.setDate(today.getDate() + 28);

  return { 
      minDate: formatDate(today),
      maxDate: formatDate(fourWeeksLater) 
  };
};