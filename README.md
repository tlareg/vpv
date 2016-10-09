# Virtual Patient Visualizations

### Installation

1. Install nodeJS and npm

2. Install node-gyp
    ```
    npm install -g node-gyp
    npm install -g --production windows-build-tools
    ```
    
3. Install npm dependencies ``` npm install ```

4. Run webpack-dev-server for development ``` npm start ```

5. Build for production ``` npm run build ```

## Integration tips

### [Open Labyrinth](https://github.com/olab/Open-Labyrinth) installation (on Windows)

- [installation wiki](https://github.com/olab/Open-Labyrinth/wiki/Installing-Open-Labyrinth)
- install [XAMPP](https://www.apachefriends.org/pl/download.html) (don't use php7 - by now *OL* uses [deprecated php functions](http://stackoverflow.com/questions/12859942/why-shouldnt-i-use-mysql-functions-in-php) )
- clone *OL* github repo ``` git clone https://github.com/olab/Open-Labyrinth.git ```
- PHP configuration
  - install [pecl_http](https://pecl.php.net/package/pecl_http)
    - [download](http://windows.php.net/downloads/pecl/releases/http/2.5.0/php_http-2.5.0-5.6-ts-vc11-x86.zip), extract and copy php_http.dll to ```xampp/php/ext```
    - add (or uncomment) line ```extension=php_http.dll``` in ```xampp/php/php.ini```
    - more info - see [this](http://stackoverflow.com/questions/2100066/how-do-i-enable-the-php-http-pecl-extension-on-windows) and [this](http://stackoverflow.com/questions/1634726/why-are-there-no-longer-windows-binaries-for-pecl-extensions-like-pecl-http)
  - change memory limit - in ```php.ini``` set ```memory_limit=1024M```
  - change max execution time - in ```php.ini``` set ```max_execution_time=300```
  - change upload max filesize - in ```php.ini``` set ```upload_max_filesize=10M```
- open in browser ```host/ol/www``` and go through installation wizard