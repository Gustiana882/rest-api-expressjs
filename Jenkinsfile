def builderImage
def imagename = 'gustiana/back-blanja:1.0'
pipeline {
    agent any

    stages {
        stage('Instaling') {
            steps {
                nodejs("nodejs") {
                    sh 'npm install'
                }
            }
        }
        stage('Running Test') {
            steps {
                nodejs("nodejs") {
                    sh 'npm run test'
                }
            }
        }
        stage("Build image") {
            steps {
                script {
                    builderImage = docker.build("${imagename}")
                }
            }
        }
        stage("Push Image") {
            steps {
                script {
                    builderImage.push()
                }
            }
        }
        stage("Delete Image") {
            steps {
                sh "docker image prune -f"
            }
        }
        stage('Deployment') {
            steps {
                script {
                    sshPublisher(
                        publishers: [
                            sshPublisherDesc(
                                configName: 'develop',
                                verbose: false,
                                transfers: [
                                    sshTransfer(
                                        execCommand: "docker pull ${imagename}; docker kill backend; docker run -d --rm --name backend --net blanjanet -p 9000:9000 ${imagename}",
                                        execTimeout: 120000,
                                    )
                                ]
                            )
                        ]
                    )

                }
            }
        }
        stage("test") {
            steps {
                sh "echo 'success runing'"
            }
        }
    }
}