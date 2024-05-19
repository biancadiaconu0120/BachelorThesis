from pydantic import BaseModel, EmailStr, Field


class RegisterRequest(BaseModel):
    email: EmailStr
    password: str
    confirm_password: str


class RegisterResponse(BaseModel):
    message: str
    user_id: str


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class LoginResponse(BaseModel):
    message: str
    user_id: str


class UserProfileUpdateRequest(BaseModel):
    userEmail: EmailStr = Field(..., example="user@example.com")
    name: str = Field(..., min_length=1)
    date_of_birth: str  # Changed from 'date' to 'str'
    country: str = Field(..., min_length=2)


class UserProfileResponse(BaseModel):
    name: str
    date_of_birth: str  # Changed from 'date' to 'str'
    country: str


class MessageResponse(BaseModel):
    message: str


class ErrorResponse(BaseModel):
    error: str
