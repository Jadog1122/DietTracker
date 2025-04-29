#!/bin/sh
set -e  # Exit if any command fails

echo "Setting up frontend..."
cd frontend
npm install
npm run build
cd ..

echo "Setting up backend..."
cd backend
npm install

echo "Environment check..."
echo "MONGODB_URI: $MONGODB_URI"

# echo "Seeding database..."
# node seed.js

echo "Starting server..."
node server.js