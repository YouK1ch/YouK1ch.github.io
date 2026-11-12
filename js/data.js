// Дані портфоліо. Щоб додати новий запис — просто допишіть об'єкт у потрібний масив.
const HTB_ID = "1960165";
const ach = (type, id) => `https://labs.hackthebox.com/achievement/${type}/${HTB_ID}/${id}`;

const PROFILE = {
  name: "Денис Олександрович Столик",
  nick: "Yuk1ch",
  about:
    "Курсант Харківського національного університету внутрішніх справ, спеціальність 125 «Кібербезпека та захист інформації».",
  htbId: "HTB-F75CC57204",
  links: {
    htb: "https://profile.hackthebox.com/profile/019cb312-28de-7048-a432-f3f495b8b1a6",
    htbLabs: "https://app.hackthebox.com/users/1960165",
    thm: "https://tryhackme.com/p/Yuk1ch",
    pico: "https://learn.cylabacademy.org/users/Yuk1ch",
    cryptohack: "https://cryptohack.org/user/youk1ch/",
  },
  // thmRooms — завершені кімнати на профілі TryHackMe (перевірено 13.11.2026)
  stats: { machines: 14, sherlocks: 21, challenges: 10, level: 57, rank: "Professional", thmRooms: 72 },
};

const LAB_MACHINES = [
  { name: "Eighteen", img: "img/htb-eighteen.jpg", url: ach("machine", 805) },
  { name: "Guardian", img: "img/htb-guardian.jpg", url: ach("machine", 703) },
  { name: "Facts", img: "img/htb-facts.jpg", url: ach("machine", 829) },
  { name: "MonitorsFour", img: "img/htb-monitorsfour.jpg", url: ach("machine", 814) },
];

const SEM5_CRYPTO = [
  { name: "Cryptography Basics", img: "img/thm-crypto-basics.jpg", desc: "Основи криптографії та симетричного шифрування." },
  { name: "Encryption - Crypto 101", img: "img/thm-encryption-101.jpg", desc: "Вступ до шифрування, частина серії про криптографію." },
  { name: "Introduction to CryptOps", img: "img/thm-cryptops.jpg", desc: "Стратегії керування ключами для DevSecOps." },
  { name: "CyberChef: The Basics", img: "img/thm-cyberchef-basics.jpg", desc: "Знайомство з CyberChef — «швейцарським ножем» фахівця з кібербезпеки." },
].map((r) => ({ ...r, url: "https://tryhackme.com/p/Yuk1ch", tag: "TryHackMe" }));

const CISCO_IMG = ["cisco-network-support-security", "cisco-network-addressing", "cisco-network-devices", "cisco-networking-basics", "cisco-os-basics", "cisco-hardware-basics", "cisco-packet-tracer-start", "cisco-exploring-networking-pt", "cisco-intro-iot", "cisco-exploring-iot-pt", "cisco-intro-cybersecurity", "cisco-ethical-hacker", "cisco-network-defense", "cisco-cyber-threat-management", "cisco-endpoint-security"];

