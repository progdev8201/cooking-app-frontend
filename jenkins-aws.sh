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
                
                sh 'chmod 600 frontendkey.pem'
                
                sh("""
                ssh -o "StrictHostKeyChecking no" -tt -i frontendkey.pem ubuntu@3.135.61.150 '
                docker-compose down;
                docker system prune -a -f;
                docker-compose up -d;
                '""")
           }
        }
    }

    post {
       always {
           deleteDir()
       }
   }
}
