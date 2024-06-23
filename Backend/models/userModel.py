from mongoengine import DateTimeField, EmailField
from mongoengine import Document, StringField


class User(Document):
    email = EmailField(required=True, unique=True)
    password_hash = StringField(required=True)


class UserProfile(Document):
    email = EmailField(required=True, unique=True)
    name = StringField(required=True)
    date_of_birth = StringField(required=True)
    country = StringField(required=True)
