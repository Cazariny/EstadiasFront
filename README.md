<!-- # Front

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files. -->
# Data Weather Hub

Este proyecto es una aplicación para la gestión y visualización de datos meteorológicos. Utiliza Angular para el frontend. Los datos se almacenan en MongoDB y se obtienen de una API meteorológica externa. La aplicación permite a los usuarios visualizar los datos de diferentes sensores, exportar datos a CSV y mostrar información en un mapa interactivo.

## Comenzando 🚀

<!-- Mira **Deployment** para conocer como desplegar el proyecto. -->


### Requisitos Previos 📋
  
- Node.js _version 20.12.2_
- Angular _version 17.3.8_


### Instalación 🔧

1. Para la instalacion de este proyecto es necesario clonar el proyecto de github.
```
git clone <URL_DEL_REPOSITORIO>
cd <NOMBRE_DEL_REPOSITORIO>
```

2. Una vez dentro del proyecto es necesario instalar las dependencias

```
npm install
```

3. Una vez que se instalaron las dependencias, dentro de la carpeta _environments_ se encuentra el archivo _environments.templates.ts_, puedes cambiar el nombre del archivo a _environments.ts_ o clonarlo y nombrarlo _environments.ts_. Para finalizar este paso solo es necesario cambiar el valor de baseUrl, por el URL del backend

```
export const environments = {
  baseUrl: 'URL_BACKEND'
}
```

4. De esta manera el proyecto esta  listo y solo queda inicializarlo
```
ng serve
```

_Finaliza con un ejemplo de cómo obtener datos del sistema o como usarlos para una pequeña demo_

<!-- ## Despliegue 📦

_Agrega notas adicionales sobre como hacer deploy_ -->

## Construido con 🛠️

_Menciona las herramientas que utilizaste para crear tu proyecto_

* [Angular](https://angular.dev/overview) - Framework de desarrolllo web 
* [Angular Material](https://v17.material.angular.io/) - Componentes para angular
* [Tailwind CSS](https://tailwindcss.com/docs/installation) - Framework de CSS para el diseño de paginas web

<!-- ## Contribuyendo 🖇️

Por favor lee el [CONTRIBUTING.md](https://gist.github.com/villanuevand/xxxxxx) para detalles de nuestro código de conducta, y el proceso para enviarnos pull requests. -->

<!-- ## Wiki 📖

Puedes encontrar mucho más de cómo utilizar este proyecto en nuestra [Wiki](https://github.com/tu/proyecto/wiki) -->

## Versionado 📌

Usamos [SemVer](http://semver.org/) para el versionado.
<!-- ## Autores ✒️

_Menciona a todos aquellos que ayudaron a levantar el proyecto desde sus inicios_

* **Andrés Villanueva** - *Trabajo Inicial* - [villanuevand](https://github.com/villanuevand)
* **Fulanito Detal** - *Documentación* - [fulanitodetal](#fulanito-de-tal) -->

<!-- También puedes mirar la lista de todos los [contribuyentes](https://github.com/your/project/contributors) quíenes han participado en este proyecto.  -->

<!-- ## Licencia 📄

Este proyecto está bajo la Licencia (Tu Licencia) - mira el archivo [LICENSE.md](LICENSE.md) para detalles -->

<!-- ## Expresiones de Gratitud 🎁

* Comenta a otros sobre este proyecto 📢
* Invita una cerveza 🍺 o un café ☕ a alguien del equipo. 
* Da las gracias públicamente 🤓.
* Dona con cripto a esta dirección: `0xf253fc233333078436d111175e5a76a649890000`
* etc. -->



