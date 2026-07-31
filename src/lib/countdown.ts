export interface CountdownState {
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isComplete: boolean;
}

export const calculateCountdown = (
  targetDate: Date,
  now: Date = new Date(),
): CountdownState => {
  if (now.getTime() >= targetDate.getTime()) {
    return {
      months: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isComplete: true,
    };
  }

  let months = 0;
  const cursor = new Date(now);

  while (true) {
    const next = new Date(cursor);
    next.setMonth(next.getMonth() + 1);

    if (next > targetDate) {
      break;
    }

    cursor.setMonth(cursor.getMonth() + 1);
    months += 1;
  }

  const remainderMs = targetDate.getTime() - cursor.getTime();
  const dayMs = 1000 * 60 * 60 * 24;
  const hourMs = 1000 * 60 * 60;
  const minuteMs = 1000 * 60;

  return {
    months,
    days: Math.floor(remainderMs / dayMs),
    hours: Math.floor((remainderMs % dayMs) / hourMs),
    minutes: Math.floor((remainderMs % hourMs) / minuteMs),
    seconds: Math.floor((remainderMs % minuteMs) / 1000),
    isComplete: false,
  };
};
