pipeline {
    agent any

    stages {
        stage('build image and push to Docker Hub CI') {
            steps {
                git branch: 'main',
                credentialsId: 'git-credentials',
                url: 'https://github.com/progdev8201/cooking-app-frontend.git'
                
                sh 'docker-compose -f docker-compose-home-server.yml down'

                sh 'docker system prune -a -f'
                
                sh 'docker login --username orewaprogdev13 --password kulotte2015'
                
                sh 'docker build --build-arg environement=dev -t orewaprogdev13/cooking-app .'
                
                sh 'docker push orewaprogdev13/cooking-app'
            }
        }
        
         stage('deploy app CD') {
            steps {
                sh 'docker system prune -a -f'

                sh 'docker-compose -f docker-compose-home-server.yml up -d'
           }
        }
    }
}
