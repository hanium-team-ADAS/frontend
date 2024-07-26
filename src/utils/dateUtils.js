export const getMinMaxDates = () => {
  const formatDate = (date) => date.toISOString().split('T')[0];

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const fourWeeksLater = new Date(tomorrow);
  fourWeeksLater.setDate(tomorrow.getDate() + 28);

  return { 
      minDate: formatDate(tomorrow),
      maxDate: formatDate(fourWeeksLater) 
  };
};