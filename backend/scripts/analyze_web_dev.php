<?php
ini_set('memory_limit', '1024M');

$file = 'C:/myfiles/docs/smarttouch/services/Web & App Development.png';
$im = imagecreatefrompng($file);
$w = imagesx($im);
$h = imagesy($im);

echo "Web & App Development: {$w}x{$h}\n";

// Let's create an overview downscaled image so we can inspect layout
$overviewW = 480;
$overviewH = (int)($h * ($overviewW / $w));
$overview = imagecreatetruecolor($overviewW, $overviewH);
imagecopyresampled($overview, $im, 0, 0, 0, 0, $overviewW, $overviewH, $w, $h);

imagepng($overview, 'c:/antigravity/smarttouch/frontend/public/images/services/web-dev-overview.png');
echo "Saved overview: {$overviewW}x{$overviewH}\n";
imagedestroy($overview);
imagedestroy($im);
