pipeline {
    agent any

    environment {
        EARTHLY_BUILDKIT_HOST = "unix:///var/run/docker.sock"
        IMAGE_NAME = "jeeva1512/myapp:latest"
        REGISTRY = "docker.io"
    }

    stages {
        stage('Clone Repository') {
            steps {
                git 'https://github.com/myorg/my-nodejs-app.git'
            }
        }

        stage('Run Earthly Build') {
            steps {
                sh 'earthly +docker'
            }
        }

        stage('Push Docker Image') {
            steps {
                withDockerRegistry([credentialsId: 'docker-hub', url: "https://${env.REGISTRY}"]) {
                    sh "docker push ${IMAGE_NAME}"
                }
            }
        }

        stage('Deploy Application') {
            steps {
                sh "docker run -d -p 3000:3000 ${IMAGE_NAME}"
            }
        }
    }
}
