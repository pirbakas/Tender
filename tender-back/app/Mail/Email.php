<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class Email extends Mailable
{
    use Queueable, SerializesModels;

    public $attributes;
    public $nameMail;

    // plus d'infos dans EmailController.php

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($nameMail, $subject, $att)
    {
        $this->attributes = $att;
        $this->subject = $subject;
        $this->nameMail=$nameMail;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject($this->subject)
            ->view('emails.'.$this->nameMail);
    }
}
