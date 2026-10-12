<?php
ini_set('memory_limit', '1024M');

$srcDir = 'C:/myfiles/docs/smarttouch/services';
$outDir = 'c:/antigravity/smarttouch/frontend/public/images/services';

$files = glob($srcDir . '/*.png');
foreach ($files as $file) {
    $base = basename($file, '.png');
    $slug = strtolower(preg_replace('/[^a-zA-Z0-9]+/', '-', $base));
    $overviewFile = $outDir . '/' . $slug . '-overview.png';
    
    $im = imagecreatefrompng($file);
    $w = imagesx($im);
    $h = imagesy($im);
    
    $overviewW = 480;
    $overviewH = (int)($h * ($overviewW / $w));
    $overview = imagecreatetruecolor($overviewW, $overviewH);
    imagecopyresampled($overview, $im, 0, 0, 0, 0, $overviewW, $overviewH, $w, $h);
    
    imagepng($overview, $overviewFile);
    echo "Saved $slug-overview.png ({$overviewW}x{$overviewH})\n";
    imagedestroy($overview);
    imagedestroy($im);
}