const SEM5_CYBER = {
  htbBadges: [
    { name: "Linux Fundamentals", img: "assets/badges/htb-linux-fundamentals.png", url: "https://academy.hackthebox.com/achievement/badge/5bc39f66-9c22-11ef-864f-bea50ffe6cb4" },
    { name: "Windows Fundamentals", img: "assets/badges/htb-windows-fundamentals.png", url: "https://academy.hackthebox.com/achievement/badge/884aa69a-9c18-11ef-864f-bea50ffe6cb4" },
    { name: "Setting Up", img: "assets/badges/htb-setting-up.png", url: "https://academy.hackthebox.com/achievement/badge/bdec4baa-c4c1-11f0-9254-bea50ffe6cb4" },
    { name: "MacOS Fundamentals", img: "assets/badges/htb-macos-fundamentals.png", url: "https://academy.hackthebox.com/achievement/badge/650e9aba-c4c4-11f0-9254-bea50ffe6cb4" },
  ],
  cisco: [
    ["Network Support and Security", "https://www.credly.com/badges/23e8738b-b3fd-43a6-b996-48932438dd95"],
    ["Network Addressing and Basic Troubleshooting", "https://www.credly.com/badges/be7a8755-7df8-44b1-ad8a-c8bea3a5deee"],
    ["Мережні пристрої та початкове налаштування", "https://www.credly.com/badges/3d92036a-1f1a-4412-868a-ba4b9478458f"],
    ["Networking Basics", "https://www.credly.com/badges/a5c2ce7b-468c-4a3d-a30c-1011c6c1604d"],
    ["Operating Systems Basics", "https://www.credly.com/badges/d69051cd-0601-4fd6-a8be-10840c53b764"],
    ["Computer Hardware Basics", "https://www.credly.com/badges/7ea9f7e8-725f-4662-a837-f5469470cdd2"],
    ["Початок роботи з Cisco Packet Tracer", "https://www.netacad.com/certificates/?issuanceId=48242b5f-4d73-47ae-aca8-a47766c8c038"],
    ["Exploring Networking with Cisco Packet Tracer", "https://www.netacad.com/certificates/?issuanceId=36e096eb-eeb3-4607-8039-16031fdc264d"],
    ["Вступ до IoT та цифрової трансформації", "https://www.credly.com/badges/d042bc3f-88dd-4a16-a6da-b8e9f51b55ab"],
    ["Exploring IoT with Cisco Packet Tracer", "https://www.netacad.com/certificates/?issuanceId=8d3528c5-7bc5-4245-af8f-ea6635fd79b5"],
    ["Вступ до кібербезпеки", "https://www.credly.com/badges/b4423d42-7133-4450-add3-7c64eddc829b"],
    ["Ethical Hacker", "https://www.credly.com/badges/bbf74f7a-bad1-45ae-9fa9-c2fbefb641fc"],
    ["Захист мережі", "https://www.credly.com/badges/9389ea2b-79ce-46a9-b901-71cc70ec2a7e"],
    ["Cyber Threat Management", "https://www.credly.com/badges/6b18151b-b4fe-4a35-bf53-94717f3826e2"],
    ["Endpoint Security", "https://www.credly.com/badges/3cb25c37-1925-42ec-a47d-a95f21abe253"],
  ].map(([name, url], i) => ({ name, url, img: `assets/badges/${CISCO_IMG[i]}.png` })),
  thm: [
    ["Passive Reconnaissance", "thm-passive-recon"],
    ["DNS in Detail", "thm-dns-in-detail"],
    ["Active Reconnaissance", "thm-active-recon"],
  ].map(([name, img]) => ({ name, img: `img/${img}.jpg`, url: "https://tryhackme.com/room/activerecon" })),
  machines: [
    { name: "CodePartTwo", img: "img/htb-codeparttwo.jpg", url: ach("machine", 692) },
    { name: "Conversor", img: "img/htb-conversor.jpg", url: ach("machine", 787) },
    { name: "Expressway", img: "img/htb-expressway.jpg", url: ach("machine", 736) },
    { name: "Editor", img: "img/htb-editor.jpg", url: ach("machine", 684) },
  ],
  challenges: [
    { name: "Execute", img: "img/htb-ch-execute.jpg", url: ach("challenge", 640) },
    { name: "Restaurant", img: "img/htb-ch-restaurant.jpg", url: ach("challenge", 200) },
    { name: "CubeMadness1", img: "img/htb-ch-cubemadness1.jpg", url: ach("challenge", 302) },
    { name: "You know 0xDiablos", img: "img/htb-ch-0xdiablos.jpg", url: ach("challenge", 106) },
    { name: "r0bob1rd", img: "img/htb-ch-r0bob1rd.jpg", url: ach("challenge", 837) },
  ],
};

const HTB6_IMG = ["htb-metasploit", "htb-incident-reporting", "htb-file-inclusion", "htb-intro-ad", "htb-file-transfers", "htb-intro-web-apps", "htb-sqli-fundamentals", "htb-network-traffic-analysis", "htb-intro-networking", "htb-vulnerability-assessment", "htb-web-requests", "htb-hardware-attacks"];

