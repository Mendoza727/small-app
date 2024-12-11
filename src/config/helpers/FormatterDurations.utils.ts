export const FormaterDuration = (seconds: any) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.round(seconds % 60);

  let timeString = "";

  if (hours > 0) {
    timeString += `${hours}h `;
  }

  if (minutes > 0) {
    timeString += `${minutes}m `;
  }

  if (remainingSeconds > 0 || seconds === 0) {
    timeString += `${remainingSeconds}s`;
  }

  return timeString.trim();
};
