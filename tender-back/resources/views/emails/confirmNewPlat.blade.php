<!DOCTYPE html>
<html lang="fr">
    <head>
        <meta charset="utf-8">
    </head>

    <body>
        <h2>Your dish has been added !</h2>

        <p>Thank you {{ $attributes['nom'] }} your dish has been added successful.</p><br>

        <ul>
            <h3>Information of your dish :</h3>
            <li>Title : {{ $attributes['title_dish'] }}</li>
            <li>Description : {{ $attributes['description'] }}</li>
            <li>Portion : {{ $attributes['portion'] }}</li>
            <li>Location : {{ $attributes['location'] }}</li>
            <li>Withdrawal time : {{ $attributes['withdrawal'] }}</li>
        </ul><br>

        <p>The tender team thank you.</p>
    </body>
</html>
