from .common import ProductSerializer
from comments.serializers.populated import PopulatedCommentSerializer
from categories.serializers.common import CategorySerializer
from jwt_auth.serializers.common import UserSerializer
from comments.serializers.common import CommentSerializer


class PopulatedProductSerializer(ProductSerializer):
    # Just like when we use the serializer in the controllers, if the field we're populating here is a list then we need to use many=True
    owner = UserSerializer()
    # categories = CategorySerializer(many=True)
