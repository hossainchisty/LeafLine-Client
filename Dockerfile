FROM node:18.17-slim

# Set the working directory inside the container
WORKDIR /leafline-client

#  Copy package.json to the working directory
COPY package.json .

# Install dependencies
RUN npm Install

# Copying all files to the working directory

COPY . .

# Expose port 5173 for dev server 

EXPOSE 5173

# Start react development server 

CMD ["npm", "run", "dev", "--host"]