
FROM  node:20.11.1-alpine

# Create a directory  and go to the directory 
WORKDIR /app

# Copy the package.json file to my current directory to install the necessary dependence  
COPY package.json .

# Install the dependence
RUN npm install

# Copy other files to my current directory
COPY . .

# Build and optimize static file
RUN npm run dev

# Open the port to react
EXPOSE 5173

CMD ["npm", "run dev"]