const SEM6_CYBER = {
  htbBadges: [
    ["Using the Metasploit Framework", 39],
    ["Security Incident Reporting", 238],
    ["File Inclusion", 23],
    ["Introduction to Active Directory", 74],
    ["File Transfers", 24],
    ["Introduction to Web Applications", 75],
    ["SQL Injection Fundamentals", 33],
    ["Intro to Network Traffic Analysis", 81],
    ["Introduction to Networking", 34],
    ["Vulnerability Assessment", 108],
    ["Web Requests", 35],
    ["Brief Intro to Hardware Attacks", 230],
  ].map(([name, id], i) => ({ name, url: `https://academy.hackthebox.com/achievement/1315125/${id}`, img: `assets/badges/${HTB6_IMG[i]}.jpg` })),
  challenges: [
    { name: "CubeMadness2", img: "img/htb-ch-cubemadness2.jpg", url: ach("challenge", 305) },
    { name: "Nostalgia", img: "img/htb-ch-nostalgia.jpg", url: ach("challenge", 122) },
    { name: "NoMap3D", img: "img/htb-ch-nomap3d.jpg", url: ach("challenge", 397) },
    { name: "LightningFast", img: "img/htb-ch-lightningfast.jpg", url: ach("challenge", 315) },
    { name: "Not Posixtive", img: "img/htb-ch-notposixtive.jpg", url: ach("challenge", 952) },
  ],
  machines: [
    { name: "Garfield", img: "img/htb-garfield.jpg", url: ach("machine", 862) },
    { name: "WingData", img: "img/htb-wingdata.jpg", url: ach("machine", 835) },
    { name: "Kobold", img: "img/htb-kobold.jpg", url: ach("machine", 856) },
    { name: "CCTV", img: "img/htb-cctv.jpg", url: ach("machine", 847) },
  ],
};

const thmShare = (slug) =>
  `https://tryhackme.com/room/${slug}`;
const SEM6_CRYPTO = {
  thm: [
    { name: "Breaking RSA", img: "img/thm-breaking-rsa.jpg", url: thmShare("breakrsa") },
    { name: "Cicada-3301 Vol:1", img: "img/thm-cicada3301.jpg", url: thmShare("cicada3301vol1") },
    { name: "Cryptography Concepts", img: "img/thm-crypto-concepts.jpg", url: thmShare("cryptographyconcepts") },
    { name: "Cryptography for Dummies", img: "img/thm-crypto-dummies.jpg", url: thmShare("cryptographyfordummies") },
    { name: "Breaking Crypto the Simple Way", img: "img/thm-breaking-crypto-simple.jpg", url: thmShare("breakingcryptothesimpleway") },
  ],
  pico: [{ name: "Passwords - A Cracking Christmas", img: "img/thm-passwords-christmas.jpg", url: thmShare("attacks-on-ecrypted-files-aoc2025-asdfghj123") }],
};

const TABLE_ID = "1H9N84_Aml4BzquQw9qp2OpZPN7rI9r4AeqHeo7d-sEM";
const TABLE_URL = `https://docs.google.com/spreadsheets/d/${TABLE_ID}/edit`;
const TABLE_EMBED = `https://docs.google.com/spreadsheets/d/${TABLE_ID}/preview`;

