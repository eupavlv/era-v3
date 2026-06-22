# Графические элементы

Кладите изображения сюда. Ниже — куда какое подключается (все слоты сейчас CSS-заглушки).

| Слот в макете | Файл (предлагаемое имя) | Где подключить |
|---|---|---|
| Призма + спектр в hero (справа сверху) | `hero-prism.png` | `css/styles.css` → `.hero__prism` / `.hero__beam` / `.hero__glow` |
| Логотип-знак (треугольник) | `logo.svg` | `.logo__mark` |
| Серая панель в блоке «Как работает» | `process-visual.jpg` | `.process__aside` (заменить `background`) |
| Фото руководителя (флагманский кейс) | `case-photo.jpg` | `.case-hero__media` |
| Карточка реестра РПО (тёмная) | `cert-bg.jpg` | `.cert__card` (фон) |

## Как заменить заглушку на картинку

Например, для фото в кейсе — в `css/styles.css` у `.case-hero__media`
замените блок `background: ...` на:

```css
.case-hero__media {
  background: url("../assets/case-photo.jpg") center / cover no-repeat;
}
```

Аналогично для остальных слотов.
