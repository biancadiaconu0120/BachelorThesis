from pydantic import BaseModel
from typing import List


class VideoUploadDTO(BaseModel):
    video: bytes


class PredictionResponseDTO(BaseModel):
    predicted_labels: List[str]
