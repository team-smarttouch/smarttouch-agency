<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Client;

class ClientSeeder extends Seeder
{
    public function run(): void
    {
        Client::truncate();

        $clients = [
            [
                'name' => ['en' => 'STC', 'ar' => 'الاتصالات السعودية STC'],
                'logo' => '/images/clients/client_stc.png',
                'link' => '/portfolio/stc-tamayouz.html',
                'alt' => 'STC Saudi Telecom Company',
                'sort_order' => 1,
                'is_active' => true,
            ],
            [
                'name' => ['en' => 'Dar Wa Emaar', 'ar' => 'دار وإعمار'],
                'logo' => '/images/clients/client_darwa_emaar.png',
                'link' => '/portfolio.html',
                'alt' => 'Dar Wa Emaar Real Estate Development',
                'sort_order' => 2,
                'is_active' => true,
            ],
            [
                'name' => ['en' => 'Obeikan Education', 'ar' => 'مجموعة العبيكان'],
                'logo' => '/images/clients/client_obeikan.png',
                'link' => '/portfolio.html',
                'alt' => 'Obeikan Education & Investment Group',
                'sort_order' => 3,
                'is_active' => true,
            ],
            [
                'name' => ['en' => 'Dala Water', 'ar' => 'مياه دالا'],
                'logo' => '/images/clients/dala-logo.png',
                'link' => '/portfolio/dala.html',
                'alt' => 'Dala Water Factory',
                'sort_order' => 4,
                'is_active' => true,
            ],
            [
                'name' => ['en' => 'Homefix', 'ar' => 'هوم فيكس'],
                'logo' => '/images/clients/client_homefix.png',
                'link' => '/portfolio/homefix.html',
                'alt' => 'Homefix Maintenance & Facilities',
                'sort_order' => 5,
                'is_active' => true,
            ],
            [
                'name' => ['en' => 'AWJ Holding Company', 'ar' => 'شركة أوج القابضة'],
                'logo' => '/images/clients/AWJ-Holding.png',
                'link' => '/portfolio/awj.html',
                'alt' => 'AWJ Holding Company',
                'sort_order' => 6,
                'is_active' => true,
            ],
            [
                'name' => ['en' => 'Mithaq Holding', 'ar' => 'ميثاق القابضة'],
                'logo' => '/images/clients/MITHAQ-HOLDING.png',
                'link' => '/portfolio.html',
                'alt' => 'Mithaq Holding Company',
                'sort_order' => 7,
                'is_active' => true,
            ],
            [
                'name' => ['en' => 'JAH Real Estate', 'ar' => 'جاه للتطوير العقاري'],
                'logo' => '/images/clients/client_jah.png',
                'link' => '/portfolio.html',
                'alt' => 'JAH Real Estate Development',
                'sort_order' => 8,
                'is_active' => true,
            ],
        ];

        foreach ($clients as $clientData) {
            Client::create($clientData);
        }

        $this->command->info('Clients seeded successfully: ' . count($clients));
    }
}
