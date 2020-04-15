import json
from channels.generic.websocket import AsyncWebsocketConsumer

NOTIFICATION_GROUP_NAME = "notification-group"

class NotificationConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.channel_layer.group_add(
            NOTIFICATION_GROUP_NAME,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            NOTIFICATION_GROUP_NAME,
            self.channel_name
        )

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        payload = text_data_json['payload']

        await self.channel_layer.group_send(
            NOTIFICATION_GROUP_NAME,
            {
                'type': 'notify',
                'payload': payload,
                'send_to': 1
            }
        )

    # Receive group notification
    async def notify(self, event):
        try:
            payload = event['payload']
            send_to = event['send_to']

            if self.scope['user'].id == send_to:
                # Send message to WebSocket
                await self.send(text_data=json.dumps({
                    'type': 'notification',
                    'payload': payload
                }))
        except Exception as e:
            print("error", e)
            pass
        