// ── Цифрова криміналістика: усі виконані HTB Sherlocks (21 / 21) ──
// id — ID Sherlock на HTB (кнопка Share → labs.hackthebox.com/achievement/sherlock/<user>/<id>)
// diff: Very Easy | Easy | Medium | Hard | Insane
const SHERLOCKS = [
  { name: "Baggage", id: 1359, diff: "Very Easy", cat: "DFIR", released: "2026-08-13", tasks: 10,
    desc: "Аналіз артефактів Shellbags: доступ користувача до папок, мережевих ресурсів і вмісту архівів для виявлення підготовки та ексфільтрації даних.",
    tags: ["Shellbags", "Windows Registry", "Exfiltration"] },
  { name: "PhantomRing", id: 1296, diff: "Very Easy", cat: "Malware Analysis", released: "2026-07-09", tasks: 12,
    desc: "Підозрілий бінарний файл у /var/tmp на Linux-сервері, що намагався встановити вихідні з'єднання. Статичний і динамічний аналіз зразка.",
    tags: ["Linux", "ELF", "C2"] },
  { name: "Phantom", id: 1332, diff: "Easy", cat: "DFIR", released: "2026-08-06", tasks: 14,
    desc: "Linux-сервер з аномальними вихідними з'єднаннями та дивною поведінкою стандартних діагностичних утиліт — пошук механізму приховування.",
    tags: ["Linux", "Rootkit", "Persistence"] },
  { name: "TaskForce", id: 1311, diff: "Easy", cat: "Threat Hunting", released: "2026-07-16", tasks: 6,
    desc: "Полювання на загрози у щойно розгорнутому SIEM в інфраструктурі з поганою гігієною безпеки та неповним журналюванням.",
    tags: ["SIEM", "Threat Hunting", "Logs"] },
  { name: "KitsuneHook", id: 1260, diff: "Easy", cat: "Threat Intelligence", released: "2026-06-11", tasks: 15,
    desc: "Розвідка загроз щодо угруповання Winnti, яке атакує виробничі та енергетичні компанії: TTP, інструменти, індикатори.",
    tags: ["CTI", "APT41 / Winnti", "MITRE ATT&CK"] },
  { name: "CAMouflage", id: 1239, diff: "Easy", cat: "DFIR", released: "2026-05-28", tasks: 10,
    desc: "Тріаж ноутбука користувача, ураженого кампанією, що поширюється через зламані (cracked) застосунки.",
    tags: ["Windows", "Triage", "Infostealer"] },
  { name: "Fruitzy", id: 1212, diff: "Easy", cat: "DFIR", released: "2026-04-30", tasks: 11,
    desc: "Розслідування інциденту в стартапі: молодший QA-аналітик випадково завантажив шкідливе ПЗ на робочу машину.",
    tags: ["Endpoint", "Malware", "Timeline"] },
  { name: "KeyDis", id: 1797, diff: "Medium", cat: "Malware Analysis", released: "2026-10-08", tasks: 19,
    desc: "Аналіз «легітимного» застосунку, після запуску якого блимнуло вікно cmd, а SOC зафіксував аномальний вихідний трафік.",
    tags: ["Reverse Engineering", "Loader", "C2"] },
  { name: "SaSync", id: 1692, diff: "Medium", cat: "DFIR", released: "2026-09-24", tasks: 17,
    desc: "Реагування на компрометацію Active Directory ShanoCorp через занедбаний дочірній домен.",
    tags: ["Active Directory", "Event Logs", "Lateral Movement"] },
  { name: "Yggdrasil", id: 1581, diff: "Medium", cat: "DFIR", released: "2026-09-10", tasks: 15,
    desc: "Несанкціоноване вихідне з'єднання на Ubuntu-машині команди розробників — ізоляція та тріаж хоста.",
    tags: ["Linux", "Ubuntu", "Supply Chain"] },
  { name: "WhaleSecret", id: 1326, diff: "Medium", cat: "DFIR", released: "2026-07-23", tasks: 9,
    desc: "Розслідування зламу внутрішнього вебзастосунку, що працював у Docker, за тріаж-даними хоста.",
    tags: ["Docker", "Web", "Containers"] },
  { name: "Opportunist", id: 1287, diff: "Medium", cat: "DFIR", released: "2026-07-02", tasks: 15,
    desc: "DevOps-інженер став жертвою фальшивого рекрутера. Аналіз робочої станції після атаки соціальної інженерії.",
    tags: ["Social Engineering", "Fake Recruiter", "Endpoint"] },
  { name: "Kraken", id: 1242, diff: "Medium", cat: "DFIR", released: "2026-06-04", tasks: 12,
    desc: "Новий варіант RAT, виявлений на ранній стадії до повного встановлення C2-зв'язку.",
    tags: ["RAT", "Memory", "C2"] },
  { name: "Arcadia'sCompromise", id: 1848, diff: "Hard", cat: "DFIR", released: "2026-10-15", tasks: 18,
    desc: "Підозріла активність внутрішнього хоста та аномальні входи через RDP у середовищі віддаленого адміністрування.",
    tags: ["RDP", "Windows", "Event Logs"] },
  { name: "PhantomBundle", id: 1746, diff: "Hard", cat: "DFIR", released: "2026-10-01", tasks: 15,
    desc: "Цільова фішингова кампанія проти клієнтів банку через соцмережі; шкідливе ПЗ з C2-каналом.",
    tags: ["Phishing", "Mobile", "C2"] },
  { name: "VelvetThrone", id: 1362, diff: "Hard", cat: "DFIR", released: "2026-08-20", tasks: 15,
    desc: "Масштабний злам інвестиційної компанії: аномальна активність на кількох системах, відновлення ланцюга атаки.",
    tags: ["Enterprise", "Multi-host", "Kill Chain"] },
  { name: "Oldie", id: 1329, diff: "Hard", cat: "DFIR", released: "2026-07-30", tasks: 12,
    desc: "Атака програми-вимагача на Linux-сервер клієнта через вразливий застосунок.",
    tags: ["Ransomware", "Linux", "Web App"] },
  { name: "CorpDown-2", id: 1278, diff: "Hard", cat: "DFIR", released: "2026-06-25", tasks: null,
    desc: "Злам робочої станції після повернення працівника з відпустки; частину слідів знищено передчасним відновленням.",
    tags: ["Windows", "Anti-forensics", "Recovery"] },
  { name: "ShadowMonarch", id: 1269, diff: "Hard", cat: "Malware Analysis", released: "2026-06-18", tasks: 15,
    desc: "Підозріла мережева активність на сервері телеком-провайдера, яку не помітив корпоративний EDR.",
    tags: ["APT", "Telecom", "EDR Evasion"] },
  { name: "Kawmikaze", id: 1476, diff: "Insane", cat: "Malware Analysis", released: "2026-08-27", tasks: 14,
    desc: "Реверс підозрілого бінарника, знайденого на додаткових уражених хостах після інциденту в ShanoCorp.",
    tags: ["Reverse Engineering", "Windows", "Malware"] },
  { name: "Stonks", id: 1230, diff: "Insane", cat: "DFIR", released: "2026-05-14", tasks: 15,
    desc: "Цифрове розслідування фінансового шахрайства девелоперської корпорації: завищені доходи та прихований борг.",
    tags: ["Fraud", "Document Forensics", "Investigation"] },
].map((s) => ({
  ...s,
  url: ach("sherlock", s.id),
  img: `img/sh-${s.name.toLowerCase().replace(/'/g, "")}.jpg`,                                            // публічне посилання на досягнення
  page: `https://app.hackthebox.com/sherlocks/${encodeURIComponent(s.name)}`, // сторінка Sherlock на HTB
}));

