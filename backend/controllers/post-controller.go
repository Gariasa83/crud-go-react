package controllers

import (
	"backend/database"
	"backend/helpers"
	"backend/models"
	"net/http"

	"github.com/google/uuid"

	"github.com/gin-gonic/gin"
)

// FUNCIÓN PARA LISTAR TODA LA DATA
func GetAllData(c *gin.Context) {
	helpers.Response(c, http.StatusOK, true, database.Data, "lista de posts")
}

// FUNCIÓN PARA OBTENER UN POST POR ID
func GetPostByID(c *gin.Context) {
	id := c.Param("id")
	for _, post := range database.Data {
		if post.ID == id {
			helpers.Response(c, http.StatusOK, true, post, "post encontrado")
			return
		}
	}

	helpers.Response(c, http.StatusNotFound, false, "", "post no encontrado")

}

// FUNCIÓN PATA CREAR UN POST
func CreatePost(c *gin.Context) {
	var post models.PostData
	if err := c.ShouldBindJSON(&post); err != nil {
		helpers.Response(c, http.StatusBadRequest, false, "", err.Error())
		return
	}

	post.ID = uuid.New().String()
	database.Data = append(database.Data, post)

	helpers.Response(c, http.StatusCreated, true, post, "post creado")
}

func UpdatePost(c *gin.Context) {
	id := c.Param("id")
	var updatePost models.PostData

	if err := c.ShouldBindJSON(&updatePost); err != nil {
		helpers.Response(c, http.StatusBadRequest, false, "", err.Error())
		return
	}
	for i, post := range database.Data {
		if post.ID == id {
			updatePost.ID = database.Data[i].ID
			database.Data[i] = updatePost
			helpers.Response(c, http.StatusOK, true, "", "post actualizado")
			return
		}
	}
	helpers.Response(c, http.StatusNotFound, false, "", "post no encontrado")
}

func DeletePost(c *gin.Context) {
	id := c.Param("id")

	for i, post := range database.Data {
		if post.ID == id {
			database.Data = append(database.Data[:i], database.Data[i+1:]...)
			helpers.Response(c, http.StatusOK, true, "", "post eliminado")
			return
		}
	}

	helpers.Response(c, http.StatusNotFound, false, "", "post no encontrado")
}
