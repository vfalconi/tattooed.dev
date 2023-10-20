pipeline {
	agent {
		label 'nodejs'
	}
	environment {
		GITHUB_PAT = credentials('github-pat--tattooed-dev')
	}
	stages {
		stage('Configure Git') {
			steps {
				sh 'git config --global user.email "build@jenkins.hexd.network"'
				sh 'git config --global user.name "jenkins"'
			}
		}

		stage('Dependencies') {
			steps {
				sh 'git clone https://git.hexd.network/vince/tattooed.dev'
				sh 'git clone "https://vfalconi:$GITHUB_PAT@github.com/vfalconi/tattoed.dev-source" build'
				sh 'npm install --prefix tattooed.dev'
				configFileProvider([ configFile(fileId: 'tattooed.dev', variable: 'BUILD-CONFIG')]) {
					sh 'cat ${env.BUILD-CONFIG} > tattooed.dev/.env'
				}
			}
		}

		stage('Build site') {
			steps {
				sh 'npm --prefix tattooed.dev run-script build'
			}
		}

		stage('Commit changes') {
			steps {
				//sh 'git -C build commit -am "commit ${BUILD_TAG}"'
				sh 'echo "committin"'
			}
		}

		stage('Push to origin') {
			steps {
				//sh 'git -C build push origin'
				sh 'echo "pushin"'
			}
		}
	}

	post {
		// Clean after build
		always {
			cleanWs(
				cleanWhenAborted: true,
				cleanWhenFailure: true,
				cleanWhenNotBuilt: true,
				cleanWhenSuccess: true,
				cleanWhenUnstable: true,
				deleteDirs: true,
				skipWhenFailed: false
			)
		}
	}
}
