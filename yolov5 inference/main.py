from fastapi import FastAPI, Depends, File, UploadFile
from fastapi.responses import FileResponse
from yolov5_tflite_webcam_inference import detect_video
from fastapi.middleware.cors import CORSMiddleware
import os
from sqlalchemy.orm import Session
from sqlalchemy import desc
import base64
from db.config import engine, SessionLocal
import db.model as model
import db.schemas as schemas
model.Base.metadata.create_all(bind=engine)
app = FastAPI()

origins = [
    "http://127.0.0.1:5173",
    "http://localhost",
    "http://localhost:8080",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# listDir = os.getcwd()

BASE_PATH = os.getcwd()
print(BASE_PATH)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/api/v1/upload/")
async def root():

    value = detect_video(weights=BASE_PATH+"/models/custom_plate.tflite", labels=BASE_PATH+"/labels/plate.txt", conf_thres=0.25, iou_thres=0.45,
                         img_size=640, webcam=0)

    print("inside main", value)
    # file_path = listDir + '\output\cropped\cropped1.jpg'
    with open(BASE_PATH+"/output/cropped/cropped1.jpg", "rb") as image2string:
        converted_string = base64.b64encode(image2string.read())
    # file = FileResponse(file_path, media_type='image/jpeg')
    return {"message": value, "file": converted_string}


@app.post("/api/v1/upload/")
async def publish(request: schemas.UserCreate, db: Session = Depends(get_db)):
    new_user = model.User(numOfPass=request.numOfPass,
                          plateImg=request.plateImg, numberPlate=request.numberPlate)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


@app.get("/api/v1/")
async def getAll(db: Session = Depends(get_db)):
    print(f"user: {model.User}")
    users = db.query(model.User).order_by(desc(model.User.id)).all()
    return users


@app.delete("/api/v1/delete/{id}")
async def deleteId(id, db: Session = Depends(get_db)):

    db.query(model.User).filter(
        model.User.id == id).delete(synchronize_session=False)
    db.commit()
    return {"deleted": "true"}

# --------------------------------
# Fingerprint data Integration
# --------------------------------


@app.post("/api/v1/new_driver/")
async def new_driver(request: schemas.DriverCreate, db: Session = Depends(get_db)):
    # Create new driver
    new_driver = model.Driver(username=request.username,
                              license_img=request.license_img, expiry_date=request.expiry_date, finger_id=request.finger_id)
    print(f"\n\nrequest: {request}")
    db.add(new_driver)
    db.commit()
    db.refresh(new_driver)
    return new_driver
    # return {"hi": "hello"}


@app.get("/api/v1/driver/{id}")
async def getAll(id, db: Session = Depends(get_db)):
    # e.g. http://localhost:8000/api/v1/driver/11
    # GEt one driver
    print(f"driver: {model.Driver}")
    # driver = db.query(model.Driver).order_by(
    #     desc(model.Driver.id)).all()
    # driver = db.query(model.Driver).filter_by(finger_id=id).first()
    driver = db.query(model.Driver).filter(
        model.Driver.finger_id == id).first()
    print(f"\n\n driver: {driver.expiry_date}")
    return driver
    # return {"hi": "Hello"}


@app.get("/api/v1/drivers")
async def getAll(db: Session = Depends(get_db)):
    # Get all the drivers
    print(f"driver: {model.Driver}")
    drivers = db.query(model.Driver).order_by(desc(model.Driver.id)).all()
    # driver = db.query(model.Driver).order_by(
    #     desc(model.Driver.id)).filter_by(id=id).first()
    return drivers
    # return {"hi": "Hello"}


@app.get("/api/user_data/{fingerprint_id}")
async def getAll(fingerprint_id, db: Session = Depends(get_db)):
    db.query(model.Driver).filter(
        model.Driver.fingerprint_id == id).delete(synchronize_session=False)
    model.Driver
    db.commit()
    users = db.query(model.User).order_by(desc(model.User.id)).all()
    return users
