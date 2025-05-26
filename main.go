package main

import (
	"net/http"

	"github.com/IkhwanAL/turnBasedGame/components"
)

func main() {

	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		components.BaseLayout(components.MainMenu()).Render(r.Context(), w)
	})

	http.HandleFunc("/main-menu", func(w http.ResponseWriter, r *http.Request) {
		components.BaseLayout(components.MainMenu()).Render(r.Context(), w)
	})

	http.HandleFunc("/saved-menu", func(w http.ResponseWriter, r *http.Request) {
		components.BaseLayout(components.SavedMenu()).Render(r.Context(), w)
	})

	http.ListenAndServe(":8080", nil)
}
