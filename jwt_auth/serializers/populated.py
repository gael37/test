from .common import UserSerializer
from products.serializers.populated import PopulatedProductSerializer
# from categories.serializers.common import CategorySerializer
from comments.serializers.populated import PopulatedCommentSerializer
from comments.serializers.common import CommentSerializer


class PopulatedUserSerializer(UserSerializer):
    # Just like when we use the serializer in the controllers, if the field we're populating here is a list then we need to use many=True
    products = PopulatedProductSerializer(many=True)
    commentsSent = PopulatedCommentSerializer(many=True)
    commentsReceived = PopulatedCommentSerializer(many=True)
