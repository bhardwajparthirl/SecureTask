from sqlalchemy import Integer, Column, String, ForeignKey, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from database import Base


class Task(Base):
  __tablename__ = "tasks"

  id = Column(Integer, primary_key=True, index=True)

  title = Column(String(200), nullable=False)

  description = Column(String(500))

  category = Column(String(100))

  status = Column(String(100), nullable=False)

  user_id = Column(
    Integer,
    ForeignKey("users.id"),
    nullable=False
    )

  user = relationship("User",back_populates="tasks")

  created_at = Column(
    DateTime,
    server_default=func.now()
    )
