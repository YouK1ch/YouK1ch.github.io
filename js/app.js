(() => {
  const $app = document.getElementById("app");
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const ext = 'target="_blank" rel="noopener noreferrer"';
  const extIcon = `<svg class="ext" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M6 3H3v10h10v-3M9 3h4v4M13 3 7 9"/></svg>`;

  const TITLES = {
    home: "Головна сторінка",
    about: "Про мене",
    skills: "Навички та інструменти",
    "sem7-cyber": "Кібербезпека, 7 семестр",
    forensics: "Шерлоки",
    certs: "Сертифікати",
    "sem5-cyber": "Кібербезпека, 5 семестр",
    "sem6-cyber": "Кібербезпека, 6 семестр",
    "sem5-crypto": "Криптологія, 5 семестр",
    "sem6-crypto": "Криптологія, 6 семестр",
    table: "Таблиця",
  };

  /* ── Будівельні блоки ── */
  const rows = (items, kind) => `
    <ul class="rows">${items.map((i) => `
      <li><a href="${esc(i.url)}" ${ext}>
        <span class="n">${esc(i.name)}${i.desc ? `<span class="d">${esc(i.desc)}</span>` : ""}</span>
        ${kind ? `<span class="k">${esc(kind)}</span>` : ""}${extIcon}
      </a></li>`).join("")}
    </ul>`;
  const gallery = (items, kind) => `
    <div class="badges ${items.every((i) => i.img.startsWith("img/")) ? "dark" : /\.jpg$/.test(items[0].img) ? "wide" : ""}">${items.map((i, k) => `
      <a class="badge" href="${esc(i.url)}" ${ext} style="--i:${k}">
        <span class="badge-img"><img src="${esc(i.img)}" alt="" loading="lazy" /></span>
        <span class="badge-name">${esc(i.name)}</span>
        <span class="badge-kind">${esc(kind)} ${extIcon}</span>
      </a>`).join("")}
    </div>`;
  const section = (title, items, kind, note) =>
    `<h2 class="section-title">${esc(title)}</h2>
     <p class="section-note">${note || `${items.length} ${plural(items.length, "запис", "записи", "записів")}`}</p>
     ${items.every((i) => i.img) ? gallery(items, kind) : rows(items, kind)}`;
  const head = (title, lede) =>
    `<h1 class="page-title">${esc(title)}</h1>${lede ? `<p class="lede">${lede}</p>` : ""}`;
  // Відбиток пальця: концентричні дуги з розривами (детерміновано)
  function fingerprint() {
    let seed = 7;
    const rnd = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
    const cx = 120, cy = 140;
    let paths = "";
    for (let i = 0; i < 15; i++) {
      const rx = 14 + i * 7.2, ry = 20 + i * 8.6;
      let a0 = -200 + rnd() * 30;
      const end = 20 - rnd() * 30;
      while (a0 < end) {
        const len = 30 + rnd() * 70;
        const a1 = Math.min(a0 + len, end);
        const p = (d) => [cx + rx * Math.cos((d * Math.PI) / 180), cy + ry * Math.sin((d * Math.PI) / 180)].map((v) => v.toFixed(1)).join(" ");
        paths += `<path d="M${p(a0)} A${rx} ${ry} 0 0 1 ${p(a1)}" style="--d:${(i * 0.06).toFixed(2)}s"/>`;
        a0 = a1 + 8 + rnd() * 14;
      }
    }
    return `<svg class="print" viewBox="0 0 240 300" aria-hidden="true">${paths}</svg>`;
  }

  const CAT_ICON = {
    "DFIR": '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 5 5"/>',
    "Malware Analysis": '<rect x="7" y="8" width="10" height="12" rx="5"/><path d="M12 8V5m-3 0 1.5 2M15 5l-1.5 2M7 12H3m18 0h-4M7 17l-3 2m17-2-3 2M7 9 4 7m16 0-3 2"/>',
    "Threat Hunting": '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M12 2v4m0 12v4M2 12h4m12 0h4"/>',
    "Threat Intelligence": '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><path d="M12 12 18.5 5.5"/><circle cx="12" cy="12" r="1" fill="currentColor"/>',
  };
  const catIcon = (c) => `<svg class="cat-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${CAT_ICON[c] || CAT_ICON.DFIR}</svg>`;

  const DF = "Цифрова криміналістика";
  const fmtDate = (d) => new Date(d).toLocaleDateString("uk-UA", { day: "numeric", month: "long", year: "numeric" });
  const LB = { certs: () => CERTS, sem7: () => SEM7_CYBER.certs };
  const certCard = (c, set, i) => `
          <article class="cert">
            <button type="button" class="cert-img" data-lightbox="${set}:${i}" aria-label="Переглянути сертифікат «${esc(c.title)}»">
              <img src="${c.thumb}" alt="" loading="lazy" />
              <span class="zoom" aria-hidden="true">Переглянути</span>
            </button>
            <div class="cert-body">
              <h3>${esc(c.title)}</h3>
              <p>${esc(c.desc)}</p>
              <dl>
                <dt>Видано</dt><dd>${fmtDate(c.date)}</dd>
                ${c.hours ? `<dt>Тривалість</dt><dd>${c.hours} ${plural(c.hours, "година", "години", "годин")}</dd>` : ""}
                ${c.code ? `<dt>${c.issuer.startsWith("OpenLearn") ? "Код курсу" : c.issuer.startsWith("Cyber 5W") ? "ID сертифіката" : "Номер сертифіката"}</dt><dd class="mono">${esc(c.code)}</dd>` : ""}
              </dl>
              <div class="cert-links">
                <a href="${c.file}" ${ext}>${/\.pdf$/.test(c.file) ? "Відкрити PDF" : "Відкрити зображення"} ${extIcon}</a>
                ${c.course ? `<a href="${esc(c.course)}" ${ext}>Сторінка курсу ${extIcon}</a>` : ""}
              </div>
            </div>
          </article>`;
  const subtabs = (cur) => `
    <nav class="subtabs" aria-label="${DF}">
      <a href="#forensics" ${cur === "forensics" ? 'aria-current="page"' : ""}>Шерлоки <span>${SHERLOCKS.length}</span></a>
      <a href="#certs" ${cur === "certs" ? 'aria-current="page"' : ""}>Сертифікати <span>${CERTS.length}</span></a>
    </nav>`;
  function plural(n, one, few, many) {
    const m10 = n % 10, m100 = n % 100;
    if (m10 === 1 && m100 !== 11) return one;
    if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return few;
    return many;
  }

  /* ── Сторінки ── */
  const pages = {
    home() {
      const p = PROFILE, s = p.stats;
      return `
      <section class="hero">
        <div class="hero-text">
          <p class="hero-role">Курсант Харківського національного університету внутрішніх справ, спеціальність 125 «Кібербезпека та захист інформації»</p>
          <h1>${esc(p.name)}</h1>
          <span class="hero-id">${esc(p.htbId)}</span>
          <div class="actions">
            <a class="btn primary" href="#forensics">Переглянути розслідування</a>
            <a class="btn" href="${p.links.htb}" ${ext}>Профіль Hack The Box</a>
            <a class="btn" href="#about">Про мене та контакти</a>
          </div>
        </div>
        <div class="hero-art" aria-hidden="true">${fingerprint()}</div>
      </section>

      <div class="tally" aria-label="Статистика Hack The Box">
        <div><b data-count="${s.sherlocks}">${s.sherlocks}</b><span>Sherlocks розслідувано</span></div>
        <div><b data-count="${s.machines}">${s.machines}</b><span>машин зламано</span></div>
        <div><b data-count="${s.challenges}">${s.challenges}</b><span>челенджів розв'язано</span></div>
        <div><b data-count="${s.level}">${s.level}</b><span>рівень HTB, ${esc(s.rank)}</span></div>
      </div>

      <h2 class="section-title">Розділи портфоліо</h2>
      <p class="section-note">Досягнення згруповані за семестрами та напрямами.</p>
      <div class="dirs">
        <a class="dir feature" href="#forensics"><strong>Цифрова криміналістика</strong><span>${SHERLOCKS.length} розв'язаних Sherlocks і ${CERTS.length} сертифікатів</span></a>
        <a class="dir" href="#skills"><strong>Навички та інструменти</strong><span>OSINT, криміналістика, мережі та платформи, де це підтверджено</span></a>
        <a class="dir" href="#about"><strong>Про мене</strong><span>Освіта, відзнаки, контакти та резюме в PDF</span></a>
        <a class="dir" href="#sem7-cyber"><strong>Кібербезпека, 7 семестр</strong><span>${SEM7_CYBER.certs.length} сертифікатів, машини HTB для лабораторних, профілі TryHackMe і picoCTF</span></a>
        <a class="dir" href="#sem5-cyber"><strong>Кібербезпека, 5 семестр</strong><span>HTB Academy, Cisco, TryHackMe, машини та челенджі</span></a>
        <a class="dir" href="#sem6-cyber"><strong>Кібербезпека, 6 семестр</strong><span>Модулі HTB Academy, челенджі та машини</span></a>
        <a class="dir" href="#sem5-crypto"><strong>Криптологія, 5 семестр</strong><span>Кімнати TryHackMe з криптографії</span></a>
        <a class="dir" href="#sem6-crypto"><strong>Криптологія, 6 семестр</strong><span>TryHackMe, PicoCTF та CryptoHack</span></a>
      </div>

      <h2 class="section-title">Профілі на платформах</h2>
      <p class="section-note">Нікнейм Yuk1ch.</p>
      ${rows([
        { name: "Hack The Box", url: p.links.htb },
        { name: "TryHackMe", url: p.links.thm },
        { name: "PicoCTF", url: p.links.pico },
        { name: "CryptoHack", url: p.links.cryptohack },
      ])}`;
    },

    about() {
      const A = ABOUT, p = PROFILE;
      return `
      <section class="about-head">
        <img class="about-photo" src="${A.photo}" alt="Фото: ${esc(p.name)}" width="208" height="208" />
        <div>
          <h1 class="page-title">${esc(p.name)}</h1>
          <p class="lede">${esc(A.education)}</p>
          <ul class="contacts">
            <li><span>Пошта</span><a href="mailto:${A.email}">${esc(A.email)}</a></li>
            <li><span>Hack The Box</span><a href="${p.links.htbLabs}" ${ext}>Yuk1ch</a></li>
            <li><span>TryHackMe</span><a href="${p.links.thm}" ${ext}>Yuk1ch</a></li>
          </ul>
          <div class="actions">
            <a class="btn primary" href="${A.resume}" download>Завантажити резюме (PDF)</a>
            <a class="btn" href="mailto:${A.email}">Написати листа</a>
          </div>
        </div>
      </section>

      <div class="about-cols">
        <div>
          <h2 class="section-title">Професійні інтереси</h2>
          <p class="prose">${esc(A.interests)}</p>
          <h2 class="section-title">Практична діяльність</h2>
          <p class="prose">${esc(A.practice)}</p>
        </div>
        <div>
          <h2 class="section-title">Сертифікація та навчання</h2>
          <ul class="plain">${A.certification.map((c) => `<li>${esc(c)}</li>`).join("")}</ul>
        </div>
      </div>

      <h2 class="section-title">Активність і відзнаки</h2>
      <ol class="feats">${A.activity.map((x) => `
        <li class="${x.top ? "top" : ""}">
          ${x.top ? `<span class="medal">1 місце</span>` : ""}
          <strong>${x.url ? `<a href="${esc(x.url)}" ${ext}>${esc(x.title)}</a>` : esc(x.title)}</strong>
          <span>${esc(x.text)}</span>
        </li>`).join("")}
      </ol>`;
    },

    skills() {
      // артефакти й техніки зі Sherlocks
      const freq = {};
      SHERLOCKS.forEach((s) => s.tags.forEach((t) => (freq[t] = (freq[t] || 0) + 1)));
      const tags = Object.entries(freq).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
      const cats = {};
      SHERLOCKS.forEach((s) => (cats[s.cat] = (cats[s.cat] || 0) + 1));
      const max = Math.max(...Object.values(cats));
      const platforms = [
        ["Hack The Box Sherlocks", SHERLOCKS.length, "#forensics"],
        ["Сертифікати з цифрової криміналістики", CERTS.length, "#certs"],
        ["Модулі HTB Academy", SEM5_CYBER.htbBadges.length + SEM6_CYBER.htbBadges.length, "#sem6-cyber"],
        ["Курси Cisco Networking Academy", SEM5_CYBER.cisco.length, "#sem5-cyber"],
        ["Машини Hack The Box", PROFILE.stats.machines, "#sem7-cyber"],
        ["Сертифікати EC-Council, CodeRED і Basel Institute", SEM7_CYBER.certs.length, "#sem7-cyber"],
        ["Задачі picoCTF", PROFILE.stats.picoSolved, PROFILE.links.pico],
        ["Кімнати TryHackMe", PROFILE.stats.thmRooms, PROFILE.links.thm],
        ["Челенджі Hack The Box", PROFILE.stats.challenges, "#sem5-cyber"],
      ];
      return `
      ${head(TITLES.skills, "Що я вмію і де це підтверджено: основні напрями з резюме, напрями розслідувань і техніки, з якими доводилося працювати в Sherlocks.")}

      <h2 class="section-title">Основні напрями</h2>
      <p class="section-note">${SKILLS_CORE.length} напрямів</p>
      <dl class="skills">${SKILLS_CORE.map((s) => `<div><dt>${esc(s.name)}</dt><dd>${esc(s.note)}</dd></div>`).join("")}</dl>

      <h2 class="section-title">Напрями розслідувань</h2>
      <p class="section-note">За кількістю розв'язаних Sherlocks</p>
      <div class="bars">${Object.entries(cats).sort((a, b) => b[1] - a[1]).map(([c, n]) => `
        <a class="bar" href="#forensics?cat=${encodeURIComponent(c)}">
          <span class="bar-name">${catIcon(c)}${esc(c)}</span>
          <span class="bar-track"><i data-w="${(n / max) * 100}" style="width:0"></i></span>
          <span class="bar-n">${n}</span>
        </a>`).join("")}
      </div>

      <h2 class="section-title">Артефакти та техніки</h2>
      <p class="section-note">Натисніть, щоб побачити розслідування, де це траплялося</p>
      <div class="chips">${tags.map(([t, n]) => `
        <a class="chip" href="#forensics?q=${encodeURIComponent(t)}">${esc(t)}${n > 1 ? `<b>${n}</b>` : ""}</a>`).join("")}
      </div>

      <h2 class="section-title">Підтверджено на платформах</h2>
      <p class="section-note">Кількість пройдених курсів і завдань</p>
      <ul class="rows tally-rows">${platforms.map(([n, c, h]) => `
        <li><a href="${h}" ${h.startsWith("http") ? ext : ""}><span class="n">${esc(n)}</span><span class="cnt">${c}</span></a></li>`).join("")}
      </ul>`;
    },

    certs() {
      const fmt = (d) => new Date(d).toLocaleDateString("uk-UA", { day: "numeric", month: "long", year: "numeric" });
      const groups = {};
      CERTS.forEach((c) => (groups[c.issuer] = groups[c.issuer] || []).push(c));
      const n = CERTS.length;
      return `
      <div class="case-head">
        <div>${head(DF, "Сертифікати курсів з цифрової криміналістики: розслідування артефактів Windows, криміналістика Linux, робота з образами дисків і часовими мітками.")}</div>
        <div class="case-count"><b>${n}</b><span>${plural(n, "сертифікат", "сертифікати", "сертифікатів")}</span></div>
      </div>
      ${subtabs("certs")}
      ${Object.entries(groups).map(([issuer, list]) => `
        <h2 class="section-title">${esc(issuer)}</h2>
        <p class="section-note">${list.length} ${plural(list.length, "сертифікат", "сертифікати", "сертифікатів")}</p>
        <div class="certs">${list.map((c) => certCard(c, "certs", CERTS.indexOf(c))).join("")}
        </div>`).join("")}`;
    },

    "sem7-cyber"() {
      const S = SEM7_CYBER;
      const groups = {};
      S.certs.forEach((c, i) => (groups[c.issuer] = groups[c.issuer] || []).push([c, i]));
      const nc = S.certs.length;
      return `
      ${head(TITLES["sem7-cyber"], "Сертифікати курсів EC-Council, CodeRED і Basel Institute on Governance, машини Hack The Box для лабораторних робіт і профілі на навчальних платформах.")}
      <h2 class="section-title">Профілі на платформах</h2>
      <p class="section-note">Актуальна статистика станом на 16 листопада 2026</p>
      <div class="profiles-grid">${S.profiles.map((p) => `
        <a class="profile-card" href="${esc(p.url)}" ${ext}>
          <span class="profile-shot"><img src="${esc(p.img)}" alt="Профіль ${esc(p.name)}" loading="lazy" /></span>
          <span class="profile-body">
            <strong>${esc(p.name)} <b>${esc(p.stat)}</b></strong>
            <span>${esc(p.desc)}</span>
            <span class="profile-open">Відкрити профіль ${extIcon}</span>
          </span>
        </a>`).join("")}
      </div>
      <h2 class="section-title">Сертифікати</h2>
      <p class="section-note">${nc} ${plural(nc, "сертифікат", "сертифікати", "сертифікатів")}, натисніть на зображення, щоб переглянути</p>
      ${Object.entries(groups).map(([issuer, list]) => `
        <h3 class="group-title">${esc(issuer)} <span>${list.length}</span></h3>
        <div class="certs">${list.map(([c, i]) => certCard(c, "sem7", i)).join("")}</div>`).join("")}
      ${section("Hack The Box Machines", S.machines, "машина", `${S.machines.length} машин, зокрема для лабораторних робіт`)}`;
    },

    "sem5-cyber": () =>
      head(TITLES["sem5-cyber"]) +
      section("Hack The Box Academy", SEM5_CYBER.htbBadges, "модуль") +
      section("Cisco Networking Academy", SEM5_CYBER.cisco, "сертифікат") +
      section("TryHackMe", SEM5_CYBER.thm, "кімната") +
      section("Hack The Box Machines", SEM5_CYBER.machines, "машина") +
      section("Hack The Box Challenges", SEM5_CYBER.challenges, "челендж"),

    "sem6-cyber": () =>
      head(TITLES["sem6-cyber"]) +
      section("Hack The Box Academy", SEM6_CYBER.htbBadges, "модуль") +
      section("Hack The Box Challenges", SEM6_CYBER.challenges, "челендж") +
      section("Hack The Box Machines", SEM6_CYBER.machines, "машина"),

    "sem5-crypto": () =>
      head(TITLES["sem5-crypto"], "Пройдені кімнати TryHackMe з криптографії.") +
      section("TryHackMe", SEM5_CRYPTO, "кімната"),

    "sem6-crypto": () =>
      head(TITLES["sem6-crypto"]) +
      section("TryHackMe", SEM6_CRYPTO.thm, "кімната") +
      section("PicoCTF", SEM6_CRYPTO.pico, "задача") +
      section("CryptoHack", [{ name: "Профіль CryptoHack", url: PROFILE.links.cryptohack, desc: "Задачі з практичної криптографії" }], "профіль", "Профіль на платформі"),

    table: () =>
      head(TITLES.table, "Таблиця сертифікаційного контролю.") +
      `<div class="sheet-frame">
         <iframe src="${TABLE_EMBED}" title="Столик Д.О. (серт. контроль)" loading="lazy" allowfullscreen></iframe>
       </div>
       <a class="sheet-link" href="${TABLE_URL}" ${ext}>
         <span class="sheet-ico" aria-hidden="true"></span>
         <span><strong>Столик Д.О. (серт. контроль)</strong><span>Відкрити в Google Таблицях</span></span>
       </a>`,

    forensics: renderForensics,
  };

  /* ── Цифрова криміналістика ── */
  const DIFF = [
    ["Very Easy", "d-ve"], ["Easy", "d-e"], ["Medium", "d-m"], ["Hard", "d-h"], ["Insane", "d-i"],
  ];
  const diffClass = Object.fromEntries(DIFF);
  const ALL = "Усі";
  const state = { q: "", diff: ALL, cat: ALL };
  let firstVisit = true;

  function renderForensics() {
    const n = SHERLOCKS.length;
    const count = (d) => SHERLOCKS.filter((s) => s.diff === d).length;
    const cats = [ALL, ...new Set(SHERLOCKS.map((s) => s.cat))];
    const seg = (key, values) => values.map((v) =>
      `<button type="button" data-${key}="${esc(v)}" class="${state[key] === v ? "on" : ""}" aria-pressed="${state[key] === v}">${esc(v)}</button>`).join("");
    return `
      <div class="case-head">
        <div>
          ${head(DF, "Розслідування інцидентів на Hack The Box Sherlocks: аналіз артефактів Windows і Linux, шкідливого ПЗ, журналів подій, мережевого трафіку та розвідка загроз. Кожна бірка веде на підтверджене досягнення.")}
        </div>
        <div class="case-count"><b>${n}</b><span>${plural(n, "справа закрита", "справи закриті", "справ закрито")}</span></div>
      </div>
      ${subtabs("forensics")}

      <div class="spread" aria-label="Розподіл за складністю">
        <div class="spread-bar">${DIFF.map(([d, c]) => `<i class="${c}" style="flex:${count(d)};background:var(--c)" title="${d}: ${count(d)}"></i>`).join("")}</div>
        <div class="spread-legend">${DIFF.map(([d, c]) => `<span class="${c}">${d} — ${count(d)}</span>`).join("")}</div>
      </div>

      <div class="filters" id="filters">
        <div style="flex:1 1 260px;max-width:360px">
          <label for="q">Пошук</label>
          <input class="search" id="q" type="search" placeholder="Назва, тег або опис" value="${esc(state.q)}" />
        </div>
        <div><label>Складність</label><div class="seg">${seg("diff", [ALL, ...DIFF.map((d) => d[0])])}</div></div>
        <div><label>Напрям</label><div class="seg">${seg("cat", cats)}</div></div>
      </div>

      <div class="tags" id="list"></div>`;
  }

  function drawSherlocks() {
    const list = document.getElementById("list");
    if (!list) return;
    const q = state.q.trim().toLowerCase();
    const items = SHERLOCKS.filter((s) =>
      (state.diff === ALL || s.diff === state.diff) &&
      (state.cat === ALL || s.cat === state.cat) &&
      (!q || [s.name, s.cat, s.desc, ...s.tags].join(" ").toLowerCase().includes(q)));
    const fmt = (d) => new Date(d).toLocaleDateString("uk-UA", { day: "numeric", month: "long", year: "numeric" });

    list.classList.toggle("enter", firstVisit);
    firstVisit = false;
    list.innerHTML = items.length
      ? items.map((s, i) => `
        <a class="tag ${diffClass[s.diff]}" style="--i:${i}" href="${esc(s.url)}" ${ext}
           aria-label="${esc(s.name)}, ${s.diff}. Відкрити досягнення на Hack The Box">
          <div class="tag-top">
            <span class="hole" aria-hidden="true"></span>
            <span class="tag-no">Доказ № <b>${s.id}</b></span>
            <span class="tag-diff">${s.diff}</span>
          </div>
          <img class="tag-photo" src="${esc(s.img)}" alt="" loading="lazy" width="84" height="84" />
          <h3>${esc(s.name).replace(/&#39;/g, "&#39;<wbr>")}</h3>
          <div class="tag-cat">${catIcon(s.cat)}${esc(s.cat)}</div>
          <p>${esc(s.desc)}</p>
          <dl>
            <dt>Артефакти</dt><dd>${s.tags.map(esc).join(", ")}</dd>
            ${s.tasks ? `<dt>Завдань</dt><dd>${s.tasks}</dd>` : ""}
            <dt>Реліз</dt><dd>${fmt(s.released)}</dd>
          </dl>
          <span class="tag-open">Відкрити досягнення ${extIcon}</span>
        </a>`).join("")
      : `<div class="empty">За цими фільтрами нічого не знайдено.<br>
           <button type="button" class="btn" id="reset">Скинути фільтри</button></div>`;
    document.getElementById("reset")?.addEventListener("click", () => {
      Object.assign(state, { q: "", diff: ALL, cat: ALL });
      route();
    });
  }

  function bindForensics() {
    const q = document.getElementById("q");
    q.addEventListener("input", () => { state.q = q.value; drawSherlocks(); });
    document.getElementById("filters").addEventListener("click", (e) => {
      const b = e.target.closest("button[data-diff], button[data-cat]");
      if (!b) return;
      const key = b.dataset.diff !== undefined ? "diff" : "cat";
      state[key] = b.dataset[key];
      b.parentElement.querySelectorAll("button").forEach((x) => {
        const on = x === b;
        x.classList.toggle("on", on);
        x.setAttribute("aria-pressed", on);
      });
      drawSherlocks();
    });
    drawSherlocks();
  }

  /* ── Маршрутизація ── */
  const side = document.getElementById("side");
  const nav = document.getElementById("nav");
  const burger = document.querySelector(".burger");
  const setMenu = (open) => {
    side.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", open);
  };
  burger.addEventListener("click", () => setMenu(!side.classList.contains("open")));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });
  document.addEventListener("click", (e) => {
    if (side.classList.contains("open") && !side.contains(e.target) && !burger.contains(e.target)) setMenu(false);
  });

  function route() {
    const [rawKey, qs] = location.hash.slice(1).split("?");
    const key = rawKey === "machines" ? "sem7-cyber" : rawKey || "home";
    if (key === "forensics" && qs) {
      const prm = new URLSearchParams(qs);
      Object.assign(state, { q: prm.get("q") || "", cat: prm.get("cat") || ALL, diff: prm.get("diff") || ALL });
      firstVisit = true;
    }
    const page = pages[key] ? key : "home";
    $app.innerHTML = pages[page]();
    if (page === "forensics") bindForensics();
    afterRender(page);
    nav.querySelectorAll("a").forEach((a) => {
      const on = a.getAttribute("href") === "#" + page;
      a.classList.toggle("active", on);
      on ? a.setAttribute("aria-current", "page") : a.removeAttribute("aria-current");
    });
    setMenu(false);
    window.scrollTo({ top: 0 });
    document.title = `${TITLES[page]} — Денис Столик`;
  }
  /* ── Анімації та перегляд ── */
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  function afterRender(page) {
    $app.classList.remove("swap"); void $app.offsetWidth; $app.classList.add("swap");
    // лічильники на головній
    document.querySelectorAll("[data-count]").forEach((el) => {
      const to = +el.dataset.count;
      if (reduce) return;
      const t0 = performance.now(), dur = 1100;
      const tick = (t) => {
        const k = Math.min(1, (t - t0) / dur);
        el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3)));
        if (k < 1) requestAnimationFrame(tick);
      };
      el.textContent = "0";
      requestAnimationFrame(tick);
    });
    // шкали на сторінці навичок
    requestAnimationFrame(() => requestAnimationFrame(() =>
      document.querySelectorAll(".bar-track i[data-w]").forEach((i, k) => {
        i.style.transitionDelay = `${k * 90}ms`;
        i.style.width = i.dataset.w + "%";
      })));
  }

  const box = document.getElementById("lightbox");
  const boxImg = box.querySelector("img");
  const boxTitle = box.querySelector("h2");
  const boxMeta = box.querySelector("p");
  const boxPdf = box.querySelector(".lb-pdf");
  $app.addEventListener("click", (e) => {
    const b = e.target.closest("[data-lightbox]");
    if (!b) return;
    const [set, idx] = b.dataset.lightbox.split(":");
    const c = LB[set]()[+idx];
    boxImg.src = c.thumb.replace(/\.jpg$/, "-lg.jpg");
    boxImg.alt = `Сертифікат «${c.title}»`;
    boxTitle.textContent = c.title;
    boxMeta.textContent = `${c.issuer}, ${fmtDate(c.date)}`;
    boxPdf.href = c.file;
    boxPdf.textContent = /\.pdf$/.test(c.file) ? "Відкрити PDF" : "Відкрити зображення";
    box.showModal();
  });
  box.addEventListener("click", (e) => { if (e.target === box || e.target.closest(".lb-close")) box.close(); });

  /* ── Тема ── */
  const root = document.documentElement;
  const themeBtns = document.querySelectorAll("[data-theme-toggle]");
  const sysDark = matchMedia("(prefers-color-scheme: dark)");
  let saved = null;
  try { saved = localStorage.getItem("theme"); } catch (e) {}
  const applyTheme = (t) => {
    const dark = t ? t === "dark" : sysDark.matches;
    root.dataset.theme = dark ? "dark" : "light";
    themeBtns.forEach((b) => {
      b.setAttribute("aria-pressed", dark);
      b.querySelector(".tt-label").textContent = dark ? "Світла тема" : "Темна тема";
    });
  };
  applyTheme(saved);
  sysDark.addEventListener("change", () => { if (!saved) applyTheme(null); });
  themeBtns.forEach((b) => b.addEventListener("click", () => {
    saved = root.dataset.theme === "dark" ? "light" : "dark";
    try { localStorage.setItem("theme", saved); } catch (e) {}
    applyTheme(saved);
  }));

  window.addEventListener("hashchange", route);
  route();
})();
