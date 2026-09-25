<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && (isset($_FILES['file']) || isset($_FILES['image']))) {
    $file = isset($_FILES['file']) ? $_FILES['file'] : $_FILES['image'];
    
    $targetDir = "uploads/";
    if (!file_exists($targetDir)) {
        mkdir($targetDir, 0777, true);
    }
    
    $extension = strtolower(pathinfo($file["name"], PATHINFO_EXTENSION));
    $fileName = time() . '_' . uniqid() . '.' . ($extension ?: 'jpg');
    $targetFilePath = $targetDir . $fileName;
    
    if (move_uploaded_file($file["tmp_name"], $targetFilePath)) {
        $protocol = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http");
        $fullUrl = $protocol . "://" . $_SERVER['HTTP_HOST'] . "/" . $targetFilePath;
        
        echo json_encode([
            "success" => true,
            "status" => "success",
            "url" => $fullUrl,
            "filename" => $fileName
        ]);
        exit;
    }
}

echo json_encode([
    "success" => false,
    "status" => "error",
    "message" => "Dosya yuklenemedi!"
]);
?>
