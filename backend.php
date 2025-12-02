<?php

header("Access-Control-Allow-Origin: *");

$to = "tucorreo@ejemplo.com";  // Esto hay que cambiarlo Oscar

$subject = "Nuevo presupuesto desde tu web";

$total_cost = $_POST["total_cost"] ?? 0;
$product_type = $_POST["product_type"] ?? "";
$width = $_POST["width"] ?? "";
$height = $_POST["height"] ?? "";
$design = $_POST["design_complexity"] ?? "";

$message = "
Nuevo presupuesto recibido:\n
Tipo: $product_type
Dimensiones: $width m x $height m
Complejidad: $design
Total: $total_cost €
";

$headers = "From: Web <no-reply@web.com>";

$file_path = "";
$attachment = "";



if (!empty($_FILES["file"]["name"])) {
    
    $upload_dir = "uploads/";
    
    if (!is_dir($upload_dir)) {
        mkdir($upload_dir, 0777, true);
    }

    $filename = time() . "_" . basename($_FILES["file"]["name"]);
    $file_path = $upload_dir . $filename;

    if (move_uploaded_file($_FILES["file"]["tmp_name"], $file_path)) {
        $message .= "\nArchivo subido: $file_path\n";
    } else {
        $message .= "\nError al subir archivo.\n";
    }
}

if (mail($to, $subject, $message, $headers)) {
    echo "Presupuesto enviado correctamente.";
} else {
    echo "Error enviando email.";
}

?>