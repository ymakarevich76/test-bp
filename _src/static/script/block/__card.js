window.addEventListener("DOMContentLoaded", () => {
  const banner = document.querySelector(".banner");

  class Header {
    constructor(header_link_right) {
      this.header_link_right = header_link_right;
    }

    render() {
      const bannerTopLink = document.querySelector(".banner__top-link");

      bannerTopLink.textContent = `
      ${this.header_link_right}
        `;
    }
  }

  class Banner {
    constructor(
      title,
      features_item_1,
      features_item_2,
      features_item_3,
      btn,
      note
    ) {
      this.title = title;
      this.features_item_1 = features_item_1;
      this.features_item_2 = features_item_2;
      this.features_item_3 = features_item_3;
      this.btn = btn;
      this.note = note;
      this.parent = document.querySelector(".banner");
    }

    render() {
      const content = document.createElement("section");
      content.classList.add("banner__content", "content");

      content.innerHTML = `
      <h1 class="content__title">
        ${this.title}
      </h1>
      <ul class="content__features features list-reset">
        <li class="features__item">
          <img class="features__icon" src="static/img/icon/unlimitedDocs.svg" alt="">
          <span class="features__caption">${this.features_item_1}</span>
        </li>
        <li class="features__item">
          <img class="features__icon" src="static/img/icon/export.svg" alt="">
          <span class="features__caption">${this.features_item_2}</span>
        </li>
        <li class="features__item">
          <img class="features__icon" src="static/img/icon/noAds.svg" alt="">
          <span class="features__caption">${this.features_item_3}</span>
        </li>
      </ul>

      <div class="content__subscription subscription">
        <div class="subscription__cards">
          <button class="subscription__card card card--active" data-url='https://apple.com/'>
          </button>
          <button class="subscription__card card" data-url='https://google.com/'>
          </button>
        </div>
        <a class="subscription__btn" href="#">${this.btn}</a>
        <p class="subscription__note">${this.note}</p>
      </div>
        `;

      banner.append(content);
    }
  }

  class Footer {
    constructor(footer_link_left, privacy_policy) {
      this.footer_link_left = footer_link_left;
      this.privacy_policy = privacy_policy;
    }

    render() {
      const footer = document.createElement("footer");
      footer.classList.add("banner__footer", "footer");

      footer.innerHTML = `
      <a class="footer__link" href="#">${this.footer_link_left}</a>
      <a class="footer__link" href="#">${this.privacy_policy}</a>
        `;

      banner.append(footer);
    }
  }

  class Card {
    constructor(sale, name, cost, term, peculiarity, monthlyCost) {
      this.sale = sale;
      this.name = name;
      this.cost = cost;
      this.term = term;
      this.peculiarity = peculiarity;
      this.monthlyCost = monthlyCost;
      this.parent = document.querySelector(".subscription__cards");
    }

    render() {
      const card = document.querySelector(".card");

      card.innerHTML = `
        <p class="card__name">${this.name}</p>
        <p class="card__cost">${this.cost}</p>
        <p class="card__term">${this.term}</p>
        <p class="card__peculiarity">${this.peculiarity}</p>
        <p class="card__monthly-cost">${this.monthlyCost}</p>
        `;

      const sale = document.createElement("span");
      sale.classList.add("card__sale");
      sale.innerHTML = `${this.sale}`;
      if (this.sale !== undefined) {
        card.prepend(sale);
        card.classList.add("card--sale");
      }

      this.parent.append(card);
    }
  }

  const generateBanner = (object) => {
    new Header(object.header_link_right).render();

    new Banner(
      object.title,
      object.features_item_1,
      object.features_item_2,
      object.features_item_3,
      object.btn,
      object.note
    ).render();

    new Footer(object.footer_link_left, object.privacy_policy).render();

    object.card.forEach((obj) => {
      new Card(
        obj.sale,
        obj.name,
        obj.cost,
        obj.term,
        obj.peculiarity,
        obj.monthlyCost
      ).render();
    });
  };

  //////////////////////////////////////
  const urlLanguage = new URLSearchParams(window.location.search.slice(1));
  const language = window.navigator.language;
  const lang = urlLanguage.get("lang") || language.slice(0, 2);

  const changeHtmlLang = (lang) => {
    document.documentElement.lang = lang;
  };

  const changeLang = (lang) => {
    getResource(`static/data/${lang}.json`).then((data) => {
      generateBanner(data);
      changeHtmlLang(lang);
    });
  };

  const checkLang = (lang) => {
    const languages = ["ru", "fr", "en", "es", "ja", "nl", "zh"];

    if (languages.includes(lang)) {
      changeLang(lang);
      return;
    }
    changeLang("en");
  };

  checkLang(lang);

  banner.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("btn")) {
      const btns = document.querySelectorAll(".btn");
      btns.forEach((btn) => {
        btn.classList.remove("btn--active");
      });
      evt.target.classList.add("btn--active");
    }
  });

  banner.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("card")) {
      const btns = banner.querySelectorAll(".card");
      btns.forEach((btn) => {
        btn.classList.remove("card--active");
      });

      evt.target.classList.add("card--active");

      const dataUrl = evt.target.getAttribute("data-url");

      banner.querySelector(".subscription__btn").setAttribute("href", dataUrl);
    }
  });
});
