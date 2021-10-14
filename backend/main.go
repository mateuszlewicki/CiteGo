package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"

	// Type go get -u github.com/gorilla/mux to install
	// Unused packages will create compilation error

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux" // Unused packages will create compilation error
)

type Cite struct {
	gorm.Model
	// CID    int    `json:"CID"`
	AuthorName  string `json:"authorName"`
	AuthorImage string `json:"authorImage"`
	Cite        string `json:"cite"`
	Book        string `json:"book"`
}

var db *gorm.DB
var citesInventory []Cite
var err error

// func homePage(w http.ResponseWriter, r *http.Request) {
// 	fmt.Fprintf(w, "Function Called: homePage()")
// }

func getCites(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	fmt.Println("Function Called: getCites()")
	db.Find(&citesInventory)
	json.NewEncoder(w).Encode(&citesInventory)
}

func createCite(w http.ResponseWriter, r *http.Request) {
	// w.Header().Set("Content-Type", "application/json")
	//Allow CORS here By * or specific origin
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	// w.Header().Set("Access-Control-Allow-Origin", "*"
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
	// return "OKOK"
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
	// db.First(&cite)
	db.Delete(&cite, params["cid"])
	// _deleteCiteAtUid(params["cid"])

	// json.NewEncoder(w).Encode(_deleteCiteAtUid(params["cid"]))
	json.NewEncoder(w).Encode(cite)
}


func updateCite(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var cite Cite
	_ = json.NewDecoder(r.Body).Decode(&cite) // Obtain item from request JSON

	params := mux.Vars(r)

	db.Delete(&cite, params["cid"])              // Delete item
	db.Create(&cite)
	db.Find(&citesInventory)
	json.NewEncoder(w).Encode(cite)
}

func handleRequests() {
	// := is the short variable declaration operator
	// Automatically determines type for variable
	router := mux.NewRouter().StrictSlash(true)
	router.Use(mux.CORSMethodMiddleware(router))
	// router.HandleFunc("/", homePage).Methods("GET")
	router.HandleFunc("/cites", getCites).Methods("GET")
	router.HandleFunc("/cite/{cid}", updateCite).Methods("PUT")
	router.HandleFunc("/cite/{cid}", deleteCite).Methods("DELETE")
	router.HandleFunc("/cite", createCite).Methods("POST", "OPTIONS")

	origins := handlers.AllowedOrigins([]string{os.Getenv("ORIGIN_ALLOWED"), "http://localhost:4200"})
	methods := handlers.AllowedMethods([]string{"POST", "GET", "OPTIONS", "PUT", "DELETE", "HEAD"})
	headers := handlers.AllowedHeaders([]string{"Content-Type", "Content-Length", "Accept-Encoding", "X-CSRF-Token", "Authorization", "accept", "origin", "Cache-Control", "X-Requested-With"})

	// c := cors.New(cors.Options{
	// 	AllowedOrigins:   []string{"*"},
	// 	AllowCredentials: true,
	// })
	// handler := c.Handler(router)
	// corsObj := handlers.AllowedOrigins([]string{"*"})

	// handler := cors.Default().Handler(router)

	// log.Fatal(http.ListenAndServe(":8000", handler))
	log.Fatal(http.ListenAndServe(":8000", handlers.CORS(origins, methods, headers)(router)))

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

func main() {
	// Data store
	// citesInventory = append(citesInventory, Cite{
	// 	AuthorName:  "Robin Sharma",
	// 	Cite:        "Good to stay up early",
	// 	Book:        "5am club",
	// })
	//    (*w).Header().Set("Access-Control-Allow-Origin", "*")
	//    (*w).Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	//    (*w).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Authorization")

	dsn := "host=127.0.0.1 port=5432 user=citego dbname=citego sslmode=disable password=citego TimeZone=Europe/Warsaw"
	db, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {

		panic("failed to connect database")

	}

	// defer db.Close()

	db.AutoMigrate(&Cite{})

	for index := range citesInventory {

		db.Create(&citesInventory[index])

	}

	handleRequests()
}
