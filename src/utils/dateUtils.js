export const getMinMaxDates = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');   // 월은 0부터 시작하므로 +1
    const dd = String(today.getDate()).padStart(2, '0');
    const todayStr = `${yyyy}-${mm}-${dd}`;
  
    // 4주(28일) 후 날짜 계산
    const fourWeeksLater = new Date(today);
    fourWeeksLater.setDate(today.getDate() + 28);
  
    const fourWeeksYyyy = fourWeeksLater.getFullYear();
    const fourWeeksMm = String(fourWeeksLater.getMonth() + 1).padStart(2, '0');
    const fourWeeksDd = String(fourWeeksLater.getDate()).padStart(2, '0');
    const fourWeeksStr = `${fourWeeksYyyy}-${fourWeeksMm}-${fourWeeksDd}`;
  
    return { minDate: todayStr, maxDate: fourWeeksStr };
  };
  