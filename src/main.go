package main

import (
	"net/http"

	"github.com/IkhwanAL/turnBasedGame/components"
)

var width = 100
var height = 30

func generateDungeon(width, height int) [][]rune {
	grid := make([][]rune, height)

	for y := range height {
		grid[y] = make([]rune, width)
		for x := range width {
			grid[y][x] = '!'
		}
	}

	return grid
}

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

	http.HandleFunc("/new-game", func(w http.ResponseWriter, r *http.Request) {
		grid := generateDungeon(width, height)

		components.BaseLayout(components.GameLayout(grid)).Render(r.Context(), w)
	})

	http.ListenAndServe(":8080", nil)
}
