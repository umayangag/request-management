from rest_framework import serializers
from .models import Notification
from ..custom_auth.serializers import UserSerializer
from ..incidents.serializers import IncidentSerializer

class NotificationSerializer(serializers.ModelSerializer):
    createdDate = serializers.DateTimeField(source="created_date")
    # incident = serializers.UUIDField(source="incident")
    incident = serializers.PrimaryKeyRelatedField(
                                            read_only=True,
                                            # This will properly serialize uuid.UUID to str:
                                            pk_field=serializers.UUIDField(format='hex_verbose'))

    class Meta:
        model = Notification
        fields = (
            "id",
            "notification_type",
            "is_read",
            "send_to",
            "actioned_by",
            "incident",
            "custom_messsage",
            "createdDate"
        )