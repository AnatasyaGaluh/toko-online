<?php
header("Access-Control-Allow-Origin: *");
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});


Route::get('/product','ProductController@get');
Route::post('/product','ProductController@find');
Route::post('/product/save','ProductController@save');
Route::delete('/product/drop/{id}','ProductController@drop');

Route::get('/user','UserController@get');
Route::post('/user','UserController@find');
Route::post('/user/save_profil','UserController@save_profil');
Route::delete('/user/drop/{id_user}','UserController@drop');
Route::post("/user/auth", "UserController@auth");
Route::post('/register', 'UserController@register');
Route::get('/user/{id_user}', 'UserController@getById');

Route::get('/orders', 'OrdersController@get');
Route::get('/orders/{id_user}', 'OrdersController@getById');
Route::post('/orders/save', 'OrdersController@save');
Route::post("/accept/{id_orders}", "OrdersController@accept");