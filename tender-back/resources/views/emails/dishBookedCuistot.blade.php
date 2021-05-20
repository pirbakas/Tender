<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="utf-8">
</head>
<body>
<h2>Your dish has been booked</h2>
<p>Hey, your dish has been booked ! {{ $attributes['booker'] }} will come at {{ $attributes['time'] }} to {{ $attributes['location'] }} in order to take the dish.</p>
<p>As a reminder, here is the information of your dish:<br>
Type of cooking : {{ $attributes['type'] }}<br>
Name of the dish : {{ $attributes['title'] }}<br>
Description : {{ $attributes['description'] }}<br>
Number of portion booked : {{ $attributes['portion'] }}<br>
</p>
<p>Thank you for using Tender, have a great meal !</p>
</body>
</html>
