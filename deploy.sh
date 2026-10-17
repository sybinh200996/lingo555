#!/bin/bash
# ==============================================================================
# Lingo555 VPS One-Click Deployment Script
# ==============================================================================

set -e

echo "🚀 Bắt đầu triển khai Lingo555 lên VPS..."

# 1. Kiểm tra Docker & Docker Compose
if ! command -v docker &> /dev/null; then
    echo "⚠️ Docker chưa được cài đặt. Đang tự động cài đặt Docker..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    rm get-docker.sh
fi

# 2. Tạo file server/.env nếu chưa có
if [ ! -f "server/.env" ]; then
    echo "📝 Tạo file server/.env từ template .env.example..."
    cp server/.env.example server/.env
    echo "⚠️ Vui lòng cập nhật API Key vào server/.env nếu cần!"
fi

# 3. Tạo thư mục data nếu chưa có
mkdir -p server/data/uploads

# 4. Khởi chạy bằng Docker Compose
echo "🐳 Đang build và khởi chạy các container..."
docker compose down || true
docker compose up -d --build

echo "✅ Triển khai Lingo555 thành công!"
echo "🌐 Ứng dụng đang chạy tại: http://$(curl -s ifconfig.me || echo 'IP-VPS')"
echo "📊 Kiểm tra logs: docker compose logs -f"
