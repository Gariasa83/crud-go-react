package database

import (
	"backend/models"

	"github.com/google/uuid"
)

var Data = []models.PostData{
	{
		ID:    uuid.New().String(),
		Title: "Mejor album de la banda In Flames",
		Description: `Subterranean es un EP de la banda sueca de death metal melódico In Flames, del año 1994.
Este álbum es el único donde Henke Forss trabaja como vocalista. Fue remasterizado en el año 2007 por Regain Records.
Dos pistas adicionales fueron añadidas: Eye of the Beholder (cover de Metallica) y Murders in the Rue Morgue (cover de Iron Maiden).`,
		ImgUrl: "https://upload.wikimedia.org/wikipedia/en/e/ee/In_Flames_-_Subterranean.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled",
	},
	{
		ID:    uuid.New().String(),
		Title: "Mejor album de la banda Cradle of Filth",
		Description: `Dusk and Her Embrace es el segundo álbum de estudio de la banda británica de metal gótico Cradle of Filth, lanzado en 1996. 
El álbum fue grabado en los estudios Academy de Yorkshire, Inglaterra, y producido por Robert "Mags" Magoolagan. 
Dusk and Her Embrace es considerado uno de los álbumes más importantes del género del metal gótico y ha sido aclamado por la crítica por su complejidad musical y lírica.`,
		ImgUrl: "https://m.media-amazon.com/images/I/51dFPixpvzL._UF1000,1000_QL80_.jpg",
	},
}
