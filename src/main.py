import os
import datetime
import requests

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles

load_dotenv()
STATION_ID = os.getenv("STATION_ID")
print(STATION_ID)

app = FastAPI()


# BACKEND
@app.get("/api/detections")
def get_detections():
    try:
        one_hour_ago = (datetime.datetime.utcnow() - datetime.timedelta(hours=1)).strftime('%Y-%m-%dT%H:%M:%SZ')
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
    except requests.exceptions.RequestException as e:
        return JSONResponse(
            content={
                "error": "Er is een fout opgetreden bij het ophalen van data",
                "details": str(e),
            },
            status_code=500,
        )


# FRONTEND
app.mount("/", StaticFiles(directory="frontend", html=True), name="frontend")
