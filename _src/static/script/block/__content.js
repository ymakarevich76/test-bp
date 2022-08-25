const content = document.querySelector('.content');

getResource("http://localhost:3000/info").then((data) => {
  console.log(data[0]);

   // data.forEach(obj => {
  //   new Card(obj.Card.sale, obj.Card.name, obj.Card.cost,
  //     obj.Card.term, obj.Card.peculiarity, obj.Card.monthlyCost).render();
  //   console.log(obj.Card)
  // })
})

class Banner {
  constructor(title, features_item_1, features_item_2, features_item_3, btn, note, footer_link_left, footer_link_right, privacy_policy) {
    this.title = title;
    this.features_item_1 = features_item_1;
    this.features_item_2 = features_item_2;
    this.features_item_3 = features_item_3;
    this.btn = btn;
    this.note = note;
    this.footer_link_left = footer_link_left;
    this.footer_link_right = footer_link_right;
    this.privacy_policy = privacy_policy;
    this.parent = document.querySelector(".banner");
  }

  render() {
    const banner = document.querySelector(".content");

    banner.innerHTML = `
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
        <button class="subscription__card card">
        </button>
        <button class="subscription__card card">
        </button>
      </div>
      <a class="subscription__btn" href="#">${this.btn}</a>
      <p class="subscription__note">${this.note}</p>
    </div>
      `;

    this.parent.append(banner);
  }
}
