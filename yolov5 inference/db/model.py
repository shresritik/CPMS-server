from sqlalchemy import Boolean, Column, ForeignKey, Integer, String

from .config import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    numberPlate = Column(String)
    numberImg = Column(String)
