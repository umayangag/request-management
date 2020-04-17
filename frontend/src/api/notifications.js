import handler from './apiHandler';

export const getNotifications = async () => {
    return (await handler.get(`/notifications`)).data;
}

export const markAsRead = async(notificationId) => {
    return (await handler.get(`/notifications/${notificationId}/read`)).data;
}
