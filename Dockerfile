FROM docker.io/library/python:3.9-slim

RUN apt-get update && apt-get install -y \
    gcc \
    libpq-dev \
    curl \
    && rm -rf /var/lib/apt/lists/*
RUN pip install --no-cache-dir pipenv

WORKDIR /app

COPY Pipfile Pipfile.lock /app/
RUN pipenv install --system --deploy

COPY src/ /app/

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
