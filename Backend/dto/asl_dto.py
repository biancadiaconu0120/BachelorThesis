from typing import List

from pydantic import BaseModel


class PredictionResponseDTO(BaseModel):
    predicted_labels: List[str]
