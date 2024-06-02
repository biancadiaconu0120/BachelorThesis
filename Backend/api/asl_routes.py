from fastapi import APIRouter, Depends
from fastapi import UploadFile, File
from fastapi.responses import JSONResponse

from dto.asl_dto import PredictionResponseDTO
from services.asl_service import InferenceService

router = APIRouter()


def get_inference_service() -> InferenceService:
    return InferenceService()


@router.post("/predict", response_model=PredictionResponseDTO)
async def predict(
        video: UploadFile = File(...),
        inference_service: InferenceService = Depends(get_inference_service)
):
    video_bytes = await video.read()
    predicted_labels = inference_service.process_video(video_bytes)
    return JSONResponse(content={"predicted_labels": predicted_labels})
