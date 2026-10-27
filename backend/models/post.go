package models

// CREAR EL MODELO
type PostData struct {
	ID          string `json:"id"`
	Title       string `json:"title" binding:"required"`
	Description string `json:"description"`
	ImgUrl      string `json:"imgUrl"`
}
