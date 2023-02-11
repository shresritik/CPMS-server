from pydantic import BaseModel


class UserCreate(BaseModel):
    id: int
    numberPlate: str
    plateImg: str
