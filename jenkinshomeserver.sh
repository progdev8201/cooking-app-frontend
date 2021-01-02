pipeline {
    agent any

    stages {
        stage('build image and push to Docker Hub CI') {
            steps {
                git branch: 'main',
                credentialsId: 'git-credentials',
                url: 'https://github.com/progdev8201/cooking-app-frontend.git'
                
                sh 'docker system prune -a -f'
                
                sh "docker login --username orewaprogdev13 --password kulotte2015"
                
                sh "docker build -t orewaprogdev13/cooking-app ."
                
                sh "docker push orewaprogdev13/cooking-app"
            }
        }
        
         stage('deploy app CD') {
            steps {
                git branch: 'main',
                credentialsId: 'git-credentials',
                url: 'https://github.com/progdev8201/cooking-app-frontend.git'
                
                sh("""
                docker-compose -f docker-compose-home.yml down;
                docker system prune -a -f;
                docker-compose -f docker-compose-home.yml up -d;
                """)
           }
        }
    }
}
