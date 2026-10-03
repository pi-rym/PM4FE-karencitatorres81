# Actividad 03 - Estructura de productos

## Endpoint analizado

GET /products

La respuesta obtenida desde el backend corresponde a un array de objetos
que representan los productos disponibles en la aplicación.

## Ejemplo de respuesta

{
  "id": 1,
  "name": "iPhone 11",
  "description": "Experience power and elegance...",
  "price": 699,
  "stock": 10,
  "image": "https://www.apple.com/...",
  "categoryId": 1
}

## Estructura de un producto

| Campo | Tipo | Descripción |
|------|------|-------------|
| id | number | Identificador único del producto |
| name | string | Nombre del producto |
| description | string | Descripción del producto |
| price | number | Precio del producto |
| stock | number | Cantidad disponible |
| image | string | URL de la imagen del producto |
| categoryId | number | Identificador de la categoría |

## Conclusión

La respuesta del endpoint GET /products es un array de productos.

Cada producto posee siete propiedades principales: id, name, description,
price, stock, image y categoryId.

Esta estructura será utilizada posteriormente para definir los tipos o
interfaces de TypeScript necesarios en el desarrollo del frontend.