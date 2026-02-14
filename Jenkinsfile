pipeline {
    agent any

    environment {
        IMAGE_NAME = "varshithchand/website-image1"
    }

    stages {

        stage('Clone Repo') {
            steps {
                git 'https://github.com/VarshithChand/website.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $IMAGE_NAME .'
            }
        }

        stage('Login to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'varshithchand', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                    sh 'echo $PASS | docker login -u $USER --password-stdin'
                }
            }
        }

        stage('Push Image to Docker Hub') {
            steps {
                sh 'docker push $IMAGE_NAME'
            }
        }

        stage('Run Container') {
            steps {
                sh '''
                docker rm -f website-container || true
                docker run -d -p 5001:5000 --name website-container $IMAGE_NAME
                '''
            }
        }
    }
}
