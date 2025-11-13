#!/bin/bash

# Cusdis Self-Hosting Quick Start Script
# This script helps you quickly deploy Cusdis locally

set -e

echo "========================================"
echo "Cusdis Self-Hosting Quick Start"
echo "========================================"
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    echo "   Visit: https://docs.docker.com/get-docker/"
    exit 1
fi

# Check if Docker Compose is available
if ! docker compose version &> /dev/null; then
    echo "❌ Docker Compose is not available. Please install Docker Compose."
    exit 1
fi

echo "✅ Docker and Docker Compose are installed"
echo ""

# Check if .env.cusdis exists
if [ ! -f ".env.cusdis" ]; then
    echo "📝 Creating .env.cusdis from example..."
    cp .env.cusdis.example .env.cusdis

    # Generate secure passwords
    JWT_SECRET=$(openssl rand -base64 32 | tr -d '\n')
    DB_PASSWORD=$(openssl rand -base64 16 | tr -d '\n')
    ADMIN_PASSWORD=$(openssl rand -base64 12 | tr -d '\n')

    # Update .env.cusdis with generated values
    sed -i.bak "s|JWT_SECRET=.*|JWT_SECRET=$JWT_SECRET|" .env.cusdis
    sed -i.bak "s|DB_PASSWORD=.*|DB_PASSWORD=$DB_PASSWORD|" .env.cusdis
    sed -i.bak "s|ADMIN_PASSWORD=.*|ADMIN_PASSWORD=$ADMIN_PASSWORD|" .env.cusdis
    rm .env.cusdis.bak

    echo "✅ Generated .env.cusdis with secure passwords"
    echo ""
    echo "📋 Your credentials:"
    echo "   Username: admin"
    echo "   Password: $ADMIN_PASSWORD"
    echo ""
    echo "⚠️  IMPORTANT: Save these credentials! They're in .env.cusdis"
    echo ""
else
    echo "✅ Found existing .env.cusdis"
    echo ""
fi

# Start Cusdis
echo "🚀 Starting Cusdis..."
echo ""

docker compose -f cusdis-docker-compose.yml --env-file .env.cusdis up -d

echo ""
echo "⏳ Waiting for services to be ready..."
sleep 5

# Check if services are running
if docker ps | grep -q cusdis; then
    echo ""
    echo "========================================"
    echo "✅ Cusdis is now running!"
    echo "========================================"
    echo ""
    echo "📍 Access Cusdis at: http://localhost:3001"
    echo ""
    echo "🔑 Login credentials:"
    echo "   Username: admin"
    echo "   Password: (check .env.cusdis file)"
    echo ""
    echo "📝 Next steps:"
    echo "   1. Open http://localhost:3001 in your browser"
    echo "   2. Login with admin credentials"
    echo "   3. Create a new website"
    echo "   4. Copy the App ID"
    echo "   5. Add to your blog's .env.local:"
    echo "      NEXT_PUBLIC_CUSDIS_APP_ID=your-app-id"
    echo "      NEXT_PUBLIC_CUSDIS_HOST=http://localhost:3001"
    echo ""
    echo "📖 Full guide: CUSDIS_SELFHOST_GUIDE.md"
    echo ""
    echo "🛠️  Useful commands:"
    echo "   View logs:    docker compose -f cusdis-docker-compose.yml logs -f"
    echo "   Stop:         docker compose -f cusdis-docker-compose.yml down"
    echo "   Restart:      docker compose -f cusdis-docker-compose.yml restart"
    echo ""
else
    echo ""
    echo "❌ Failed to start Cusdis"
    echo ""
    echo "📋 Check logs with:"
    echo "   docker compose -f cusdis-docker-compose.yml logs"
    echo ""
    exit 1
fi
