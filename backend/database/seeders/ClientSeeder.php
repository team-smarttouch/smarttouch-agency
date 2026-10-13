<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Client;

class ClientSeeder extends Seeder
{
    public function run(): void
    {
        $clients = [
            [
                'name' => ['en' => 'STC', 'ar' => 'الاتصالات السعودية STC'],
                'logo' => '/images/clients/stc.png',
                'link' => '/portfolio/stc-tamayouz.html',
                'alt' => 'STC Saudi Telecom Company',
                'sort_order' => 1,
                'is_active' => true,
            ],
            [
                'name' => ['en' => 'Al Tazaj', 'ar' => 'فروج الطازج'],
                'logo' => '/images/clients/altazaj.svg',
                'link' => '/portfolio.html',
                'alt' => 'Al Tazaj',
                'sort_order' => 2,
                'is_active' => true,
            ],
            [
                'name' => ['en' => 'AIIC', 'ar' => 'الشركة العربية الدولية للتأمين'],
                'logo' => '/images/clients/aiic.svg',
                'link' => '/portfolio.html',
                'alt' => 'Arabian International Insurance Company',
                'sort_order' => 3,
                'is_active' => true,
            ],
            [
                'name' => ['en' => 'Jahez', 'ar' => 'جاهز'],
                'logo' => '/images/clients/jahez.svg',
                'link' => '/portfolio.html',
                'alt' => 'Jahez',
                'sort_order' => 4,
                'is_active' => true,
            ],
            [
                'name' => ['en' => 'Dar Wa Emaar', 'ar' => 'دار وإعمار'],
                'logo' => '/images/clients/emaar.svg',
                'link' => '/portfolio.html',
                'alt' => 'Dar Wa Emaar',
                'sort_order' => 5,
                'is_active' => true,
            ],
            [
                'name' => ['en' => 'Weetas Real Estate', 'ar' => 'ويتاس العقارية'],
                'logo' => '/images/clients/weetas.svg',
                'link' => '/portfolio/weetas.html',
                'alt' => 'Weetas Real Estate',
                'sort_order' => 6,
                'is_active' => true,
            ],
            [
                'name' => ['en' => 'Obeikan Education', 'ar' => 'العبيكان للتعليم'],
                'logo' => '/images/clients/obeikan.png',
                'link' => '/portfolio.html',
                'alt' => 'Obeikan Education',
                'sort_order' => 7,
                'is_active' => true,
            ],
            [
                'name' => ['en' => 'AWJ Holding Company', 'ar' => 'شركة أوج القابضة'],
                'logo' => '/images/clients/awj.png',
                'link' => '/portfolio/awj.html',
                'alt' => 'AHC AWJ Holding Company',
                'sort_order' => 8,
                'is_active' => true,
            ],
            [
                'name' => ['en' => 'Dala Water', 'ar' => 'مياه دالا'],
                'logo' => '/images/clients/dala.png',
                'link' => '/portfolio/dala.html',
                'alt' => 'Dala Water Factory',
                'sort_order' => 9,
                'is_active' => true,
            ],
            [
                'name' => ['en' => 'Homefix', 'ar' => 'هوم فيكس'],
                'logo' => '/images/clients/homefix.png',
                'link' => '/portfolio/homefix.html',
                'alt' => 'Homefix Maintenance & Facilities',
                'sort_order' => 10,
                'is_active' => true,
            ],
            [
                'name' => ['en' => 'JAH Real Estate', 'ar' => 'جاه للتطوير العقاري'],
                'logo' => '/images/clients/jah.png',
                'link' => '/portfolio.html',
                'alt' => 'JAH Real Estate Development',
                'sort_order' => 11,
                'is_active' => true,
            ],
            [
                'name' => ['en' => 'Mithaq Holding', 'ar' => 'ميثاق القابضة'],
                'logo' => '/images/clients/mithaq.png',
                'link' => '/portfolio.html',
                'alt' => 'Mithaq Holding',
                'sort_order' => 12,
                'is_active' => true,
            ],
            [
                'name' => ['en' => 'Ootlah', 'ar' => 'عطلة للسياحة'],
                'logo' => '/images/clients/ootlah.png',
                'link' => '/portfolio.html',
                'alt' => 'Ootlah Holidays & Activities',
                'sort_order' => 13,
                'is_active' => true,
            ],
        ];

        foreach ($clients as $clientData) {
            Client::updateOrCreate(
                ['name->en' => $clientData['name']['en']],
                $clientData
            );
        }

        $this->command->info('Clients seeded successfully: ' . count($clients));
    }
}
