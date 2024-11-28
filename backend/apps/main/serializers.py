from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from .models import *

User = get_user_model()


class CustomAuthTokenSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        if email and password:
            user = authenticate(request=self.context.get(
                'request'), username=email, password=password)
            if not user:
                raise serializers.ValidationError('Invalid credentials')
        else:
            raise serializers.ValidationError(
                'Must include "email" and "password".')

        attrs['user'] = user
        return attrs


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, validators=[validate_password])

    class Meta:
        model = User
        fields = ['username', 'password', 'email']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            email=validated_data['email']
        )
        return user


class UserSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    def get_image(self, obj):
        if obj.image:
            return base64.b64encode(obj.image).decode('utf-8')
        return None

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'image']


class UserImageSerializer(serializers.ModelSerializer):
    image = serializers.CharField(
        required=False, allow_blank=True, allow_null=True)

    class Meta:
        model = CustomUser
        fields = ['image']

    def validate_image(self, value):
        if value:
            try:
                base64.b64decode(value)
            except Exception:
                raise serializers.ValidationError(
                    "Invalid base64 encoded image")
        return value

    def update(self, instance, validated_data):
        image_data = validated_data.get('image')
        if image_data:
            instance.image = base64.b64decode(image_data)
        else:
            instance.image = None
        instance.save()
        return instance


class ChangeUsernameSerializer(serializers.Serializer):
    new_username = serializers.CharField(max_length=150)

    def validate_new_username(self, value):
        if CustomUser.objects.filter(username=value).exists():
            raise serializers.ValidationError(
                "This username is already taken.")
        return value


class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True, write_only=True)
    new_password = serializers.CharField(required=True, write_only=True)

    def validate_new_password(self, value):
        try:
            validate_password(value)
        except serializers.ValidationError as e:
            raise serializers.ValidationError({"error": str(e)})
        return value

    def validate(self, data):
        user = self.context['request'].user
        if not user.check_password(data['old_password']):
            raise serializers.ValidationError(
                {"error": "The old password is incorrect."})
        return data

    def save(self, **kwargs):
        user = self.context['request'].user
        user.set_password(self.validated_data['new_password'])
        user.save()
        return user
