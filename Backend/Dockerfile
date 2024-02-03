# Use an official Node.js runtime as a base image
FROM node:20

# Install gcc to compile C++ code
RUN apt-get update && \
    apt-get install -y gcc g++

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Install Python and required packages
RUN apt-get install -y python3 python3-pip && \
    pip3 install openai

# Expose the port your app runs on
EXPOSE 8080

# Command to run your application
CMD ["node", "src/index.js"]