// ── Про мене (з резюме) ──
const ABOUT = {
  photo: "assets/photo.jpg",
  resume: "assets/stolyk-denys-resume.pdf",
  email: "deni.s201811111111@gmail.com",
  education: "Курсант Харківського національного університету внутрішніх справ, навчальна група ННІ4-23-402, спеціальність 125 «Кібербезпека та захист інформації».",
  interests:
    "Кібербезпека та захист інформації, OSINT-розвідка й кіберрозвідка, мережева безпека, цифрова криміналістика, автоматизація збору й обробки даних, програмування на Python за допомогою AI, аналітична діяльність.",
  practice:
    "Дослідження відкритих інформаційних ресурсів, робота з OSINT-інструментами, збір, перевірка, систематизація й аналіз інформації, підготовка аналітичних матеріалів і структурованих висновків, розробка Python-скриптів для автоматизації рутинних завдань. Участь в інформаційно-просвітницьких проєктах, спрямованих на протидію онлайн-шахрайству та підвищення кіберобізнаності населення.",
  activity: [
    { title: "OSINT квест-конкурс «Пошук скарбів у морі інформації – онлайн-детектив»",
      text: "Методи розвідки з відкритих джерел.", top: true },
    { title: "Практична аналітика в кіберсфері",
      text: "Учасник навчально-тренувального центру пошукової та аналітичної роботи в кіберпросторі та проєкту «Медіа-КБ», спрямованого на пошук, обробку й аналіз інформації." },
    { title: "Подяка від ВПК у Чернівецькій області",
      text: "За сумлінне виконання службових обов'язків, ініціативу та наполегливість.",
      url: "https://univd.edu.ua/uk/news/20595" },
    { title: "Квест-конкурси «Пошук скарбів у морі інформації – онлайн-детектив»",
      text: "Регулярна участь у змаганнях з OSINT." },
  ],
  certification: [
    "Prometheus",
    "Міжнародні конференції",
    "EC-Council",
    "Cisco Networking Academy",
    "Cyber 5W — 8 курсів з цифрової криміналістики",
    "OpenLearn, The Open University — Digital forensics",
    "EUAM «Training of Trainers Course on OSINT and Criminal Investigation»",
  ],
};

