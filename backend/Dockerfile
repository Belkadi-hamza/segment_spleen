FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Copy requirements first to leverage Docker cache
COPY requirements.txt .

# Install dependencies without cache
RUN pip install --no-cache-dir -r requirements.txt

# Copy your app source code
COPY . .

# Expose port 5000 (optional but good practice)
EXPOSE 5000

# Use gunicorn to run the Flask app
CMD ["gunicorn", "app:app", "--bind", "0.0.0.0:5000", "--workers", "1"]
