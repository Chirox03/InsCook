const extractDate = (timestamp: Date): Date => {
  // 26 May 2024 at 22:50:16 UTC+7
  if (timestamp==null)
    return new Date()
  let timestamp2=timestamp.toString()
  let values = []
  let val = ''
  for (let i = 0; i < timestamp2.length; i++) {
      if (timestamp2[i] == ' ' || timestamp2[i] == ':') {
          values.push({ val })
          val = ''
      } else {
          val = val + timestamp2[i]
      }
  }
  // console.log(values)
  // const day = values[0].val
  const day = parseInt(values[0]?.val, 10); // Convert to number
  const monthName = values[1]?.val.toString();
  const year = parseInt(values[2]?.val, 10); // Convert to number
  const hour = parseInt(values[4]?.val, 10); // Convert to number
  const minute = parseInt(values[5]?.val, 10); // Convert to number
  const seconds = parseInt(values[6]?.val, 10); // Convert to number

  // console.log(year)
  const months: { [key: string]: number } = {
      "January": 1,
      "February": 2,
      "March": 3,
      "April": 4,
      "May": 5,
      "June": 6,
      "July": 7,
      "August": 8,
      "September": 9,
      "October": 10,
      "November": 11,
      "December": 12
  };

  const month = months[monthName];
  // console.log(month)
  return new Date(year, month - 1, day, hour, minute, seconds); // Subtract 1 from month to match Date constructor's month numbering (0-indexed)
};

const DateCalculate = (timestamp: Date): string => {
  const now = new Date();
  // console.log(timestamp)
  const postDate = extractDate(timestamp)
  // console.log(now)
  // console.log(postDate)
  const seconds = Math.floor((now.getTime() - postDate.getTime()) / 1000);
  // console.log(seconds)
  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) return interval === 1 ? "1 year ago" : `${interval} years ago`;

  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) return interval === 1 ? "1 month ago" : `${interval} months ago`;

  interval = Math.floor(seconds / 86400);
  if (interval >= 1) return interval === 1 ? "1 day ago" : `${interval} days ago`;

  interval = Math.floor(seconds / 3600);
  if (interval >= 1) return interval === 1 ? "1 hour ago" : `${interval} hours ago`;

  interval = Math.floor(seconds / 60);
  if (interval >= 1) return interval === 1 ? "1 minute ago" : `${interval} minutes ago`;

  return "Just now";
};

export default DateCalculate;