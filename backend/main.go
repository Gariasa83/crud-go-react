package main

import (
	"backend/controllers"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	// CONFIGURAR CORS
	config := cors.DefaultConfig()
	config.AllowAllOrigins = true

	corsMiddleware := cors.New(config)

	router.Use(corsMiddleware)

	router.GET("/posts", controllers.GetAllData)
	router.GET("/posts/:id", controllers.GetPostByID)
	router.POST("/posts", controllers.CreatePost)
	router.PUT("/posts/:id", controllers.UpdatePost)
	router.DELETE("/posts/:id", controllers.DeletePost)
	router.Run(":8080")
}
