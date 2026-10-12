<?php
ini_set('memory_limit', '1024M');

// Helper to crop by finding bounding box of non-background content or by exact bounding box
function cropRegion($sourcePng, $x, $y, $w, $h, $destName) {
    $frontendDir = 'c:/antigravity/smarttouch/frontend/public/images/services';
    $backendDir = 'c:/antigravity/smarttouch/backend/public/images/services';
    if (!is_dir($frontendDir)) mkdir($frontendDir, 0777, true);
    if (!is_dir($backendDir)) mkdir($backendDir, 0777, true);

    $im = imagecreatefrompng($sourcePng);
    $cropped = imagecrop($im, ['x' => $x, 'y' => $y, 'width' => $w, 'height' => $h]);
    if ($cropped !== false) {
        imagepng($cropped, $frontendDir . '/' . $destName);
        imagepng($cropped, $backendDir . '/' . $destName);
        imagedestroy($cropped);
        echo "Cropped and saved: $destName ({$w}x{$h})\n";
    } else {
        echo "ERROR cropping $destName\n";
    }
    imagedestroy($im);
}

// Let's write a helper to automatically find high-contrast bounding boxes (e.g. photos/banners)
function findAndCropPhoto($sourcePng, $searchYStart, $searchYEnd, $searchXStart, $searchXEnd, $destName, $padding = 0) {
    $im = imagecreatefrompng($sourcePng);
    $w = imagesx($im);
    $h = imagesy($im);

    // Let's find first and last non-white/non-bg pixel
    // Sample background color from top-left of search area
    $bgRgb = imagecolorat($im, $searchXStart + 2, $searchYStart + 2);
    $bgR = ($bgRgb >> 16) & 0xFF;
    $bgG = ($bgRgb >> 8) & 0xFF;
    $bgB = ($bgRgb >> 0) & 0xFF;

    $minX = $searchXEnd;
    $maxX = $searchXStart;
    $minY = $searchYEnd;
    $maxY = $searchYStart;

    $found = false;
    for ($y = $searchYStart; $y <= $searchYEnd; $y += 4) {
        for ($x = $searchXStart; $x <= $searchXEnd; $x += 4) {
            $rgb = imagecolorat($im, $x, $y);
            $r = ($rgb >> 16) & 0xFF;
            $g = ($rgb >> 8) & 0xFF;
            $b = ($rgb >> 0) & 0xFF;
            $diff = abs($r - $bgR) + abs($g - $bgG) + abs($b - $bgB);
            if ($diff > 35) { // significantly different from background
                $found = true;
                if ($x < $minX) $minX = $x;
                if ($x > $maxX) $maxX = $x;
                if ($y < $minY) $minY = $y;
                if ($y > $maxY) $maxY = $y;
            }
        }
    }

    if ($found && $maxX > $minX && $maxY > $minY) {
        $cropX = max(0, $minX - $padding);
        $cropY = max(0, $minY - $padding);
        $cropW = min($w - $cropX, ($maxX - $minX) + ($padding * 2));
        $cropH = min($h - $cropY, ($maxY - $minY) + ($padding * 2));

        $cropped = imagecrop($im, ['x' => $cropX, 'y' => $cropY, 'width' => $cropW, 'height' => $cropH]);
        if ($cropped !== false) {
            $frontendDir = 'c:/antigravity/smarttouch/frontend/public/images/services';
            $backendDir = 'c:/antigravity/smarttouch/backend/public/images/services';
            imagepng($cropped, $frontendDir . '/' . $destName);
            imagepng($cropped, $backendDir . '/' . $destName);
            imagedestroy($cropped);
            echo "Auto-detected & saved: $destName ($cropX, $cropY, {$cropW}x{$cropH})\n";
        }
    } else {
        echo "Could not auto-detect for $destName in range Y: $searchYStart - $searchYEnd\n";
    }
    imagedestroy($im);
}

echo "Helper loaded.\n";
