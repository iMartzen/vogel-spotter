import os
import datetime
import requests

from pathlib import Path
from dotenv import load_dotenv
from fastapi import FastAPI, Query
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles

load_dotenv()
STATION_ID = os.getenv("STATION_ID")

app = FastAPI()


@app.get("/api/detections")
def get_detections(locale: str = Query("nl")):
    try:
        one_hour_ago = (
            datetime.datetime.utcnow() - datetime.timedelta(hours=1)
        ).strftime("%Y-%m-%dT%H:%M:%SZ")
        response = requests.get(
            f"https://app.birdweather.com/api/v1/stations/{STATION_ID}/detections?locale={locale}&from={one_hour_ago}"
        )
        response.raise_for_status()
        bird_data = response.json()
        formatted_data = []
        for detection in bird_data.get("detections", []):
            formatted_data.append(
                {
                    "commonName": detection.get("species", {}).get(
                        "commonName",
                        "Unknown bird" if locale == "en" else "Onbekende vogel",
                    ),
                    "thumbnailUrl": detection.get("species", {}).get(
                        "thumbnailUrl", "fallback-image.jpg"
                    ),
                    "time": (
                        detection.get("timestamp", "").split("T")[1][:5]
                        if "T" in detection.get("timestamp", "")
                        else "Unknown time" if locale == "en" else "Onbekend tijdstip"
                    ),
                }
            )
        return JSONResponse(content={"detections": formatted_data})
    except requests.exceptions.RequestException:
        return JSONResponse(
            content={"error": "Er is een fout opgetreden bij het ophalen van data"},
            status_code=500,
        )


@app.get("/api/top25")
def get_top25(locale: str = Query("nl")):
    try:
        response = requests.get(
            f"https://app.birdweather.com/api/v1/stations/{STATION_ID}/species?locale={locale}&period=all&limit=25&order=detections_count&sort=desc"
        )
        response.raise_for_status()
        bird_data = response.json()
        formatted_data = []
        for species in bird_data.get("species", []):
            formatted_data.append(
                {
                    "commonName": species.get(
                        "commonName",
                        "Unknown bird" if locale == "en" else "Onbekende vogel",
                    ),
                    "thumbnailUrl": species.get("thumbnailUrl", "fallback-image.jpg"),
                    "count": species.get("detections", {}).get("total", 0),
                }
            )
        return JSONResponse(content={"top25": formatted_data})
    except requests.exceptions.RequestException:
        return JSONResponse(
            content={"error": "Er is een fout opgetreden bij het ophalen van data"},
            status_code=500,
        )


app.mount(
    "/",
    StaticFiles(directory=Path(__file__).parent / "frontend", html=True),
    name="frontend",
)
