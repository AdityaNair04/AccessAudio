# Use an official Python runtime as a parent image
FROM python:3.10-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Install system dependencies for OpenCV and MediaPipe
RUN apt-get update && apt-get install -y \
    libgl1 \
    libglib2.0-0 \
    libsm6 \
    libxext6 \
    libxrender-dev \
    && rm -rf /var/lib/apt/lists/*

# Create a non-root user (Hugging Face recommendation)
RUN useradd -m -u 1000 user
USER user
ENV HOME=/home/user \
    PATH=/home/user/.local/bin:$PATH

# Set the working directory
WORKDIR $HOME/app

# Copy requirements and install dependencies
COPY --chown=user ml/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the backend code
COPY --chown=user ml/ ./ml/

# Hugging Face Spaces runs on port 7860 by default
EXPOSE 7860

# Command to run the application
# Note: We use 0.0.0.0 and port 7860 as required by Hugging Face
CMD ["uvicorn", "ml.streamtalk_backend:app", "--host", "0.0.0.0", "--port", "7860"]
