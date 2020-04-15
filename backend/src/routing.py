from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from .ws_token_auth import TokenAuthMiddlewareStack
from .notifications import routing

application = ProtocolTypeRouter({
    'websocket': TokenAuthMiddlewareStack(
        URLRouter(
            routing.websocket_urlpatterns
        )
    )
})