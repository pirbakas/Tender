<?php

namespace App\Http\Controllers;

use App\Mail\Email;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class EmailController extends Controller
{

    /*
     * La fonction sendMail permet d'envoyer des emails
     *  > $nameMail correspond au nom de la blade à envoyer. Elles sont stockées dans resources/views/emails
     *    au format 'nomEmail'.blade.php
     *  > $adress est l'adresse email à qui le mail doit être envoyé
     *  > $subject est l'objet du mail
     *  > $attributes correspond aux champs à reseigner à l'intérieur de l'email.
     *
     * Exemple d'utilisation dans un controller :
     *
        $email = new EmailController();
        $email->sendMail('contact', 'antoine.morin@epitech.eu', 'Coucou',[
            'nom' => 'Durand',
            'email' => 'durand@chezlui.com',
            'message' => 'Je voulais vous dire que votre site est magnifique !'
        ]);
     * ==> cet example va envoyer le mail 'contact' en y liant les données 'nom', 'email' et
     * 'message' afin qu'ils soient utilisable dans le corps du mail.
     *
     * L'utilisation de ces variables dans le corps du mail se fait de la manière suivante :
     *
     *
       <ul>
          <li><strong>Nom</strong> : {{ $attributes['nom'] }}</li>
          <li><strong>Email</strong> : {{ $attributes['email'] }}</li>
          <li><strong>Message</strong> : {{ $attributes['message'] }}</li>
       </ul>
     *
     */
    public function sendMail($nameMail, $address, $subject, $attributes=[]):void
    {
        Mail::to($address)
            ->send(new Email($nameMail, $subject, $attributes));
    }
}
