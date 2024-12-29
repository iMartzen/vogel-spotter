import os
import datetime
import requests

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles

load_dotenv()
STATION_ID = os.getenv("STATION_ID")

app = FastAPI()


@app.get("/api/detections")
def get_detections():
    try:
        one_hour_ago = (
            datetime.datetime.utcnow() - datetime.timedelta(hours=1)
        ).strftime("%Y-%m-%dT%H:%M:%SZ")
        response = requests.get(
            f"https://app.birdweather.com/api/v1/stations/{STATION_ID}/detections?locale=nl&from={one_hour_ago}"
        )
        response.raise_for_status()
        bird_data = response.json()
        formatted_data = []
        for detection in bird_data.get("detections", []):
            formatted_data.append(
                {
                    "commonName": detection.get("species", {}).get(
                        "commonName", "Onbekende vogel"
                    ),
                    "thumbnailUrl": detection.get("species", {}).get(
                        "thumbnailUrl", "fallback-image.jpg"
                    ),
                    "time": (
                        detection.get("timestamp", "").split("T")[1][:5]
                        if "T" in detection.get("timestamp", "")
                        else "Onbekend tijdstip"
                    ),
                }
            )
        return JSONResponse(content={"detections": formatted_data})
    except requests.exceptions.RequestException:
        return JSONResponse(
            content={"error": "Er is een fout opgetreden bij het ophalen van data"},
            status_code=500,
        )


@app.get("/api/status")
def get_status():
    try:
        response = requests.get(
            f"https://app.birdweather.com/api/v1/stations/{STATION_ID}"
        )
        response.raise_for_status()
        status_data = response.json()
        latest_detection = status_data.get("latestValidDetectionAt", "")
        if latest_detection:
            latest_detection_time = datetime.datetime.strptime(
                latest_detection, "%Y-%m-%dT%H:%M:%S.%f%z"
            )
            one_hour_ago = datetime.datetime.now(
                datetime.timezone.utc
            ) - datetime.timedelta(hours=1)
            is_online = latest_detection_time > one_hour_ago
        else:
            is_online = False

        return JSONResponse(content={"status": is_online})
    except requests.exceptions.RequestException:
        return JSONResponse(
            content={"error": "Er is een fout opgetreden bij het ophalen van data"},
            status_code=500,
        )


app.mount("/", StaticFiles(directory="frontend", html=True), name="frontend")
