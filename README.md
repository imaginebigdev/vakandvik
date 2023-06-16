# Vakandvik

## Instalacion

Para la instalacion lo primero es posicionarse con la terminal en la ubicacion de donde se encuentre el archivo, una vez encontrado, vamos a utilizar el comando

```bash
$ npm install
```

para instalar todas las dependencias del proyecto, una vez terminado el proceso si queremos visualizar la aplicacion tendremos que escribir el comando

```bash
$ npm run dev
```

# Deploy ReactJS + NextJS en CPanel

## Preparación

En el archivo next.config.js agregar:

```
nextConfig:
	{
		output: "export",
		distDir: "dist",
	}

```

El package.json queda así:

```
"scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "export": "next build && next export",
    "lint": "next lint"
},
```

Ejecutar:

```
npm run export
```

Se crea una carpeta "out".
Agregar un nuevo archivo .htaccess que contenga

```
<IfModule mod_rewrite.c>

  RewriteEngine On
  RewriteBase /
  RewriteRule ^index.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-L
  RewriteRule . /index.html [L]

</IfModule>
```

Comprimir la carpeta en un .zip

## Subir a CPanel

Entrar a WHM y de ahí al CPanel correspondiente.
Ir a Files/Files Manager.
Borrar la carpeta public_html: entrar a la carpeta public_html y subir un nivel(para que se visualice la carpeta a la derecha del panel) y borrarla.

Subir el out.zip, extraer el contenido y cambiarle el nombre a public_html.
(Esto es porque no se pueden manipular fácilmente los archivos que contienen archivos)

## Deploy

En CPanel entrar a Software/Application Manager.

Hacer click en Register application y completar el formulario:

- Application name: un nombre para la app
- Deployment Domain: elegir el dominio que se creo para esa app
- Base application url: es la url de la página, dejarlo en la raíz(viene por defecto así)
- Ruta de acceso a una aplicación: agregar public_html
- Deployment Environment: Producción
- Environment variables: agregar si existen

Click en el botón Deploy y listo.
La app está lista al instante.

# Link a la pagina

>
