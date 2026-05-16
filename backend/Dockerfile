# Use a lightweight Python base image
FROM python:3.12-slim-bookworm

# Stop Python from generating .pyc files and enable real-time console logging
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory on the server
WORKDIR /app

# CRITICAL: Install system dependencies required by WeasyPrint
# CRITICAL: Install system dependencies required by WeasyPrint
RUN apt-get update && apt-get install -y \
    build-essential \
    python3-dev \
    python3-cffi \
    libcairo2 \
    libpango-1.0-0 \
    libpangocairo-1.0-0 \
    libgdk-pixbuf-2.0-0 \
    libffi-dev \
    shared-mime-info \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Install Gunicorn (production web server) and Postgres adapter
RUN pip install gunicorn psycopg2-binary dj-database-url

# Copy the rest of your Django project into the container
COPY . /app/

# Expose the port Fly will route traffic to
EXPOSE 8000

# Start the server using Gunicorn instead of the development server
# Replace 'core.wsgi' with whatever folder holds your wsgi.py file
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "core.wsgi:application"]


