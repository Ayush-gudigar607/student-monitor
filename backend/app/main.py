from fastapi import FastAPI
from fastapi import Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sqlalchemy.exc import OperationalError

from app.api.routes import admin, analytics, auth, classes, leaderboard, marks, ml, performance, students
from app.core.config import settings

app = FastAPI(
    title=settings.app_name,
    version="1.0.0",
    openapi_url=f"{settings.api_prefix}/openapi.json",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(students.router, prefix=settings.api_prefix)
app.include_router(performance.router, prefix=settings.api_prefix)
app.include_router(marks.router, prefix=settings.api_prefix)
app.include_router(analytics.router, prefix=settings.api_prefix)
app.include_router(leaderboard.router, prefix=settings.api_prefix)
app.include_router(ml.router, prefix=settings.api_prefix)
app.include_router(auth.router, prefix=settings.api_prefix)
app.include_router(admin.router, prefix=settings.api_prefix)
app.include_router(classes.router, prefix=settings.api_prefix)


@app.exception_handler(OperationalError)
async def database_unavailable_handler(_: Request, __: OperationalError) -> JSONResponse:
    return JSONResponse(
        status_code=503,
        content={
            "detail": "Database unavailable. Start MySQL and verify DATABASE_URL in backend/.env.",
        },
    )


@app.get("/health", tags=["health"])
def health_check() -> dict[str, str]:
    return {"status": "ok"}
