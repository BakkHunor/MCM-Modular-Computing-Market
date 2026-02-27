-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2026. Feb 27. 09:09
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `mcm`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `cart_items`
--

CREATE TABLE `cart_items` (
  `cart_item_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `session_id` varchar(255) DEFAULT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `cart_items`
--

INSERT INTO `cart_items` (`cart_item_id`, `user_id`, `session_id`, `product_id`, `quantity`, `created_at`) VALUES
(2, NULL, 'asdasdasdasdd', 2, 1, '2026-02-15 21:44:20');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `gamekeys`
--

CREATE TABLE `gamekeys` (
  `key_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `game_name` varchar(100) NOT NULL,
  `platform` varchar(50) NOT NULL,
  `code` varchar(100) NOT NULL,
  `is_used` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `gamekeys`
--

INSERT INTO `gamekeys` (`key_id`, `product_id`, `game_name`, `platform`, `code`, `is_used`) VALUES
(1, 1, 'GTA V', 'Steam', 'GTA-STEAM-KEY-001', 0),
(3, 28, 'Cyberpunk 2077', 'Steam', 'CYBERPUNK2077-STEAM-KEY-001', 0),
(4, 29, 'Red Dead Redemption 2', 'Rockstar', 'RDR2-ROCKSTAR-KEY-001', 0),
(5, 30, 'Elden Ring', 'Steam', 'ELDENRING-STEAM-KEY-001', 0),
(6, 31, 'Forza Horizon 5', 'Xbox', 'FORZAHORIZON5-XBOX-KEY-001', 0),
(7, 32, 'EA Sports FC 25', 'EA', 'FC25-EA-KEY-001', 0),
(8, 33, 'Tom Clancy\'s Rainbow Six Siege', 'Ubisoft', 'RAINBOWSIX-UBISOFT-KEY-001', 0),
(9, 34, 'Minecraft Java Edition', 'Mojang', 'MINECRAFT-MOJANG-KEY-001', 0),
(10, 35, 'Grand Theft Auto VI', 'Rockstar', 'GTA6-ROCKSTAR-KEY-001', 0),
(11, 36, 'Hogwarts Legacy', 'Steam', 'HOGWARTSLEGACY-STEAM-KEY-001', 0),
(12, 37, 'Baldur\'s Gate 3', 'Steam', 'BALDURSGATE3-STEAM-KEY-001', 0),
(13, 38, 'Starfield', 'Steam', 'STARFIELD-STEAM-KEY-001', 0),
(14, 39, 'Diablo IV', 'BattleNet', 'DIABLO4-BATTLENET-KEY-001', 0),
(15, 40, 'Overwatch 2', 'BattleNet', 'OVERWATCH2-BATTLENET-KEY-001', 0),
(16, 41, 'Valorant', 'Riot', 'VALORANT-RIOT-KEY-001', 0),
(17, 42, 'Call of Duty: Modern Warfare III', 'BattleNet', 'MW3-BATTLENET-KEY-001', 0),
(18, 43, 'Assassin\'s Creed Mirage', 'Ubisoft', 'ACMIRAGE-UBISOFT-KEY-001', 0),
(19, 44, 'Alan Wake 2', 'Epic', 'ALANWAKE2-EPIC-KEY-001', 0),
(20, 45, 'Resident Evil 4 Remake', 'Steam', 'RE4REMAKE-STEAM-KEY-001', 0),
(21, 46, 'The Witcher 3 Complete Edition', 'GOG', 'WITCHER3-GOG-KEY-001', 0),
(22, 47, 'Forza Motorsport', 'Xbox', 'FORZAMOTORSPORT-XBOX-KEY-001', 0),
(23, 48, 'Gran Turismo 7', 'PlayStation', 'GRANTURISMO7-PLAYSTATION-KEY-001', 0),
(24, 49, 'Marvel\'s Spider-Man 2', 'PlayStation', 'SPIDERMAN2-PLAYSTATION-KEY-001', 0),
(25, 50, 'Helldivers 2', 'Steam', 'HELLDIVERS2-STEAM-KEY-001', 0);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `giftcards`
--

CREATE TABLE `giftcards` (
  `card_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `platform` varchar(50) NOT NULL,
  `value` decimal(10,2) NOT NULL,
  `code` varchar(100) NOT NULL,
  `is_used` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `giftcards`
--

INSERT INTO `giftcards` (`card_id`, `product_id`, `platform`, `value`, `code`, `is_used`) VALUES
(1, 2, 'Steam', 20.00, 'STEAM-CARD-001', 0),
(2, 52, 'Steam', 50.00, 'STEAM-CARD-002', 0),
(3, 53, 'Xbox', 50.00, 'XBOX-CARD-001', 0),
(4, 54, 'PlayStation', 50.00, 'PLAYSTATION-CARD-001', 0),
(5, 55, 'Nintendo', 50.00, 'NINTENDO-CARD-001', 0),
(6, 56, 'EA', 25.00, 'EA-CARD-001', 0),
(7, 57, 'Ubisoft', 25.00, 'UBISOFT-CARD-001', 0),
(8, 58, 'BattleNet', 25.00, 'BATTLENET-CARD-001', 0),
(9, 59, 'Riot', 25.00, 'RIOT-CARD-001', 0),
(10, 60, 'GooglePlay', 25.00, 'GOOGLEPLAY-CARD-001', 0),
(11, 61, 'AppStore', 25.00, 'APPSTORE-CARD-001', 0),
(12, 62, 'Netflix', 25.00, 'NETFLIX-CARD-001', 0),
(13, 63, 'Spotify', 25.00, 'SPOTIFY-CARD-001', 0),
(14, 64, 'Amazon', 25.00, 'AMAZON-CARD-001', 0),
(15, 65, 'Discord', 25.00, 'DISCORD-CARD-001', 0),
(16, 66, 'Roblox', 25.00, 'ROBLOX-CARD-001', 0),
(17, 67, 'Minecraft', 25.00, 'MINECRAFT-CARD-001', 0),
(18, 68, 'Xbox', 0.00, 'XBOXGAMEPASS-CARD-001', 0),
(19, 69, 'PlayStation', 0.00, 'PSPLUS-CARD-001', 0),
(20, 70, 'Nintendo', 0.00, 'NSO-CARD-001', 0),
(21, 71, 'EA', 0.00, 'EAPLAY-CARD-001', 0),
(22, 72, 'Ubisoft', 0.00, 'UBISOFTPLUS-CARD-001', 0),
(23, 73, 'BattleNet', 50.00, 'BATTLENET-CARD-002', 0),
(24, 74, 'Riot', 50.00, 'RIOT-CARD-002', 0),
(25, 75, 'Steam', 100.00, 'STEAM-CARD-003', 0);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `orderdetails`
--

CREATE TABLE `orderdetails` (
  `detail_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) DEFAULT 1,
  `price_at_purchase` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `orderdetails`
--

INSERT INTO `orderdetails` (`detail_id`, `order_id`, `product_id`, `quantity`, `price_at_purchase`) VALUES
(1, 1, 3, 1, 85000.00);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `session_id` varchar(255) DEFAULT NULL,
  `order_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` enum('pending','paid','shipped','completed','cancelled') DEFAULT 'pending',
  `payment_method` enum('card','paypal','bank','none') DEFAULT 'none',
  `payment_id` varchar(100) DEFAULT NULL,
  `total_amount` decimal(10,2) DEFAULT 0.00,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `phone` varchar(30) NOT NULL,
  `zip_code` varchar(20) NOT NULL,
  `city` varchar(100) NOT NULL,
  `address_line` varchar(255) NOT NULL,
  `additional_info` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `orders`
--

INSERT INTO `orders` (`order_id`, `user_id`, `session_id`, `order_date`, `status`, `payment_method`, `payment_id`, `total_amount`, `first_name`, `last_name`, `email`, `phone`, `zip_code`, `city`, `address_line`, `additional_info`) VALUES
(1, 3, NULL, '2026-02-15 18:53:02', 'pending', 'none', NULL, 85000.00, '', '', '', '', '', '', '', NULL);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `products`
--

CREATE TABLE `products` (
  `product_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `category` enum('hardware','gamekey','giftcard') NOT NULL,
  `requires_login` tinyint(1) DEFAULT 0,
  `price` decimal(10,2) NOT NULL,
  `stock` int(11) DEFAULT 0,
  `description` text DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `products`
--

INSERT INTO `products` (`product_id`, `name`, `category`, `requires_login`, `price`, `stock`, `description`, `image_url`, `is_active`, `created_at`) VALUES
(1, 'GTA V Steam Key', 'gamekey', 0, 5990.00, 10, 'GTA V digitális kulcs', 'gtav.jpg', 1, '2026-02-15 18:44:03'),
(2, 'Steam Gift Card 20€', 'giftcard', 0, 8000.00, 5, 'Steam ajándékkártya', 'steamcard.jpg', 1, '2026-02-15 18:44:03'),
(3, 'Ryzen 7 5800X', 'hardware', 1, 85000.00, 2, 'AMD Processzor', 'ryzen.jpg', 1, '2026-02-15 18:44:03'),
(4, 'Intel Core i5-14400F', 'hardware', 1, 85000.00, 10, 'Intel Core i5-14400F, 10 mag, LGA1700, gamer és általános felhasználásra', 'i5_14400f.jpg', 1, '2026-02-17 08:23:27'),
(5, 'Intel Core i7-14700K', 'hardware', 1, 165000.00, 8, 'Intel Core i7-14700K, 20 mag, tuningolható, LGA1700', 'i7_14700k.jpg', 1, '2026-02-17 08:23:27'),
(6, 'Intel Core i9-14900K', 'hardware', 1, 260000.00, 5, 'Intel Core i9-14900K, csúcskategóriás gamer és workstation CPU', 'i9_14900k.jpg', 1, '2026-02-17 08:23:27'),
(7, 'AMD Ryzen 5 7600', 'hardware', 1, 90000.00, 12, 'AMD Ryzen 5 7600, AM5 foglalat, 6 mag, 12 szál', 'ryzen5_7600.jpg', 1, '2026-02-17 08:23:27'),
(8, 'AMD Ryzen 7 7800X3D', 'hardware', 1, 145000.00, 7, 'AMD Ryzen 7 7800X3D, kiemelkedő játékos teljesítmény, AM5', 'ryzen7_7800x3d.jpg', 1, '2026-02-17 08:23:27'),
(9, 'AMD Ryzen 9 7950X3D', 'hardware', 1, 260000.00, 3, 'AMD Ryzen 9 7950X3D, csúcskategóriás játék és munka CPU', 'ryzen9_7950x3d.jpg', 1, '2026-02-17 08:23:27'),
(10, 'NVIDIA GeForce RTX 4070 12GB', 'hardware', 1, 260000.00, 6, 'RTX 4070 12GB GDDR6X, kiváló QHD gaming teljesítmény', 'rtx4070.jpg', 1, '2026-02-17 08:23:27'),
(11, 'NVIDIA GeForce RTX 4070 Ti SUPER 16GB', 'hardware', 1, 380000.00, 4, 'RTX 4070 Ti SUPER 16GB, magas FPS QHD és 4K játékokhoz', 'rtx4070ti_super.jpg', 1, '2026-02-17 08:23:27'),
(12, 'NVIDIA GeForce RTX 4080 SUPER 16GB', 'hardware', 1, 520000.00, 3, 'RTX 4080 SUPER 16GB, csúcskategóriás 4K gaming', 'rtx4080_super.jpg', 1, '2026-02-17 08:23:27'),
(13, 'AMD Radeon RX 7800 XT 16GB', 'hardware', 1, 210000.00, 5, 'Radeon RX 7800 XT 16GB, erős QHD teljesítmény', 'rx7800xt.jpg', 1, '2026-02-17 08:23:27'),
(14, 'AMD Radeon RX 7900 XTX 24GB', 'hardware', 1, 380000.00, 3, 'Radeon RX 7900 XTX 24GB, csúcskategóriás 4K kártya', 'rx7900xtx.jpg', 1, '2026-02-17 08:23:27'),
(15, '32GB DDR5 6000MHz Kit', 'hardware', 1, 45000.00, 15, '32GB (2x16GB) DDR5 6000MHz CL30 memória kit', 'ddr5_32gb_6000.jpg', 1, '2026-02-17 08:23:27'),
(16, '64GB DDR5 6000MHz Kit', 'hardware', 1, 85000.00, 8, '64GB (2x32GB) DDR5 6000MHz memória kit', 'ddr5_64gb_6000.jpg', 1, '2026-02-17 08:23:27'),
(17, '1TB PCIe 4.0 NVMe SSD', 'hardware', 1, 28000.00, 20, '1TB PCIe 4.0 NVMe SSD, gyors rendszermeghajtó', 'nvme_pcie4_1tb.jpg', 1, '2026-02-17 08:23:27'),
(18, '2TB PCIe 4.0 NVMe SSD', 'hardware', 1, 52000.00, 15, '2TB PCIe 4.0 NVMe SSD, játékokhoz és munkához', 'nvme_pcie4_2tb.jpg', 1, '2026-02-17 08:23:27'),
(19, '2TB PCIe 5.0 NVMe SSD', 'hardware', 1, 78000.00, 10, '2TB PCIe 5.0 NVMe SSD, extrém sebességű tárhely', 'nvme_pcie5_2tb.jpg', 1, '2026-02-17 08:23:27'),
(20, 'X670E Gaming alaplap', 'hardware', 1, 120000.00, 6, 'AMD X670E chipsetes gaming alaplap, AM5 foglalat', 'mb_x670e.jpg', 1, '2026-02-17 08:23:27'),
(21, 'B650 Gaming alaplap', 'hardware', 1, 70000.00, 10, 'AMD B650 chipsetes alaplap, AM5, középkategóriás gamer buildhez', 'mb_b650.jpg', 1, '2026-02-17 08:23:27'),
(22, 'Z790 Gaming WiFi alaplap', 'hardware', 1, 130000.00, 5, 'Intel Z790 chipsetes gaming alaplap, LGA1700, WiFi-vel', 'mb_z790.jpg', 1, '2026-02-17 08:23:27'),
(23, '27\" 1440p 165Hz Gaming monitor', 'hardware', 1, 120000.00, 7, '27 hüvelykes, 1440p, 165Hz, IPS gaming monitor', 'monitor_27_165_1440p.jpg', 1, '2026-02-17 08:23:27'),
(24, '27\" 4K 144Hz Gaming monitor', 'hardware', 1, 190000.00, 4, '27 hüvelykes, 4K, 144Hz, HDR gaming monitor', 'monitor_27_144_4k.jpg', 1, '2026-02-17 08:23:27'),
(25, '34\" Ultrawide 144Hz monitor', 'hardware', 1, 180000.00, 3, '34 hüvelykes, ultrawide, 144Hz, gamer monitor', 'monitor_34_ultrawide.jpg', 1, '2026-02-17 08:23:27'),
(26, 'Mechanical RGB gaming keyboard', 'hardware', 1, 28000.00, 25, 'Mechanikus, RGB világítású gaming billentyűzet', 'keyboard_mech_rgb.jpg', 1, '2026-02-17 08:23:27'),
(27, 'Wireless 26000 DPI gaming mouse', 'hardware', 1, 22000.00, 30, 'Vezeték nélküli, nagy pontosságú gaming egér', 'mouse_wireless_26000dpi.jpg', 1, '2026-02-17 08:23:27'),
(28, 'Cyberpunk 2077 Steam Key', 'gamekey', 0, 15990.00, 20, 'Cyberpunk 2077 digitális Steam kulcs', 'cyberpunk2077.jpg', 1, '2026-02-17 08:23:27'),
(29, 'Red Dead Redemption 2 Rockstar Key', 'gamekey', 0, 17990.00, 15, 'Red Dead Redemption 2 digitális Rockstar kulcs', 'rdr2.jpg', 1, '2026-02-17 08:23:27'),
(30, 'Elden Ring Steam Key', 'gamekey', 0, 19990.00, 20, 'Elden Ring digitális Steam kulcs', 'eldenring.jpg', 1, '2026-02-17 08:23:27'),
(31, 'Forza Horizon 5 Xbox Key', 'gamekey', 0, 18990.00, 15, 'Forza Horizon 5 digitális Xbox kulcs', 'forzahorizon5.jpg', 1, '2026-02-17 08:23:27'),
(32, 'EA Sports FC 25 EA Key', 'gamekey', 0, 21990.00, 20, 'EA Sports FC 25 digitális EA App kulcs', 'fc25.jpg', 1, '2026-02-17 08:23:27'),
(33, 'Tom Clancy\'s Rainbow Six Siege Ubisoft Key', 'gamekey', 0, 9990.00, 25, 'Rainbow Six Siege digitális Ubisoft Connect kulcs', 'r6s.jpg', 1, '2026-02-17 08:23:27'),
(34, 'Minecraft Java Edition Key', 'gamekey', 0, 11990.00, 25, 'Minecraft Java Edition digitális kulcs', 'minecraft_java.jpg', 1, '2026-02-17 08:23:27'),
(35, 'Grand Theft Auto VI Rockstar Key', 'gamekey', 0, 25990.00, 10, 'Grand Theft Auto VI digitális Rockstar kulcs (példa)', 'gta6.jpg', 1, '2026-02-17 08:23:27'),
(36, 'Hogwarts Legacy Steam Key', 'gamekey', 0, 18990.00, 15, 'Hogwarts Legacy digitális Steam kulcs', 'hogwartslegacy.jpg', 1, '2026-02-17 08:23:27'),
(37, 'Baldur\'s Gate 3 Steam Key', 'gamekey', 0, 21990.00, 15, 'Baldur\'s Gate 3 digitális Steam kulcs', 'baldursgate3.jpg', 1, '2026-02-17 08:23:27'),
(38, 'Starfield Steam Key', 'gamekey', 0, 19990.00, 15, 'Starfield digitális Steam kulcs', 'starfield.jpg', 1, '2026-02-17 08:23:27'),
(39, 'Diablo IV BattleNet Key', 'gamekey', 0, 18990.00, 15, 'Diablo IV digitális Battle.net kulcs', 'diablo4.jpg', 1, '2026-02-17 08:23:27'),
(40, 'Overwatch 2 BattleNet Key', 'gamekey', 0, 9990.00, 20, 'Overwatch 2 digitális Battle.net kulcs', 'overwatch2.jpg', 1, '2026-02-17 08:23:27'),
(41, 'Valorant Riot Key', 'gamekey', 0, 7990.00, 25, 'Valorant digitális Riot Games kulcs (példa)', 'valorant.jpg', 1, '2026-02-17 08:23:27'),
(42, 'Call of Duty: Modern Warfare III BattleNet Key', 'gamekey', 0, 21990.00, 15, 'CoD: Modern Warfare III digitális Battle.net kulcs', 'cod_mw3.jpg', 1, '2026-02-17 08:23:27'),
(43, 'Assassin\'s Creed Mirage Ubisoft Key', 'gamekey', 0, 17990.00, 15, 'Assassin\'s Creed Mirage digitális Ubisoft kulcs', 'ac_mirage.jpg', 1, '2026-02-17 08:23:27'),
(44, 'Alan Wake 2 Epic Games Key', 'gamekey', 0, 18990.00, 10, 'Alan Wake 2 digitális Epic Games kulcs', 'alanwake2.jpg', 1, '2026-02-17 08:23:27'),
(45, 'Resident Evil 4 Remake Steam Key', 'gamekey', 0, 16990.00, 15, 'Resident Evil 4 Remake digitális Steam kulcs', 're4_remake.jpg', 1, '2026-02-17 08:23:27'),
(46, 'The Witcher 3 Complete Edition GOG Key', 'gamekey', 0, 9990.00, 20, 'The Witcher 3 Complete Edition digitális GOG kulcs', 'witcher3.jpg', 1, '2026-02-17 08:23:27'),
(47, 'Forza Motorsport Xbox Key', 'gamekey', 0, 19990.00, 10, 'Forza Motorsport digitális Xbox kulcs', 'forza_motorsport.jpg', 1, '2026-02-17 08:23:27'),
(48, 'Gran Turismo 7 PlayStation Key', 'gamekey', 0, 21990.00, 8, 'Gran Turismo 7 digitális PSN kulcs', 'granturismo7.jpg', 1, '2026-02-17 08:23:27'),
(49, 'Marvel\'s Spider-Man 2 PlayStation Key', 'gamekey', 0, 24990.00, 8, 'Marvel\'s Spider-Man 2 digitális PSN kulcs', 'spiderman2.jpg', 1, '2026-02-17 08:23:27'),
(50, 'Helldivers 2 Steam Key', 'gamekey', 0, 14990.00, 15, 'Helldivers 2 digitális Steam kulcs', 'helldivers2.jpg', 1, '2026-02-17 08:23:27'),
(52, 'Steam Wallet 50€', 'giftcard', 0, 20000.00, 20, 'Steam Wallet 50€ digitális ajándékkártya', 'steam_50.jpg', 1, '2026-02-17 08:23:27'),
(53, 'Xbox Gift Card 50€', 'giftcard', 0, 20000.00, 15, 'Xbox Store 50€ digitális ajándékkártya', 'xbox_50.jpg', 1, '2026-02-17 08:23:27'),
(54, 'PlayStation Store Card 50€', 'giftcard', 0, 20000.00, 15, 'PlayStation Store 50€ digitális ajándékkártya', 'psn_50.jpg', 1, '2026-02-17 08:23:27'),
(55, 'Nintendo eShop Card 50€', 'giftcard', 0, 20000.00, 10, 'Nintendo eShop 50€ digitális ajándékkártya', 'nintendo_50.jpg', 1, '2026-02-17 08:23:27'),
(56, 'EA App Gift Card 25€', 'giftcard', 0, 10000.00, 10, 'EA App 25€ digitális ajándékkártya', 'ea_25.jpg', 1, '2026-02-17 08:23:27'),
(57, 'Ubisoft Wallet Card 25€', 'giftcard', 0, 10000.00, 10, 'Ubisoft Wallet 25€ digitális ajándékkártya', 'ubisoft_25.jpg', 1, '2026-02-17 08:23:27'),
(58, 'Battle.net Balance 25€', 'giftcard', 0, 10000.00, 10, 'Battle.net 25€ digitális egyenlegkártya', 'battlenet_25.jpg', 1, '2026-02-17 08:23:27'),
(59, 'Riot Games Gift Card 25€', 'giftcard', 0, 10000.00, 10, 'Riot Games (Valorant, LoL) 25€ ajándékkártya', 'riot_25.jpg', 1, '2026-02-17 08:23:27'),
(60, 'Google Play Gift Card 25€', 'giftcard', 0, 10000.00, 10, 'Google Play 25€ digitális ajándékkártya', 'googleplay_25.jpg', 1, '2026-02-17 08:23:27'),
(61, 'Apple App Store & iTunes Card 25€', 'giftcard', 0, 10000.00, 10, 'Apple App Store & iTunes 25€ ajándékkártya', 'appstore_25.jpg', 1, '2026-02-17 08:23:27'),
(62, 'Netflix Gift Card 25€', 'giftcard', 0, 10000.00, 10, 'Netflix 25€ digitális ajándékkártya', 'netflix_25.jpg', 1, '2026-02-17 08:23:27'),
(63, 'Spotify Premium Gift Card 25€', 'giftcard', 0, 10000.00, 10, 'Spotify Premium 25€ ajándékkártya', 'spotify_25.jpg', 1, '2026-02-17 08:23:27'),
(64, 'Amazon Gift Card 25€', 'giftcard', 0, 10000.00, 10, 'Amazon 25€ digitális ajándékkártya', 'amazon_25.jpg', 1, '2026-02-17 08:23:27'),
(65, 'Discord Nitro Gift Card 25€', 'giftcard', 0, 10000.00, 10, 'Discord Nitro 25€ ajándékkártya', 'discord_25.jpg', 1, '2026-02-17 08:23:27'),
(66, 'Roblox Gift Card 25€', 'giftcard', 0, 10000.00, 10, 'Roblox 25€ digitális ajándékkártya', 'roblox_25.jpg', 1, '2026-02-17 08:23:27'),
(67, 'Minecraft Minecoins Gift Card 25€', 'giftcard', 0, 10000.00, 10, 'Minecraft Minecoins 25€ ajándékkártya', 'minecoins_25.jpg', 1, '2026-02-17 08:23:27'),
(68, 'Xbox Game Pass Ultimate 3 Months', 'giftcard', 0, 18000.00, 10, 'Xbox Game Pass Ultimate 3 hónapos előfizetés', 'xgp_3m.jpg', 1, '2026-02-17 08:23:27'),
(69, 'PlayStation Plus Extra 3 Months', 'giftcard', 0, 18000.00, 10, 'PlayStation Plus Extra 3 hónapos előfizetés', 'psplus_extra_3m.jpg', 1, '2026-02-17 08:23:27'),
(70, 'Nintendo Switch Online 12 Months', 'giftcard', 0, 15000.00, 10, 'Nintendo Switch Online 12 hónapos előfizetés', 'nso_12m.jpg', 1, '2026-02-17 08:23:27'),
(71, 'EA Play 12 Months', 'giftcard', 0, 15000.00, 10, 'EA Play 12 hónapos előfizetés', 'eaplay_12m.jpg', 1, '2026-02-17 08:23:27'),
(72, 'Ubisoft+ 12 Months', 'giftcard', 0, 18000.00, 10, 'Ubisoft+ 12 hónapos előfizetés', 'ubisoftplus_12m.jpg', 1, '2026-02-17 08:23:27'),
(73, 'Battle.net Gift Card 50€', 'giftcard', 0, 20000.00, 10, 'Battle.net 50€ digitális ajándékkártya', 'battlenet_50.jpg', 1, '2026-02-17 08:23:27'),
(74, 'Riot Games Gift Card 50€', 'giftcard', 0, 20000.00, 10, 'Riot Games 50€ digitális ajándékkártya', 'riot_50.jpg', 1, '2026-02-17 08:23:27'),
(75, 'Steam Wallet 100€', 'giftcard', 0, 38000.00, 5, 'Steam Wallet 100€ digitális ajándékkártya', 'steam_100.jpg', 1, '2026-02-17 08:23:27');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`user_id`, `username`, `email`, `password`, `created_at`) VALUES
(1, 'Teszt', 'test@gmail.com', 'tesztfelhasznalo1', '2026-02-11 09:07:15'),
(3, 'asdasd1', 'asdasd12@gmail.com', '$2b$10$p6BTVfRuZofADjU972fEBeD8RyKPW0J6NyZ27DcLzFMjz85g6WF5e', '2026-02-15 18:48:04');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `cart_items`
--
ALTER TABLE `cart_items`
  ADD PRIMARY KEY (`cart_item_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `session_id` (`session_id`);

--
-- A tábla indexei `gamekeys`
--
ALTER TABLE `gamekeys`
  ADD PRIMARY KEY (`key_id`),
  ADD UNIQUE KEY `code` (`code`),
  ADD KEY `product_id` (`product_id`);

--
-- A tábla indexei `giftcards`
--
ALTER TABLE `giftcards`
  ADD PRIMARY KEY (`card_id`),
  ADD UNIQUE KEY `code` (`code`),
  ADD KEY `product_id` (`product_id`);

--
-- A tábla indexei `orderdetails`
--
ALTER TABLE `orderdetails`
  ADD PRIMARY KEY (`detail_id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- A tábla indexei `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `user_id` (`user_id`);

--
-- A tábla indexei `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`);

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `cart_items`
--
ALTER TABLE `cart_items`
  MODIFY `cart_item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT a táblához `gamekeys`
--
ALTER TABLE `gamekeys`
  MODIFY `key_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT a táblához `giftcards`
--
ALTER TABLE `giftcards`
  MODIFY `card_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT a táblához `orderdetails`
--
ALTER TABLE `orderdetails`
  MODIFY `detail_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT a táblához `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT a táblához `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `cart_items`
--
ALTER TABLE `cart_items`
  ADD CONSTRAINT `cart_items_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `cart_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE;

--
-- Megkötések a táblához `gamekeys`
--
ALTER TABLE `gamekeys`
  ADD CONSTRAINT `gamekeys_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE;

--
-- Megkötések a táblához `giftcards`
--
ALTER TABLE `giftcards`
  ADD CONSTRAINT `giftcards_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE;

--
-- Megkötések a táblához `orderdetails`
--
ALTER TABLE `orderdetails`
  ADD CONSTRAINT `orderdetails_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `orderdetails_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);

--
-- Megkötések a táblához `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
