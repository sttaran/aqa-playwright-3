# Base image
FROM mcr.microsoft.com/playwright:v1.42.1-jammy

# Copy project files
COPY . /plawright-tests

# Set working directory
WORKDIR /plawright-tests

# Install dependencies
RUN npm ci

# Run tests
CMD ["npm", "run", "test:e2e"]



