from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app import crud, schemas

router = APIRouter(prefix="/students", tags=["Students"])


@router.get("/", response_model=list[schemas.StudentResponse])
def read_students(db: Session = Depends(get_db)):
    return crud.get_students(db)


@router.get("/{student_id}", response_model=schemas.StudentResponse)
def read_student(student_id: int, db: Session = Depends(get_db)):
    student = crud.get_student(db, student_id)

    if not student:
        raise HTTPException(status_code=404, detail="Student not found")

    return student


@router.post("/", response_model=schemas.StudentResponse, status_code=201)
def create_student(student: schemas.StudentCreate, db: Session = Depends(get_db)):
    return crud.create_student(db, student)


@router.put("/{student_id}", response_model=schemas.StudentResponse)
def update_student(
    student_id: int, student: schemas.StudentUpdate, db: Session = Depends(get_db)
):
    updated = crud.update_student(db, student_id, student)

    if not updated:
        raise HTTPException(status_code=404, detail="Student not found")

    return updated


@router.delete("/{student_id}")
def delete_student(student_id: int, db: Session = Depends(get_db)):
    deleted = crud.delete_student(db, student_id)

    if not deleted:
        raise HTTPException(status_code=404, detail="Student not found")

    return {"message": "Student deleted successfully"}
