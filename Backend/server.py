import logging

from fastapi import FastAPI

from api.asl_routes import router as asl_router
from api.userRoutes import router as user_router
from utils.dbConnection import init_db

app = FastAPI()

# Initialize database
init_db()

# Configure CORS middleware
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')

# Include routers
app.include_router(user_router, prefix="/user", tags=["Users"])
app.include_router(asl_router, prefix="/asl", tags=["ASL"])


@app.get("/")
def read_root():
    return {"message": "Welcome to the App API"}
