const option = {
  // Turkey
  Turkey: [
    "Istanbul", "Ankara", "Izmir", "Antalya", "Bursa",
    "Adana", "Gaziantep", "Konya", "Mersin", "Eskisehir"
  ],

  // Egypt
  Egypt: [
    "Cairo", "Alexandria", "Giza", "Shubra El-Kheima", "Port Said",
    "Suez", "Luxor", "Aswan", "Tanta", "Mansoura"
  ],

  // Greece
  Greece: [
    "Athens", "Thessaloniki", "Patras", "Heraklion", "Larissa",
    "Volos", "Rhodes", "Ioannina", "Chania", "Kavala"
  ],

  // Bulgaria
  Bulgaria: [
    "Sofia", "Plovdiv", "Varna", "Burgas", "Ruse",
    "Stara Zagora", "Pleven", "Sliven", "Dobrich", "Shumen"
  ],

  // UAE
  UAE: [
    "Dubai", "Abu Dhabi", "Sharjah", "Al Ain", "Ajman",
    "Ras Al Khaimah", "Fujairah", "Umm Al Quwain", "Khor Fakkan", "Dibba"
  ],

  // Cyprus
  Cyprus: [
    "Nicosia", "Limassol", "Larnaca", "Paphos", "Famagusta",
    "Kyrenia", "Paralimni", "Morphou", "Dali", "Lakatamia"
  ],

  // Spain
  Spain: [
    "Madrid", "Barcelona", "Valencia", "Seville", "Zaragoza",
    "Málaga", "Murcia", "Palma", "Las Palmas", "Bilbao"
  ],

  // Maldives
  Maldives: [
    "Malé", "Addu City", "Fuvahmulah", "Kulhudhuffushi", "Thinadhoo",
    "Naifaru", "Dhidhdhoo", "Hithadhoo", "Eydhafushi", "Mahibadhoo"
  ],

  // Montenegro
  Montenegro: [
    "Podgorica", "Nikšić", "Herceg Novi", "Pljevlja", "Bijelo Polje",
    "Cetinje", "Bar", "Tivat", "Berane", "Ulcinj"
  ],

  // Sri Lanka
  "Sri Lanka": [
    "Colombo", "Kandy", "Galle", "Jaffna", "Negombo",
    "Anuradhapura", "Ratnapura", "Matara", "Kurunegala", "Trincomalee"
  ],

  // Tanzania
  Tanzania: [
    "Dar es Salaam", "Dodoma", "Mwanza", "Arusha", "Mbeya",
    "Tanga", "Morogoro", "Kigoma", "Zanzibar City", "Moshi"
  ],

  // Tunisia
  Tunisia: [
    "Tunis", "Sfax", "Sousse", "Kairouan", "Bizerte",
    "Gabès", "Ariana", "Gafsa", "Monastir", "Nabeul"
  ],

  // Albania
  Albania: [
    "Tirana", "Durrës", "Vlorë", "Shkodër", "Fier",
    "Korçë", "Berat", "Elbasan", "Gjirokastër", "Sarandë"
  ],

  // Austria
  Austria: [
    "Vienna", "Graz", "Linz", "Salzburg", "Innsbruck",
    "Klagenfurt", "Villach", "Wels", "Sankt Pölten", "Dornbirn"
  ],

  // Andorra
  Andorra: [
    "Andorra la Vella", "Escaldes-Engordany", "Encamp", "Sant Julià de Lòria", "La Massana",
    "Ordino", "Canillo", "El Pas de la Casa", "Arinsal", "Les Escaldes"
  ],

  // Hungary
  Hungary: [
    "Budapest", "Debrecen", "Szeged", "Miskolc", "Pécs",
    "Győr", "Nyíregyháza", "Kecskemét", "Székesfehérvár", "Eger"
  ],

  // Georgia
  Georgia: [
    "Tbilisi", "Batumi", "Kutaisi", "Rustavi", "Zugdidi",
    "Gori", "Poti", "Samtredia", "Khashuri", "Telavi"
  ],

  // Dominican Republic
  "Dominican Republic": [
    "Santo Domingo", "Santiago", "San Pedro de Macorís", "La Romana", "Punta Cana",
    "Puerto Plata", "Higüey", "Bávaro", "Moca", "San Cristóbal"
  ],

  // Indonesia
  Indonesia: [
    "Jakarta", "Surabaya", "Bandung", "Medan", "Semarang",
    "Makassar", "Yogyakarta", "Palembang", "Denpasar", "Balikpapan"
  ],

  // Italy
  Italy: [
    "Rome", "Milan", "Naples", "Turin", "Florence",
    "Venice", "Bologna", "Genoa", "Palermo", "Bari"
  ],

  // Cuba
  Cuba: [
    "Havana", "Santiago de Cuba", "Camagüey", "Holguín", "Guantánamo",
    "Santa Clara", "Las Tunas", "Bayamo", "Cienfuegos", "Pinar del Río"
  ],

  // Lithuania
  Lithuania: [
    "Vilnius", "Kaunas", "Klaipėda", "Šiauliai", "Panevėžys",
    "Alytus", "Marijampolė", "Mažeikiai", "Jonava", "Utena"
  ],

  // Latvia
  Latvia: [
    "Riga", "Daugavpils", "Liepāja", "Jelgava", "Jūrmala",
    "Ventspils", "Rēzekne", "Valmiera", "Ogre", "Tukums"
  ],

  // Mauritius
  Mauritius: [
    "Port Louis", "Beau Bassin-Rose Hill", "Vacoas-Phoenix", "Curepipe", "Quatre Bornes",
    "Triolet", "Goodlands", "Centre de Flacq", "Bel Air", "Mahébourg"
  ],

  // Mexico
  Mexico: [
    "Mexico City", "Guadalajara", "Monterrey", "Puebla", "Tijuana",
    "León", "Mérida", "Cancún", "Toluca", "Querétaro"
  ],

  // Portugal
  Portugal: [
    "Lisbon", "Porto", "Amadora", "Braga", "Coimbra",
    "Funchal", "Setúbal", "Almada", "Aveiro", "Faro"
  ],

  // Seychelles
  Seychelles: [
    "Victoria", "Anse Boileau", "Anse Royale", "Baie Lazare", "Beau Vallon",
    "Bel Ombre", "Cascade", "Glacis", "Grand Anse", "Plaisance"
  ],

  // Thailand
  Thailand: [
    "Bangkok", "Chiang Mai", "Phuket", "Pattaya", "Hat Yai",
    "Udon Thani", "Khon Kaen", "Nakhon Ratchasima", "Surat Thani", "Hua Hin"
  ],

  // France
  France: [
    "Paris", "Marseille", "Lyon", "Toulouse", "Nice",
    "Nantes", "Strasbourg", "Montpellier", "Bordeaux", "Lille"
  ],

  // Czech Republic
  "Czech Republic": [
    "Prague", "Brno", "Ostrava", "Plzeň", "Liberec",
    "Olomouc", "Ústí nad Labem", "Hradec Králové", "Pardubice", "Zlín"
  ],

  // Estonia
  Estonia: [
    "Tallinn", "Tartu", "Narva", "Pärnu", "Kohtla-Järve",
    "Viljandi", "Rakvere", "Maardu", "Sillamäe", "Kuressaare"
  ]
};

export { option };
