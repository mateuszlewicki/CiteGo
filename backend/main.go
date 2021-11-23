package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux" 
)

type Cite struct {
	gorm.Model
	AuthorName  string `json:"authorName"`
	AuthorImage string `json:"authorImage"`
	Cite        string `json:"cite"`
	Book        string `json:"book"`
}

var db *gorm.DB
var citesInventory []Cite
var err error

func getCites(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	fmt.Println("Function Called: getCites()")
	db.Find(&citesInventory)
	json.NewEncoder(w).Encode(&citesInventory)
}

func createCite(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		fmt.Println("fcuking CORS")
		return
	}

	var cite Cite
	_ = json.NewDecoder(r.Body).Decode(&cite) // Obtain item from request JSON
	fmt.Println("Function Called: createCite()")

	db.Create(&cite)
	db.Find(&citesInventory)
	json.NewEncoder(w).Encode(cite) // Show item in response JSON for verification
}

func deleteCite(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	params := mux.Vars(r)

	var cite Cite
	db.Delete(&cite, params["cid"])
	json.NewEncoder(w).Encode(cite)
}


func updateCite(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var cite Cite

	_ = json.NewDecoder(r.Body).Decode(&cite) // Obtain item from request JSON

	db.Model(&cite).Updates(Cite{AuthorName:cite.AuthorName,AuthorImage:cite.AuthorImage,Cite:cite.Cite,Book:cite.Book})

	db.Find(&citesInventory)
	json.NewEncoder(w).Encode(cite)
}

func handleRequests() {
	// := is the short variable declaration operator
	// Automatically determines type for variable
	router := mux.NewRouter().StrictSlash(true)
	router.Use(mux.CORSMethodMiddleware(router))

	router.HandleFunc("/cites", getCites).Methods("GET")
	router.HandleFunc("/cite/{cid}", updateCite).Methods("PUT")
	router.HandleFunc("/cite/{cid}", deleteCite).Methods("DELETE")
	router.HandleFunc("/cite", createCite).Methods("POST", "OPTIONS")

	origins := handlers.AllowedOrigins([]string{os.Getenv("ORIGIN_ALLOWED"), "http://localhost:9080"})
	methods := handlers.AllowedMethods([]string{"POST", "GET", "OPTIONS", "PUT", "DELETE", "HEAD"})
	headers := handlers.AllowedHeaders([]string{"Content-Type", "Content-Length", "Accept-Encoding", "X-CSRF-Token", "Authorization", "accept", "origin", "Cache-Control", "X-Requested-With"})

	log.Fatal(http.ListenAndServe("0.0.0.0:8000", handlers.CORS(origins, methods, headers)(router)))
	fmt.Println("appStarted")

}
func accessControlMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS,PUT")
		w.Header().Set("Access-Control-Allow-Headers", "Origin, Content-Type")

		if r.Method == "OPTIONS" {
			return
		}

		next.ServeHTTP(w, r)
	})
}
func getenv(env_var string) string{
     return envOrDefault(env_var,"")
}
func envOrDefault(env_var string,def string) string {
     val := os.Getenv(env_var)
     if !(len(val) > 0) {
     	val=def
	}
     return val
}

func main() {


     	rdbms_host := envOrDefault("RDBMS_HOST","localhost")
	rdbms_port := envOrDefault("RDBMS_PORT","5432")
	rdbms_user := envOrDefault("RDBMS_USER","citego")
	rdbms_pass := envOrDefault("RDBMS_PASS","citego")
	rdbms_db := envOrDefault("RDBMS_DB","citego")
	rdbms_tz := envOrDefault("RDBMS_TZ","Europe/Warsaw")
	dsn := fmt.Sprintf("host=%s port=%s user=%s dbname=%s sslmode=disable password=%s TimeZone=%s",rdbms_host,rdbms_port,rdbms_user,rdbms_db,rdbms_pass,rdbms_tz)
	db, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {

		panic("failed to connect database")

	}

	db.AutoMigrate(&Cite{})

	for index := range citesInventory {

		db.Create(&citesInventory[index])

	}

	handleRequests()
}
