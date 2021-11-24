#!groovy

def prepareOS() {
    echo "INSTALL wget,curl,tar"
    exec("apt-get install -y wget curl tar")
}

def installNodejs(mVer) {
    echo "ADD NODE " + mVer + " REPO"
    exec("curl -fsSL https://deb.nodesource.com/setup_${mVer}.x | bash -")
    echo "INSTALL NODE " + mVer 
    exec("apt-get install -y nodejs")
}

def installAngularCLI() {
    exec("npm install -g @angular/cli@latest")
}

def installTsNode() {
    exec("npm install -g typescript")
    exec("npm install -g ts-node")
}

def installFrontTools() {
    installNodejs(12)
    installAngularCLI()
    installTsNode()
}

def installGolang(ver) {
    echo "INSTAL GOLANG " + ver
    exec("wget https://golang.org/dl/go${ver}.linux-amd64.tar.gz")
    exec("tar -zxvf go1.17.linux-amd64.tar.gz -C /usr/local/")
    exec("echo \"export PATH=/usr/local/go/bin:\${PATH}\" > /etc/profile.d/go.sh")
    exec("source /etc/profile.d/go.sh")
}

def installBackTools() {
    installGolang("1.17.3")
}

def installTools() {
    prepareOS()
    installFrontTools()
    installBackTools()
}

node('slave') {
    stages{
	stage("Install tools"){
	    steps{ installTools() }
	}
	stage("Build Frontend"){
	    environment {
		API_URL= "localhost:8000"
	    }
	    steps{
		dir("frontend") {
		    exec("npm update")
		    exec("npm run build")
		}
	    }
	}
	stage("Build Backend"){
	    steps {
		dir("backend"){
		    exec("go build -o citego")
		}
	    }
	}
	stage("Pack&Publish archive"){
	    steps {
		dir("frontend"){
		    archiveArtifacts "dist/frontend"
		}
		dir("backend"){
		    archiveArtifacts "citego"
		}
	    }
	}
    
    }

}
