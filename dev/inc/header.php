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
       echo "";
       }
    ?></title>
    <meta name="description" content=<?php
       if (isset($pageDescription)) {
       echo $pageDescription;
       } else {
       echo "";
       }
    ?>"">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="theme-color" content="#FFFFFF" />

    <!-- Site CSS -->
    <link type='text/css' rel="stylesheet" href="css/main.css">
    
    <!-- jQuery Library -->  
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>

    <!-- Google Analytics Tag -->

</head>
<body>
<?php if( ! ini_get('date.timezone') )
{
    date_default_timezone_set('EST');
} ?>
<div id="st-container" class="st-container">
    <nav class="st-menu st-effect-4" id="menu-4">
        <h2>Main Navigation</h2>
        <ul class="nav navbar-nav">
            <li><a href="#">Example</a></li>
        </ul>
    </nav>
<div class="st-pusher">
<div class="st-content">
<div class="st-content-inner">

<header class="site-header">
	
</header>
<nav class="navbar navbar-default">
    <div class="container-fluid">
        <div id="st-trigger-effects" class="column">
            <button class="mobile-toggle" data-effect="st-effect-4"><i class="fa fa-bars"></i></button>
        </div>
        <div class="collapse navbar-collapse" id="main-nav">
            <ul class="nav navbar-nav">
                <li><a href="#">Example</a></li>
            </ul>
        </div>
    </div>
</nav>