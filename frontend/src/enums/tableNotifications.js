const TABLE_NOTIFICATIONS = Object.freeze({
  LOADING_ERROR: 0,
  NO_DATA: 1,
});

export const getTableNotificationText = (code) => {
  if (code === TABLE_NOTIFICATIONS.LOADING_ERROR) {
    return "The data could not be loaded.";
  }
  if (code === TABLE_NOTIFICATIONS.NO_DATA) {
    return "There are no clients to display.";
  }
  return null;
};

export default TABLE_NOTIFICATIONS;