// ── Навички (з резюме) ──
const SKILLS_CORE = [
  { name: "OSINT-розвідка", note: "1 місце в OSINT квест-конкурсі, курс EUAM з OSINT і кримінальних розслідувань" },
  { name: "Збір даних з відкритих джерел", note: "Соцмережі, відкриті реєстри, вебресурси" },
  { name: "Аналіз та верифікація даних", note: "Перевірка, систематизація та зіставлення інформації" },
  { name: "Підготовка аналітичних звітів", note: "Структуровані висновки за результатами розслідувань" },
  { name: "Цифрова криміналістика", note: "21 розслідування на Hack The Box Sherlocks, 9 сертифікатів Cyber 5W та OpenLearn" },
  { name: "Python і програмування з AI", note: "Скрипти для автоматизації рутинних завдань, Telegram-боти" },
  { name: "Мережева безпека", note: "Cisco Networking Academy: мережі, захист мережі, Endpoint Security" },
  { name: "Тестування на проникнення", note: "Машини та челенджі Hack The Box, модулі HTB Academy" },
];

// ── Цифрова криміналістика: сертифікати ──
const CERTS = [
  { title: "Digital forensics", issuer: "OpenLearn, The Open University", date: "2026-11-11", code: "M812_1",
    file: "assets/certs/openlearn-digital-forensics.pdf", thumb: "assets/certs/openlearn-digital-forensics.jpg",
    course: "https://www.open.edu/openlearn/science-maths-technology/digital-forensics/content-section-0",
    desc: "Вступ до комп'ютерної криміналістики: як правильно збирати, аналізувати й подавати цифрові докази для бізнесу та суду, роль криміналіста в правовому процесі." },
  { title: "C5W-100 Introduction to Digital Forensics", issuer: "Cyber 5W", date: "2026-11-10", code: "twmefhhgvy",
    file: "assets/certs/c5w-100-intro-digital-forensics.pdf", thumb: "assets/certs/c5w-100-intro-digital-forensics.jpg",
    desc: "Базовий курс з цифрової криміналістики: процес розслідування, джерела доказів і практичні навички." },
  { title: "Investigating Windows Scheduled Tasks", issuer: "Cyber 5W", date: "2026-11-10", code: "iyzl91jvj9",
    file: "assets/certs/c5w-windows-scheduled-tasks.pdf", thumb: "assets/certs/c5w-windows-scheduled-tasks.jpg",
    desc: "Розслідування запланованих завдань Windows — типового механізму закріплення зловмисника в системі." },
  { title: "Investigating Windows Recycle Bin", issuer: "Cyber 5W", date: "2026-11-10", code: "zhrxdo2xrq",
    file: "assets/certs/c5w-windows-recycle-bin.pdf", thumb: "assets/certs/c5w-windows-recycle-bin.jpg",
    desc: "Аналіз артефактів Кошика Windows: що видалено, коли і ким." },
  { title: "Time Zone Conversions", issuer: "Cyber 5W", date: "2026-11-10", code: "6v9hdv2y3f",
    file: "assets/certs/c5w-time-zone-conversions.pdf", thumb: "assets/certs/c5w-time-zone-conversions.jpg",
    desc: "Робота з часовими поясами та мітками часу для коректної побудови хронології подій." },
  { title: "Working with Virtual Hard Disk", issuer: "Cyber 5W", date: "2026-11-10", code: "6wqv01p9p5",
    file: "assets/certs/c5w-virtual-hard-disk.pdf", thumb: "assets/certs/c5w-virtual-hard-disk.jpg",
    desc: "Монтування та дослідження образів віртуальних дисків як джерела доказів." },
  { title: "Intro to Linux from a Forensics Perspective — Ubuntu", issuer: "Cyber 5W", date: "2026-11-10", code: "cavhjky2gh",
    file: "assets/certs/c5w-linux-forensics-ubuntu.pdf", thumb: "assets/certs/c5w-linux-forensics-ubuntu.jpg",
    desc: "Основи Linux з погляду криміналіста на прикладі Ubuntu." },
  { title: "Intro to Linux from a Forensics Perspective — Tsurugi", issuer: "Cyber 5W", date: "2026-11-10", code: "jdcd9mo2ut",
    file: "assets/certs/c5w-linux-forensics-tsurugi.pdf", thumb: "assets/certs/c5w-linux-forensics-tsurugi.jpg",
    desc: "Робота в спеціалізованому криміналістичному дистрибутиві Tsurugi Linux." },
  { title: "Linux Forensics Distributions", issuer: "Cyber 5W", date: "2026-11-10", code: "v5zrz8tekz",
    file: "assets/certs/c5w-linux-forensics-distributions.pdf", thumb: "assets/certs/c5w-linux-forensics-distributions.jpg",
    desc: "Огляд дистрибутивів Linux для цифрової криміналістики та їхніх інструментів." },
];
