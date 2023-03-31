/*

  <template id="picture">
    <a href="#" class="picture">
      <img class="picture__img" src="" width="182" height="182" alt="Случайная фотография">
      <p class="picture__info">
        <span class="picture__comments"></span>
        <span class="picture__likes"></span>
      </p>
    </a>
  </template>



1. Заведите модуль, который будет отвечать за отрисовку окна с полноразмерным изображением.

2. Для отображения окна нужно удалять класс hidden у элемента .big-picture
и каждый раз заполнять его данными о конкретной фотографии:

  - Адрес изображения url подставьте как src изображения внутри блока .big-picture__img.
  - Количество лайков likes подставьте как текстовое содержание элемента .likes-count.
  - Количество комментариев comments подставьте как текстовое содержание элемента .comments-count.
  - Список комментариев под фотографией: комментарии должны вставляться в блок .social__comments.
  Разметка каждого комментария должна выглядеть так:
<li class="social__comment">
    <img
        class="social__picture"
        src="{{аватар}}"
        alt="{{имя комментатора}}"
        width="35" height="35">
    <p class="social__text">{{текст комментария}}</p>
</li>
- Описание фотографии description вставьте строкой в блок .social__caption.

3. После открытия окна спрячьте блоки счётчика комментариев .social__comment-count и загрузки новых комментариев .comments-loader, добавив им класс hidden, с ними мы разберёмся позже, в другом домашнем задании.

4. После открытия окна добавьте тегу <body> класс modal-open, чтобы контейнер с фотографиями позади не прокручивался при скролле. При закрытии окна не забудьте удалить этот класс.

5. Напишите код для закрытия окна по нажатию клавиши Esc и клике по иконке закрытия.

6. Подключите модуль в проект.

пример как вставить листенер с функцией с параметрами
// Function to change the content of t2
function modifyText(new_text) {
  const t2 = document.getElementById("t2");
  t2.firstChild.nodeValue = new_text;
}

// Add event listener to table with an arrow function
const el = document.getElementById("outside");
el.addEventListener(
  "click",
  () => {
    modifyText("four");
  },
  false
);


*/

const bigPicture = document.querySelector('.big-picture');

const showBigPicture = (targetedPicture, shownPicture) => {
  shownPicture.classList.remove('.hidden');
  shownPicture.querySelector('.big-picture__img').src = targetedPicture.querySelector('.picture').href;
  shownPicture.querySelector('.likes-count').textContent = targetedPicture.querySelector('.picture__likes').textContent;
  shownPicture.querySelector('.comments-count').textContent = targetedPicture.querySelector('.picture__comments').textContent;

}

