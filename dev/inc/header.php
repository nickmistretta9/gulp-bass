<!DOCTYPE html>
<html class="no-js" lang="">
<head>
    <META NAME="ROBOTS" CONTENT="NOINDEX, NOFOLLOW"> <!-- NO SEO - REMOVE BEFORE GOING LIVE -->
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title><?php
        if (isset($pageTitle)) {
        echo $pageTitle;
        } else {
        echo "Title";
        }
    ?></title>
    <meta name="description" content="<?php
        if (isset($pageDescription)) {
        echo $pageDescription;
        } else {
        echo "Description";
        }
    ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="theme-color" content="#FFFFFF" />

    <!-- Site CSS -->
    <link type='text/css' rel="stylesheet" href="css/main.css">
    
    <!-- jQuery Library -->  
    <script src="//ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

    <!-- FontAwesome CDN Link -->
    <script defer src="https://use.fontawesome.com/releases/v5.0.6/js/all.js"></script>

    <!-- Google Analytics Tag -->

</head>
<body>
<?php
    if( ! ini_get('date.timezone') ) {
        date_default_timezone_set('EST');
    }
?>
<header class="site-header">
	<div class="container-fluid">
        <div class="logo">
            <a href="./"><img src="images/logo.png" alt=""></a>
        </div>   
    </div>
</header>
<nav class="navbar navbar-expand-md">
    <div class="container-fluid">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsingNavbarSm">
            <span class="navbar-toggler-icon"></span> Navigation
        </button>
        <div class="navbar-collapse collapse" id="collapsingNavbarSm">
            <ul class="navbar-nav">
                <li><a class="nav-link" href="">Example</a></li>
                <li><a class="nav-link" href="">Another example</a></li>
                <li class="dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" data-toggle="dropdown" aria-expanded="false">Dropdown</a>
                    <ul class="dropdown-menu">
                        <li><a href="" class="dropdown-item">Example</a></li>
                        <li><a href="" class="dropdown-item">Another example</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</nav>