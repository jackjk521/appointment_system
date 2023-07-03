Software to Install:
- composer
- node.js
- xampp


Steps in creating a React JS Laravel Project
- composer global require laravel/installer
- laravel new PROJECTNAME
- cd PROJECTNAME
- composer require laravel/ui
- php artisan ui react --auth
- npm install --save --legacy-peer-deps
- npm run build (not needed)
- npm run dev
- (in another terminal) php artisan serve
- npm i concurrently
- added this in package.json 
"scripts": {
  "start": "concurrently \"npm run dev\" \"php artisan serve\""
}

- npm run start


Installation npm i
- npm i PACKAGENAME --save --legacy-peer-deps

Fontawesome
- Added in resources/css -> @import '~@fortawesome/fontawesome-free/css/all.min.css';

Configure env file
- APP_URL = localhost:8000
