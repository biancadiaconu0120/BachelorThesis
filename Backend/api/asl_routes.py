import base64
import logging
import os
import sys

import aiofiles
from fastapi import APIRouter, Depends, HTTPException
from fastapi import File, UploadFile, Request
from fastapi.concurrency import run_in_threadpool
from fastapi.responses import JSONResponse

from dto.asl_dto import PredictionResponseDTO
from services.asl_service import InferenceService

router = APIRouter()


inference_service = InferenceService()


# def get_inference_service() -> InferenceService:
#     return InferenceService()


# # @router.post("/predict", response_model=PredictionResponseDTO)
# @router.post("/predict")
# async def predict(
#         # video: UploadFile = File(...),
#         video,
#         # inference_service: InferenceService = Depends(get_inference_service)
# ):
#     try:
#         async with aiofiles.tempfile.NamedTemporaryFile("wb", delete=False) as temp:
#             try:
#                 contents = await video.read()
#                 await temp.write(contents)
#             except Exception as e:
#                 raise HTTPException(status_code=400, detail=f"There was an error uploading the file: {str(e)}")
#             finally:
#                 await video.close()
#
#         predicted_labels = await run_in_threadpool(inference_service.process_video, temp.name)
#     except Exception as e:
#         raise HTTPException(status_code=400, detail=f"Error processing video: {str(e)}")
#     finally:
#         os.remove(temp.name)
#
#     return JSONResponse(content={"predicted_labels": predicted_labels})

@router.post("/predict")
async def predict(
        request: Request,
):
    try:
        async with aiofiles.tempfile.NamedTemporaryFile("wb", delete=False) as temp:
            try:
                contents = await request.body()
                await temp.write(contents)
            except Exception as e:
                raise HTTPException(status_code=400, detail=f"There was an error uploading the file: {str(e)}")

        predicted_labels = await run_in_threadpool(inference_service.process_video, temp.name)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error processing video: {str(e)}")
    finally:
        os.remove(temp.name)

    return JSONResponse(content={"predicted_labels": predicted_labels})
