
# Challenge Backend 🐸

Challenge delfosti parte Backend 🚀


## Environment Variables

Para levantar este proyecto se deben de setear la siguientes variables

`APP_PORT` puerto de express

`APP_JWT_SECRET` llave secreta para generar y validar los jwt

`DB_NAME` nombre de tu bd

`DB_PORT`=3306

`DB_USER` usuario de tu bd

`DB_PASSWORD` password de la bd

`DB_HOST` host de tu bd


## Inicializar proyecto


```
  npm ci
  npm run dev
```
Te deberá de aparecer los siguientes mensajes en la terminal.
```
  ✅ Application running on port {{APP_PORT}}
  🐸✨ Database successfully connected
```

## Estructura de carpetas

```
├── src
│   ├── _lib                                                 # clases de utilidad, abstracciones y helpers.
│   │   ├── helpers                                          # abstracciones para mis routers, controllers, servicies, etc.
│   │   └── models                                           
│   ├── constants                                            # constantes 
│   └── database
│   │   ├── entities                                         # entidades que representan tablas en mi base de datos
│   │   ├── repositories                                     # repositorios que interactuan directamente con la base de datos
│   │   ├── types                                            # utilidades de tipado
│   │   └── data-source.database.ts                          # configuracion de la conexión a mi base de datos
│   ├── http                                                 
│   │   ├── controllers                                      # controladores de la aplicación
│   │   ├── middlewares                                      # middlewares de la aplicación
│   │   ├── routes                                           # routes de la aplicación
│   │   └── services                                         # servicios de la aplicación que interactuan con controllers y repos
│   ├── schemas                                              # zod schemas
│   ├── app-routing.ts                                       # router manager
│   ├── app.ts                                               # clase principal de mi aplicación
│   ├── index.ts                                             # punto de entrada de mi aplicación (boot)
├── .env.example                                             # variables de entorno (copiar y borrar el .example)
├── .gitignore                                           
├── package.json
└── README.md

```

## Features

- Crear proyectos
- Crear tareas y asignarlas a un proyecto
- Crear usuarios
- Protección de rutas por token JWT y roles


## Authores

- [@pieroDev23 Fullstack Developer](https://www.github.com/octokatherine)


## Feedback

Si presentan algun feedback para mi, estoy encantado de leerlos o escucharlos, todo sea con tal de aprender de gente mejor que yo 🤗

