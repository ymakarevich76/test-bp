window.addEventListener("DOMContentLoaded", () => {
  const banner = document.querySelector(".banner");

  const htmlContents = document.querySelectorAll("[data-content]");

  const generateBanner = (object) => {
    const pricePerMonth = "$9.99";
    const pricePerYear = "$19.99";
    const pricePerMonthPerYear = "$" +
      Math.floor((pricePerYear.slice(1) / 12) * 100) / 100;

    htmlContents.forEach((content) => {
      content.innerHTML = object[content.dataset.content];

      if (content.dataset.content.includes("{{price}}")) {
        const priceText = content.textContent.slice(9);

        if (content.dataset.content.includes("per month")) {
          content.innerHTML = `<strong>${pricePerMonth}</strong><br>${priceText}`;
          return;
        }

        if (content.dataset.content.includes("per year")) {
          content.innerHTML = `<strong>${pricePerYear}</strong><br>${priceText}`;
          return;
        }

        if (content.dataset.cost === 'pricePerMonth') {
          content.innerHTML = `${pricePerMonth}${priceText}`;
          return;
        }

        if (content.dataset.cost === 'pricePerMonthPerYear') {
          content.innerHTML = `${pricePerMonthPerYear}${priceText}`;
          return;
        }
      }
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
