from sqlalchemy import Integer, String, Float
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class Student(Base):
    __tablename__ = "students"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)

    name: Mapped[str] = mapped_column(String(100), nullable=False)

    roll_number: Mapped[int] = mapped_column(Integer, unique=True, nullable=False)

    student_class: Mapped[str] = mapped_column(String(20), nullable=False)

    section: Mapped[str] = mapped_column(String(10), nullable=False)

    age: Mapped[int] = mapped_column(Integer, nullable=False)

    email: Mapped[str] = mapped_column(String(100), nullable=False)

    phone: Mapped[str] = mapped_column(String(20), nullable=False)

    attendance: Mapped[float] = mapped_column(Float, default=0)

    fee_status: Mapped[str] = mapped_column(String(20), default="Pending")
