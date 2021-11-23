FROM docker.io/golang:1.17-bullseye
WORKDIR /go/src
COPY go.mod ./
COPY go.sum ./
RUN go mod download
COPY *.go ./
RUN go build -o /go/bin/citego
EXPOSE 8080
CMD [ "/go/bin/citego" ]
