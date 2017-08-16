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
<nav class="navbar navbar-default">
    <div class="container-fluid">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#main-nav" aria-expanded="false"><i class="fa fa-bars"></i> Navigation</button>
        </div>
        <div class="collapse navbar-collapse" id="main-nav">
            <ul class="nav navbar-nav">
                <li><a href="#">Example</a></li>
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button">Dropdown <span class="caret"></span></a>
                    <ul class="dropdown-menu">
                        <li><a href="#">Example</a></li>
                        <li><a href="#">Another example</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</nav>