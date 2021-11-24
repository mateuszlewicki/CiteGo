#!groovy

def prepareOS() {
    echo "INSTALL wget,curl,tar"
    sh "apt-get install -y wget curl tar"
}

def installNodejs(mVer) {
    echo "ADD NODE " + mVer + " REPO"
    sh "curl -fsSL https://deb.nodesource.com/setup_${mVer}.x | bash -"
    echo "INSTALL NODE " + mVer 
    sh "apt-get install -y nodejs"
}

def installAngularCLI() {
    sh "npm install -g @angular/cli@latest"
}

def installTsNode() {
    sh "npm install -g typescript"
    sh "npm install -g ts-node"
}

def installFrontTools() {
    installNodejs(12)
    installAngularCLI()
    installTsNode()
}

def installGolang(ver) {
    echo "INSTAL GOLANG " + ver
    sh "wget https://golang.org/dl/go${ver}.linux-amd64.tar.gz"
    sh "tar -zxvf go1.17.linux-amd64.tar.gz -C /usr/local/"
    sh "echo \"export PATH=/usr/local/go/bin:\${PATH}\" > /etc/profile.d/go.sh"
    sh "source /etc/profile.d/go.sh"
}

def installBackTools() {
    installGolang("1.17.3")
}

def installTools() {
    prepareOS()
    installFrontTools()
    installBackTools()
}

node {
    stage("Install tools"){
	installTools() 
    }
    stage("Build Frontend"){
	environment {
	    API_URL= "localhost:8000"
	}
	dir("frontend") {
	    sh "npm update"
	    sh "npm run build"
	}
    }
    stage("Build Backend"){
	dir("backend"){
	    sh "go build -o citego"
	}
    }
    stage("Pack&Publish archive"){
	dir("frontend"){
	    archiveArtifacts "dist/frontend"
	}
	dir("backend"){
	    archiveArtifacts "citego"
	}
    }
}
