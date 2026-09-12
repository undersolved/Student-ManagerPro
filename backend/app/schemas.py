from pydantic import BaseModel, ConfigDict, EmailStr, Field


class StudentBase(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    roll_number: int = Field(..., gt=0)
    student_class: str = Field(..., min_length=1, max_length=20)
    section: str = Field(..., min_length=1, max_length=10)
    age: int = Field(..., ge=3, le=100)
    email: EmailStr
    phone: str = Field(..., min_length=10, max_length=20)
    attendance: float = Field(default=0, ge=0, le=100)
    fee_status: str = Field(default="Pending")


class StudentCreate(StudentBase):
    pass


class StudentUpdate(StudentBase):
    pass


class StudentResponse(StudentBase):
    id: int

    model_config = ConfigDict(from_attributes=True)
