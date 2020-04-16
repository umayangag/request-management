from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Notification
from .serializers import NotificationSerializer
from .services import get_notification_by_id, read_notification

class NotificationList(APIView):
    serializer_class = NotificationSerializer

    def get(self, request, format=None):
        user = request.user
        notifications = Notification.objects.all().filter(send_to=user)
        serializer = NotificationSerializer(notifications, many=True)
        return Response(serializer.data)

class NotificationRead(APIView):
    serializer_class = NotificationSerializer

    def get(self, request, notification_id, format=None):
        notification = get_notification_by_id(notification_id)
        read_notification(notification)

        return Response({ "message": "Notification read" })