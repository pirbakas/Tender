<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="utf-8">
</head>
<body>
<h2>Your dish has been booked</h2>
<p>Congrats, you just booked a dish ! You can recover it at {{ $attributes['cuistot'] }}'s place at {{ $attributes['time'] }}, {{ $attributes['location'] }}.</p>
<p>As a reminder, here is the information of your dish:<br>
    Type of cooking : {{ $attributes['type'] }}<br>
    Name of the dish : {{ $attributes['title'] }}<br>
    Description : {{ $attributes['description'] }}<br>
    Number of portion booked : {{ $attributes['portion'] }}<br>
</p>
<p>Thank you for using Tender, have a great meal !</p>
</body>
</html>
