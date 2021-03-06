# Virtual Patient Visualizations

Visualizations for learning analytics of virtual patients.

See [DEMO](https://tlareg.github.io/vpv)

### Installation

1. Install [nodeJS](https://nodejs.org/) and [yarn](https://yarnpkg.com/)

2. Install [node-gyp](https://github.com/nodejs/node-gyp)

    ```sh
    $ yarn global add node-gyp
    $ yarn global add --production windows-build-tools
    ```
    
3. Install node modules ``` $ yarn install ```

4. Run webpack-dev-server for **development** ``` $ yarn run dev ```

5. Build for **production** ``` $ yarn run build ```

## Integration tips

### [Open Labyrinth](https://github.com/olab/Open-Labyrinth) installation (on Windows)

- [installation wiki](https://github.com/olab/Open-Labyrinth/wiki/Installing-Open-Labyrinth)
- install [XAMPP](https://www.apachefriends.org/pl/download.html) (don't use php7 - by now *OL* uses [deprecated php functions](http://stackoverflow.com/questions/12859942/why-shouldnt-i-use-mysql-functions-in-php) )
- clone *OL* github repo ``` git clone https://github.com/olab/Open-Labyrinth.git ```
- PHP configuration
  - install [pecl_http](https://pecl.php.net/package/pecl_http)
    - [download](http://windows.php.net/downloads/pecl/releases/http/2.5.0/php_http-2.5.0-5.6-ts-vc11-x86.zip), extract and copy ```php_http.dll``` to ```xampp/php/ext```
    - add (or uncomment) line ```extension=php_http.dll``` in ```xampp/php/php.ini```
    - more info - see [this](http://stackoverflow.com/questions/2100066/how-do-i-enable-the-php-http-pecl-extension-on-windows) and [this](http://stackoverflow.com/questions/1634726/why-are-there-no-longer-windows-binaries-for-pecl-extensions-like-pecl-http)
  - change memory limit - in ```xampp/php/php.ini``` set ```memory_limit=1024M```
  - change max execution time - in ```xampp/php/php.ini``` set ```max_execution_time=300```
  - change upload max filesize - in ```xampp/php/php.ini``` set ```upload_max_filesize=10M```
- open in browser ```host/ol/www``` and go through installation wizard
- run ```composer install``` in project root directory
- run ```php vendor/robmorgan/phinx/bin/phinx init``` (```php vendor/bin/phinx migrate``` wont work on Windows - see [this](https://github.com/robmorgan/phinx/issues/360#issuecomment-63954136))

### [Learning Locker](https://github.com/LearningLocker/learninglocker) installation (on Windows)

- [installation instructions](http://docs.learninglocker.net/installation/)
- install [MongoDB](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/)
  - [download](https://www.mongodb.com/download-center) and go through wizard
  - add MongoDB bin folder to PATH environment variable
  - create data directory (mongod by default uses ```dbpath=C:\data\db\```)
- install [MongoDB PHP Driver](https://pecl.php.net/package/mongo)
  - download lastest version (pick right for installed PHP version, TS, x86), extract and copy ```php_mongo.dll``` to ```xampp/php/ext```
  - add line ```extension=php_mongo.dll``` in ```xampp/php/php.ini```
- clone *LL* github repo ``` git clone https://github.com/LearningLocker/learninglocker.git ```
- instal [composer](https://getcomposer.org/download/) and inside learninglocker directory run ```composer install --no-interaction --no-dev``` (use gitbash if not working in plain cmd)
- setup *LL* database
  - run ```mongod``` (can pass ```--dbpath="your\data\dir"```)
  - in second terminal run
  
      ```sh
      mongo
      use learningLockerDBName
      db.createUser( { user: "userName", pwd: "password", roles: [ "readWrite" ] } );
      ```
      
  - create ```app/config/local/database.php``` file 
  
      ```php
      <?php
      return [
          'connections' => [
              'mongodb' => [
                  'driver'   => 'mongodb',
                  'host'     => 'localhost',
                  'port'     => 27017,
                  'username' => 'userName',
                  'password' => 'password',
                  'database' => 'learningLockerDBName'
              ],
          ]
      ];
      ```
      
  - run ```php artisan migrate```
- create ```app/config/local/app.php``` file 

    ```php
    <?php
    return [
        'key' => 'YOUR_SECRET_KEY0'
    ];
    ```
    
    [use key of size 16, 24, or 32](https://github.com/LearningLocker/learninglocker/issues/488)
- open in browser ```localhost/learninglocker/public/register``` and register admin user
- verify registered admin user - go to "Users" tab (```http://localhost/learninglocker/public/site#users```) and click on "verified"

### Open Labyrinth and Learning Locker connection
(Tested on *OL v3.3.1* and *LL v1.13.5*)

- open **Learning Locker** site
  - on navigation click **LRSs**, then **Create an LRS**, fill and submit form
  - click on new LRS title, then **Manage clients** and **Create client**
  - remember endpoint and new client credentials
- open **Open Labyrinth** site
  - on navigation go to **Tools > LRS**, then click **Add LRS**
  - fill form using Learning Locker endpoint and created client credentials (remember to set **Enable: Yes**)
  - in specific labyrinth details set **Send xAPI statements in real-time: Yes**
- more: [Connecting-an-LRS-to-OLab.docx](http://openlabyrinth.ca/wp-content/uploads/2016/07/Connecting-an-LRS-to-OLab.docx)

### VPV and Learning Locker connection

- open **Learning Locker** site
  - create new LRS client
- open **VPV** site
  - on navigation go to LRS > add
  - fill form using Learning Locker endpoint and created client credentials
