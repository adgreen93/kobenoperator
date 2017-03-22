pipeline {
    agent { docker 'alexggreen/portfolio:latest' }
    stages {
        stage('build') {
            steps {
                sh 'npm --version'
            }
        }
    }
}
