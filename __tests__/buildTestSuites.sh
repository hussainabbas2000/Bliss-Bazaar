#!/bin/bash

# Script: buildTestSuite.sh
# Usage: ./buildTestSuite.sh <email_address>

# Exit on any error
set -e

# Function to send email
send_email() {
    local email=$1
    local build_status=$2
    local test_status=$3
    echo -e "Subject: Build and Test Suite Status\n\nDid build run: ${build_status}\nDid tests pass: ${test_status}" | msmtp "$email"
}

# Check if email parameter is provided
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <email_address>"
    exit 1
fi

EMAIL="$1"

# Initialize statuses
BUILD_STATUS="False"
TEST_STATUS="False"

# Step 1: Build the project
echo "Building the project..."
if npm run build; then
    BUILD_STATUS="True"
else
    BUILD_STATUS="False"
fi

# Step 2: Run Jest test suites
echo "Running Jest tests..."
if npm test -- --runInBand; then
    TEST_STATUS="True"
else
    TEST_STATUS="False"
fi

# Step 3: Send results via email
echo "Sending results to $EMAIL..."
send_email "$EMAIL" "$BUILD_STATUS" "$TEST_STATUS"

echo "Build and Test Suite process completed."
