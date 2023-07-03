<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Custom System: DMV</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">

        <!-- CSS  -->
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"/>

        <!-- Font Awesome Icons  -->
        <link rel="stylesheet" type="text/css"  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.3/css/font-awesome.min.css" />

        <!-- Styles -->
        <style>
            /* body {
                font-family: 'Nunito', sans-serif;
            } */
        </style>

        @viteReactRefresh
        @vite(['resources/css/app.css'])

        <!-- Attaching the app.jsx for component rendering  -->
        @vite(['resources/js/app.jsx'])
        
        
    </head>
    <body>       
        <div id="app" class="full-screen bg-light"> </div>
 

    <!-- Scripts  -->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.min.js" crossorigin="anonymous"></script>
        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    </body>
</html>
