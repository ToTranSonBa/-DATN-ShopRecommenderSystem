# Sử dụng Python 3.8 làm hình ảnh nền
FROM python:3.8-slim

# Cài đặt các gói hệ thống cần thiết
RUN apt-get update && apt-get install -y \
    build-essential \
    unixodbc-dev

# Thiết lập thư mục làm việc
WORKDIR /app

# Sao chép tệp yêu cầu vào hình ảnh Docker
COPY requirements.txt requirements.txt

# Cài đặt các gói yêu cầu
RUN pip install --no-cache-dir -r requirements.txt

# Sao chép mã nguồn vào hình ảnh Docker
COPY Schedule.py .

# # Sao chép cơ sở dữ liệu (nếu có)
# COPY data/search_data.db data/

# Lệnh chạy script
CMD ["python", "Schedule.py"]

