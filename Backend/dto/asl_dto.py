from typing import Dict

from pydantic import BaseModel


class PredictionResponseDTO(BaseModel):
    predicted_labels: Dict[str, int]
