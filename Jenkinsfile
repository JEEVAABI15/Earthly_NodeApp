pipeline {
    agent any

    environment {
        EARTHLY_BUILDKIT_HOST = 'docker-container://earthly-buildkitd'
        IMAGE_NAME = "jeeva1512/myapp:latest"
        REGISTRY = "docker.io"
        GIT_CREDENTIALS_ID = 'github-pat'
    }

    stages {
        stage('Clone Repository') {
            steps {
                script {
                    checkout([
                        $class: 'GitSCM',
                        branches: [[name: '*/main']],
                        userRemoteConfigs: [[
                            url: 'https://github.com/JEEVAABI15/Earthly_NodeApp.git',
                            credentialsId: env.GIT_CREDENTIALS_ID
                        ]]
                    ])
                }
            }
        }

        stage('Run Earthly Build') {
            steps {
                sh 'earthly --ci +docker'
            }
        }

        // stage('Push Docker Image') {
        //     steps {
        //         withDockerRegistry([credentialsId: 'docker-hub', url: "https://${env.REGISTRY}"]) {
        //             sh "docker push ${IMAGE_NAME}"
        //         }
        //     }
        // }
        // stage('Push Docker Image') {
        //     steps {
        //         script {
        //             docker.withRegistry("https://${env.REGISTRY}", 'docker-hub') {
        //                 sh "docker push ${IMAGE_NAME}"
        //             }
        //         }
        //     }
        // }
        stage('Push Docker Image') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-hub', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh '''
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                        docker push $IMAGE_NAME
                    '''
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
