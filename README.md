# PET-HEROES (Back-End)

## Requisitos

- [NodeJS](https://nodejs.org/es/)
- [MongoDb](https://www.mongodb.com/)


## Documentacion del proyecto

[Github](https://github.com/RedondaAnalia/TIP-documentation.git)

### Instalación

Para descargarse el proyecto solo se debe...

```
git clone https://github.com/RedondaAnalia/TIP-core.git
```
Con esto tiene el proyecto back-end descargado, ingrese a la carpeta .
dentro de esa carpeta en la terminal correr las siguientes instrucciones

```
npm install
```
que instalara todas las dependencias y luego recomendamos instalar

```
npm install -g nodemon
```

para iniciar el servidor existen varios entornos los cuales se pueden acceder con...

development:
```
npm start
```
o 
```
npm run start:dev
```
produccion:
```
npm run start:prod
```
Heroku:
```
npm run start:hero
```
Travis:
```
npm run start:travis
```

Para correr los test 
```
npm test
```

## API

| Obj | Tipo | URL | JSON
| ------ | ------ |------|-------
| User | Get | http://localhost:3000/users |  |
| User | Get | http://localhost:3000/users?user_id=xxxx  |  |
| User | Post | http://localhost:3000/users | {(1)} |
| User | Put | http://localhost:3000/users?user_id=xxxx | {(1)}
| User | Delete | http://localhost:3000/users?user_id=xxxx | 


{(1)} 
```json
{
	"name":"ana",
	"email":"ana@mail.com",
	"phone": 123456,
	"gender" : "Female"
}
```
para crear una mascota

| Obj | Tipo |
|-----|------|
| POST | http://localhost:3000/users/pet |

```json
{
	"user_id": "5ca3cba33006342404817f64",
	"pet" : {
		"name" : "chimuelo",
		"date_of_birth" : "2014/10/20",
		"castrate": true,
		"gender": "MALE"
		
  }
}
```
para aplicar una vacuna:

| Obj | Tipo |
|-----|------|
| POST | http://localhost:3000/applications |

```json
{
	"pet_id" : "5ca6c3bca653d91eae48383b",
	"vaccine_id": "5ca6c4d5f41a5a205a4ae1ec",
	"code": 123,
	"img": "",
	"estimate_date": "2019-11-20"
}
```

para crear una vacuna : 

| Obj | Tipo |
|-----|------|
| POST | http://localhost:3000/vaccine |

```json

{
	"name": "Anti rabica",
	"code": 12346
}
```

### Integrantes

-   [Redonda Analia](https://github.com/RedondaAnalia)  
-   [Sabaliauskas Pablo Nicolas](https://github.com/wisaku)  



## Docentes

- [Dodino Fernando](fernando.dodino@gmail.com)  
- [Rosito Susana](rosito.susana@gmail.com)  
