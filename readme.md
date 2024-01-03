# MEAL APP

MEAL APP es una aplicación de restaurante con un backend en Express, la cual fue desarrollada para gestionar la lógica y la funcionalidad del servidor que respalda la aplicación. La cual cuenta con los siguientes modulos:

- Users: Contiene rutas para el registro y inicio de sesión de usuarios (clientes, personal del restaurante). Controladores correspondientes para manejar la autenticación y autorización.
- Restaurants: Contiene rutas para crear, modificar y eliminar restaurantes. . Controladores para gestionar las operaciones relacionadas con los restaurantes y los review.
- Meals: Contiene rutas para obtener la lista de platos, detalles de platos, agregar nuevos platos, etc. Controladores para gestionar las operaciones relacionadas con el menú.
- Orders: Contiene rutas para realizar pedidos, obtener historial de pedidos, actualizar el estado de los pedidos, etc. Controladores para manejar la lógica de gestión de pedidos

### Documentacion de los endpoints

https://documenter.getpostman.com/view/29235177/2s9YsFDtUp

## Extras

En el modulo de Meal agregue la funcionalidad para almacenar una foto del plato al momento de crear el meal, ademas la foto puede ser cambiada en el endpoint de actualizar el meal.

## Requisitos Previos

Asegúrate de tener instalado en tu sistema:

- Node.js
- npm (administrador de paquetes de Node.js)

## Instalación

1. Clona este repositorio:

   ```bash
   git clone https://github.com/yurikrz/meals

   ```

2. Ejecutar el siguiente comando:

   ```bash
   npm install

   ```

3. Clonar el archivo .env.template y renombrarlo a .env
4. Para iniciar la aplicación ejecutar el comando:
   ```bash
   npm run start:dev
   ```
