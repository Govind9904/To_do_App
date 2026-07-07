import * as Notifications from "expo-notifications";

type ReminderTask = {
  title: string;
  dueDate?: string;
  description?: string;
};

export async function scheduleTaskReminder(task: ReminderTask) {
  if (!task.dueDate) return;

  const reminderDate = new Date(task.dueDate);

  reminderDate.setHours(9, 0, 0, 0);

  if (reminderDate <= new Date()) return;

  return await Notifications.scheduleNotificationAsync({
    content: {
      title: "Task Reminder",
      body: task.description,
      sound: true,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DATE,
      date: reminderDate,
      channelId: "default",
    },
  });
}
