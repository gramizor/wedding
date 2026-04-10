export const wedding = {
  meta: {
    title: "Михаил & Варвара — 11 августа 2026",
    description: "Свадьба Михаила и Варвары. 11 августа 2026 года, Москва.",
    ogImage: "/og-cover.jpg",
  },

  couple: {
    name1: "Михаил",
    name2: "Варвара",
    greeting: "Будем счастливы разделить этот день с Вами",
  },

  date: new Date("2026-08-11T13:45:00+03:00"),

  timeline: [
    {
      time: "13:45",
      title: "Регистрация брака",
      location: "Особняк на Малой Ордынке",
      address: "ул. Малая Ордынка, 14, стр. 1",
      icon: "rings" as const,
    },
    {
      time: "~14:30",
      title: "Прогулка и фотосессия",
      icon: "camera" as const,
    },
    {
      time: "15:30",
      title: "Сбор гостей",
      location: "Ресторан Рябчик",
      address: "ул. Макаренко, 2/21с3",
      icon: "champagne" as const,
    },
    {
      time: "15:30–22:00",
      title: "Праздничный вечер",
      icon: "party" as const,
    },
  ],

  locations: [
    {
      name: "Особняк на Малой Ордынке",
      address: "ул. Малая Ордынка, 14, стр. 1",
      yandexMaps:
        "https://yandex.ru/maps/org/osobnyak_na_maloy_ordynke/156506268696?si=x4xx97rj6mehqmxz1udaz5jz60",
      twoGis: "https://go.2gis.com/3TtWb",
    },
    {
      name: "Ресторан Рябчик",
      address: "ул. Макаренко, 2/21с3",
      yandexMaps:
        "https://yandex.ru/maps/org/ryabchik/12365703212?si=x4xx97rj6mehqmxz1udaz5jz60",
      twoGis: "https://go.2gis.com/YZVK1",
    },
  ],

  dresscode: {
    colors: [
      { name: "Бордовый", hex: "#6E2230" },
      { name: "Чёрный", hex: "#1E1A17" },
      { name: "Белый", hex: "#FFFDF9" },
    ],
    text: "Для нас это важная часть атмосферы этого дня. Будем рады, если Вы почувствуете её и поддержите в своих образах.",
    note: "* белый цвет возможен в деталях, но просим избегать полностью белых образов",
  },

  wishes: {
    gifts: {
      title: "Подарки",
      text: "Лучший подарок для нас — ваши тёплые пожелания и вклад в наше совместное будущее",
    },
    flowers: {
      title: "Цветы",
      text: "Если вы хотите подарить нам цветы — будем рады, если воспользуетесь ссылкой на цветочную подписку. Так мы будем получать свежие букеты ещё долгое время после свадьбы",
      link: null as string | null, // будет добавлена позже
    },
  },

  photoPolicy: {
    text: "Будем рады, если во время церемонии вы уберёте телефоны и доверите съёмку нашему фотографу. Все фото мы обязательно пришлём!",
  },

  coordinator: {
    name: "Ольга",
    phone: "+7 (903) 012 65-93",
    text: "Если у вас есть идея или номер, который вы хотите исполнить, или любые другие вопросы — свяжитесь с нашим координатором",
  },

  gallery: {
    text: "Фотографии появятся здесь через 2–3 недели после торжества",
    photos: [] as string[],
  },

  footer: {
    text: "С любовью, Михаил и Варвара",
  },
} as const;

export type WeddingConfig = typeof wedding;
