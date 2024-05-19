from werkzeug.security import generate_password_hash, check_password_hash

from dal.userRepository import UserRepository
from models.userModel import User, UserProfile


class UserService:
    def __init__(self, user_repository: UserRepository):
        self.user_repository = user_repository

    def login_user(self, email: str, password: str):
        user = self.user_repository.find_by_email(email)
        if user and check_password_hash(user.password_hash, password):
            return user
        return None

    def register_user(self, email: str, password: str, confirm_password: str):
        if password != confirm_password:
            return {"error": "Passwords do not match"}

        existing_user = self.user_repository.find_by_email(email)
        if existing_user:
            return {"error": "Email already in use"}

        hashed_password = generate_password_hash(password)
        new_user = User(email=email, password_hash=hashed_password).save()
        return {"message": "Registration successful", "user_id": str(new_user.id)}

    def update_profile(self, email: str, name: str, date_of_birth: str, country: str):
        user = self.user_repository.find_by_email(email)
        if not user:
            return {"error": "User not found"}

        # Update the user profile
        self.user_repository.update_user_profile(email, name, date_of_birth, country)
        return {"message": "Profile updated successfully"}

    def get_user_profile(self, email: str):
        user_profile = UserProfile.objects(email=email).first()
        if user_profile:
            return user_profile
        else:
            return None
