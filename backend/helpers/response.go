package helpers

import "github.com/gin-gonic/gin"

// RESPONSE
func Response(c *gin.Context, statusCode int, ok bool, data interface{}, message string) {
	c.JSON(statusCode, gin.H{
		"ok":      ok,
		"data":    data,
		"message": message,
	})
}
