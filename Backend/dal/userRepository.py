import logging

from models.userModel import User, UserProfile


class UserRepository:
    def find_by_email(self, email: str):
        logging.info(f"Querying user by email: {email}")
        return User.objects(email=email).first()

    def update_user_profile(self, email: str, name: str, date_of_birth: str, country: str):
        logging.info(f"Updating profile for user: {email}")
        user_profile = UserProfile.objects(email=email).first()
        if user_profile:
            user_profile.update(set__name=name, set__date_of_birth=date_of_birth, set__country=country)
        else:

            UserProfile(email=email, name=name, date_of_birth=date_of_birth, country=country).save()