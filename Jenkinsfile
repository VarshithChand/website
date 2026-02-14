pipeline {
    agent any

    stages {

        stage('Download Code') {
            steps {
                git 'https://github.com/VarshithChand/website.git'
            }
        }

        stage('Build & Run Docker') {
            steps {
                sh '''
                docker rm -f website-container || true
                docker build -t website-image .
                docker run -d -p 5002:5000 --name website-container website-image
                '''
            }
        }
    }
}
