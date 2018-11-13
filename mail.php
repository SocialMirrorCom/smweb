<?
$name = $_POST['name'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$subject = $_POST['subject'];
$message = $_POST['objectives'];
$formcontent=
"\n Subject: $subject". 
($name ? "\n From: $name" : '').
($phone ? "\n Phone: $phone" : '').
($email ? "\n Email: $email" : '').
($message ? "\n Message: $message" : '');
$recipient = "kate@social-mirror.com";
$mailheader = "From: $email \r\n";
$mail = mail($recipient, $subject, $formcontent, $mailheader);
if($mail && $_POST['ajax'] == 1)
{
	echo "1";
}
elseif($mail)
{
	header('Location: http://test.ya-colibri.ru');
}
else
{
	echo "not";
}
?>
