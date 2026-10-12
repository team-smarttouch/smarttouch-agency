<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class UploadController extends Controller
{
    public function upload(Request $request)
    {
        $file = $request->file('image') ?? $request->file('file');

        if (!$file) {
            return response()->json([
                'success' => false,
                'message' => 'The image or file field is required.'
            ], 422);
        }

        $filename = time() . '_' . Str::random(10) . '.' . ($file->getClientOriginalExtension() ?: 'png');

        // Ensure directories exist
        $frontendUploadsDir = base_path('../frontend/public/uploads');
        $backendUploadsDir = public_path('uploads');

        if (!file_exists($frontendUploadsDir)) {
            @mkdir($frontendUploadsDir, 0777, true);
        }
        if (!file_exists($backendUploadsDir)) {
            @mkdir($backendUploadsDir, 0777, true);
        }

        // Copy to frontend public folder for Next.js direct serving
        $file->move($frontendUploadsDir, $filename);

        // Copy to backend public folder as well
        @copy($frontendUploadsDir . '/' . $filename, $backendUploadsDir . '/' . $filename);

        $url = '/uploads/' . $filename;

        return response()->json([
            'success' => true,
            'message' => 'Image uploaded successfully',
            'url' => $url,
            'filename' => $filename,
        ], 201);
    }
}
