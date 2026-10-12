<?php
ini_set('memory_limit', '1024M');

$srcDir = 'C:/myfiles/docs/smarttouch/services';
$frontendDir = 'c:/antigravity/smarttouch/frontend/public/images/services';
$backendDir = 'c:/antigravity/smarttouch/backend/public/images/services';

if (!is_dir($frontendDir)) mkdir($frontendDir, 0777, true);
if (!is_dir($backendDir)) mkdir($backendDir, 0777, true);

function cropAndSave($im, $x, $y, $w, $h, $filename) {
    global $frontendDir, $backendDir;
    $cropped = imagecrop($im, ['x' => $x, 'y' => $y, 'width' => $w, 'height' => $h]);
    if ($cropped !== false) {
        imagepng($cropped, $frontendDir . '/' . $filename);
        imagepng($cropped, $backendDir . '/' . $filename);
        imagedestroy($cropped);
        echo "Saved: $filename ({$w}x{$h})\n";
    } else {
        echo "Failed to crop: $filename\n";
    }
}

// Let's create an analyzer for each image to locate exact visual bounding boxes
echo "Starting asset extraction...\n";
