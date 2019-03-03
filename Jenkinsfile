pipeline {
    agent any

    stages {
        stage('Build Project Manager Frontend') {
            steps {
                echo 'Building Project Manager Frontend..'
                bat 'cd ./ProjectManagerFrontend/ && npm install && npm run build --prod'
            }
        }
        stage('Build Project Manager Backend') {
            steps {
                echo 'Building Project Manager Backend ..'
                bat 'cd ./ProjectManagerBackend/ && npm install'
            }
        }
        stage('Testing Project Manager Frontend') {
            steps {
                echo 'Testing Project Manager Frontend...'
                bat 'cd ./ProjectManagerFrontend/ && npm test'     
            }
        }
        stage('Testing Project Manager Backend') {
            steps {
                echo 'Testing Project Manager Backend...'
                bat 'cd ./TaskManagerBackend/ && npm test'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying the application...'
                bat 'docker-compose up --build -d'
            }
        }
    }
}