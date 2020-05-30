from rest_framework import serializers
from django.contrib.auth.models import Permission, Group
from django.contrib.auth import get_user_model
from .models import Organization

User = get_user_model()

class PermissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Permission
        fields = ('name', 'codename')

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ['id','name']

class OrganizationSerializer(serializers.ModelSerializer):
    createdDate = serializers.ReadOnlyField(source="created_date")
    organizationType = serializers.CharField(source='organization_type', required=False, allow_null=True, allow_blank=True)

    class Meta:
        model = Organization
        exclude = ['organization_type', 'created_date']

class UserSerializer(serializers.ModelSerializer):
    uid = serializers.IntegerField(source="id")
    userName = serializers.CharField(source="username")
    isActive = serializers.CharField(source="is_active")
    displayname = serializers.SerializerMethodField('get_full_name')
    userPermissions = serializers.SerializerMethodField('get_permissions')
    isStaff = serializers.BooleanField(source="is_staff")
    entity = serializers.SerializerMethodField()
    profile = serializers.SerializerMethodField()

    def get_full_name(self, obj):
        return obj.first_name + " " + obj.last_name

    def get_entity(self, obj):
        if hasattr(obj, "profile"):
            if obj.profile.organization is not None:
                return {
                    "gid" : obj.profile.organization.code,
                    "name": obj.profile.organization.displayName
                }

        return None

    def get_profile(self, obj):
        if hasattr(obj, "profile"):
            profile = {}

            if obj.profile.organization is not None:
                profile["organization"] = {
                    "code": obj.profile.organization.code,
                    "name": obj.profile.organization.displayName,
                    "sn_name": obj.profile.organization.sn_name,
                    "tm_name": obj.profile.organization.tm_name
                }

            if obj.profile.division is not None:
                profile["division"] = {
                    "code": obj.profile.division.code,
                    "divisionType": obj.profile.division.division_type,
                    "name": obj.profile.division.name,
                    "sn_name": obj.profile.division.sn_name,
                    "tm_name": obj.profile.division.tm_name
                }

        return profile

    def get_permissions(self, obj):
        if hasattr(obj, "profile"):
            if obj.profile.level is not None:
                permissions = Permission.objects.filter(group=obj.profile.level.role)
                permission_data = map(lambda p: p.codename, permissions)
                return permission_data

        if obj.groups.count() > 0:
            group = obj.groups.all()[0]
            permissions = Permission.objects.filter(group=group)
            permission_data = map(lambda p: p.codename, permissions)
            return permission_data

        return []
        # return obj.get_group_permissions()

    class Meta:
        model = User
        fields = ('uid', 'userName', 'displayname', 'isActive', 'userPermissions', 'isStaff', 'entity', 'profile')
        # fields = "__all__"

