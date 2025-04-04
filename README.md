# Earthly Node.js Application with Jenkins CI/CD

This project demonstrates a Node.js application using Express.js, built and deployed using Earthly and Jenkins. The application includes a REST API for managing users and is containerized using Docker.

## Prerequisites

Ensure the following tools are installed on your system:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [Earthly](https://earthly.dev/)
- [Docker](https://www.docker.com/)
- [Jenkins](https://www.jenkins.io/)

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/JEEVAABI15/Earthly_NodeApp.git
cd Earthly_NodeApp
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run the Application Locally
```bash
node index.js
```
The application will be available at `http://localhost:3000`.

### 4. Install Earthly
```bash
wget https://github.com/earthly/earthly/releases/latest/download/earthly-linux-amd64
chmod +x earthly-linux-amd64
sudo mv earthly-linux-amd64 /usr/local/bin/earthly
earthly --version
```

### 5. Build and Run the Docker Image Locally
```bash
earthly +docker
docker run -d -p 3000:3000 jeeva1512/myapp:latest
```

## Jenkins Configuration

### 1. Add Credentials for DockerHub
1. Go to **Jenkins Dashboard** > **Manage Jenkins** > **Manage Credentials**.
2. Select the appropriate scope (e.g., `Global`).
3. Click **Add Credentials**.
4. Choose **Username with password**:
   - **Username**: Your DockerHub username.
   - **Password**: Your DockerHub password.
   - **ID**: `docker-hub`.

### 2. Add Credentials for GitHub
1. Go to **Jenkins Dashboard** > **Manage Jenkins** > **Manage Credentials**.
2. Select the appropriate scope (e.g., `Global`).
3. Click **Add Credentials**.
4. Choose **Secret text**:
   - **Secret**: Your Git Personal Access Token (PAT).
   - **ID**: `github-pat`.

### 3. Configure Jenkins Pipeline
1. Create a new **Pipeline** job in Jenkins.
2. Use the provided `Jenkinsfile` in the repository.

### 4. Trigger the Pipeline
Run the pipeline to:
- Clone the repository.
- Build the Docker image using Earthly.
- Push the Docker image to DockerHub.
- Deploy the application using Docker.

## API Endpoints

- **GET** `/users`: Retrieve all users.
- **GET** `/users/:id`: Retrieve a user by ID.
- **POST** `/users`: Create a new user.
- **PUT** `/users/:id`: Update a user by ID.
- **DELETE** `/users/:id`: Delete a user by ID.

## Notes

- Ensure Docker is running before triggering the Jenkins pipeline.
- Update the `IMAGE_NAME` in the `Jenkinsfile` and `Earthfile` if you want to use a different DockerHub repository.

## License

This project is licensed under the ISC License.