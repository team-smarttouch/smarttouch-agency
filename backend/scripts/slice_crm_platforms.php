<?php
ini_set('memory_limit', '1024M');
require_once __DIR__ . '/slice_helper.php';

$crmFile = 'C:/myfiles/docs/smarttouch/services/CRM.png';

findAndCropPhoto($crmFile, 1550, 1950, 200, 550, 'crm-platform-hubspot.png');
findAndCropPhoto($crmFile, 1550, 1950, 560, 920, 'crm-platform-salesforce.png');
findAndCropPhoto($crmFile, 1550, 1950, 930, 1310, 'crm-platform-zoho.png');
findAndCropPhoto($crmFile, 1550, 1950, 1320, 1720, 'crm-platform-odoo.png');

echo "CRM platforms extracted!\n";
