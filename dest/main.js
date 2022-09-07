// ================================= lang =================================

let langCurrent = document.querySelector(".lang__current");
let langOpt = document.querySelector(".lang__option");
let langItems = document.querySelectorAll(".lang__option a");
let langSpan = document.querySelector(".lang__current span");

langCurrent.addEventListener("click", function (e) {
  e.stopPropagation();
  langOpt.classList.toggle("active");
});

langItems.forEach(function (item) {
  item.addEventListener("click", function () {
    let textItem = this.textContent;
    let textTemp = langSpan.textContent;
    langSpan.innerHTML = textItem;
    this.textContent = textTemp;
    langOpt.classList.remove("active");
  });
});
document.addEventListener("click", function () {
  langOpt.classList.remove("active");
});

// ================================= jump menu with active class and smooth scroll =================================
// JAVASCRIP chưa sửa kịp :')

let menus = document.querySelectorAll("header .menu a");
// let menusNav = document.querySelectorAll('header .nav .menuNav a')
let heightHeader = document.querySelector("header").offsetHeight;
let sections = [];

function activeMenu(a) {
  function removeActiveMenu(a) {
    a.forEach(function (menu_element, menu_index) {
      menu_element.classList.remove("active");
    });
  }
  a.forEach(function (element, index) {
    let className = element.getAttribute("href").replace("#", "");
    let section = document.querySelector("." + className);
    sections.push(section);
    element.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({
        top: section.offsetTop - heightHeader + 1,
        behavior: "smooth",
      });
      removeActiveMenu(a);
      element.classList.add("active");
    });
  });

  window.addEventListener("scroll", function () {
    let positionScroll = window.pageYOffset;
    sections.forEach(function (section, index) {
      if (
        positionScroll > section.offsetTop - heightHeader &&
        positionScroll < section.offsetTop + section.offsetHeight
      ) {
        removeActiveMenu(a);
        a[index].classList.add("active");
      } else {
        a[index].classList.remove("active");
      }
    });
  });
}
activeMenu(menus);
// activeMenu(menusNav);

// ================================= Slider (FLICKITY) =================================

// let listItemSlider = document.querySelectorAll('.slider__item')
// let currentSlider = 0;
// let number = document.querySelector('.slider__bottom-paging .number')
// let dot_li = document.querySelectorAll('.slider__bottom-paging .dotted li')

// listItemSlider.forEach(function (itemSlider, index) {
//     if (itemSlider.classList.contains('active')) {
//         currentSlider = index
//     }
// })

// function showNumber(index) {
//     number.innerHTML = (currentSlider + 1).toString().padStart(2, '0')
// }
// // default active
// showNumber(currentSlider + 1)
// dot_li[currentSlider].classList.add('active')

// document.querySelector('.slider__bottom-control .--next').addEventListener('click', function () {
//     if (currentSlider < listItemSlider.length - 1) {
//         goTo(currentSlider + 1)
//     } else {
//         goTo(0)
//     }
// })
// document.querySelector('.slider__bottom-control .--prev').addEventListener('click', function () {
//     if (currentSlider > 0) {
//         goTo(currentSlider - 1)
//     } else {
//         goTo(listItemSlider.length - 1)
//     }
// })

// function goTo(index) {
//     listItemSlider[currentSlider].classList.remove('active')
//     listItemSlider[index].classList.add('active')
//     dot_li[currentSlider].classList.remove('active')
//     dot_li[index].classList.add('active')
//     currentSlider = index
//     showNumber(currentSlider + 1)
// }
// dot_li.forEach(function (li, index) {
//     li.addEventListener('click', function () {
//         goTo(index)
//     })
// })

let $carousel = $(".slider__item-wrap");
$carousel.flickity({
  cellAlign: "left",
  contain: true,
  wrapAround: true,
  prevNextButtons: false,
  autoPlay: 2500,
  on: {
    ready: function () {
      let dotted = $(".flickity-page-dots");
      let paging = $(".slider .slider__bottom-paging .dotted");
      dotted.appendTo(paging);
    },
    change: function (index) {
      let number_paging = $(".slider .slider__bottom-paging .number");
      let indexPage = index + 1;
      number_paging.text(indexPage.toString().padStart(2, "0"));
    },
  },
});

$(".slider .slider__bottom-control .--prev").click(function () {
  $carousel.flickity("previous");
});
$(".slider .slider__bottom-control .--next").click(function () {
  $carousel.flickity("next");
});

// ================================= Photos (flickity) =================================

let $photos = $(".photos__list");
$photos.flickity({
  cellAlign: "left",
  contain: true,
  wrapAround: true,
  prevNextButtons: false,
  groupCells: 4,
  pageDots: false,
});

// ================================= Popup videos (JQUERY) =================================

//  JavaScript

// let play_button = document.querySelectorAll('.video__item-img')
// let popup_video = document.querySelector('.popup-video')
// let close_button = document.querySelector('.popup-video .close')
// let iframe = document.querySelector('.popup-video iframe')
// let iframe_wrap = document.querySelector('.popup-video .iframe_wrap')

// iframe_wrap.addEventListener('click', function (e) {
//     e.stopPropagation()
// })

// play_button.forEach(function (button) {
//     button.addEventListener('click', function () {
//         let video_id = button.getAttribute('data-video-id')
//         iframe.setAttribute('src', 'https://www.youtube.com/embed/' + video_id + '?autoplay=1')
//         popup_video.style.display = 'block'
//     })
// })
// close_button.addEventListener('click', function () {
//     iframe.setAttribute('src', '')
//     popup_video.style.display = 'none'
// })
// document.querySelector('.popup-video').addEventListener('click', function () {
//     iframe.setAttribute('src', '')
//     popup_video.style.display = 'none'
// })

let popup_video = $(".popup-video");
let close_video = $(".popup-video .close");
let iframe_video = $(".popup-video iframe");
let iframe_wrap = $(".popup-video .iframe_wrap");
let play_video = $(".videos .video__item-img");
let play_info = $(".info .--video");

function popupVide(btn) {
  btn.on("click", function (e) {
    e.stopPropagation();
    let data_video = $(this).attr("data-video-id");
    let iframe_src = `https://www.youtube.com/embed/${data_video}?autoplay=1`;
    iframe_video.attr("src", iframe_src);
    popup_video.addClass("active");
  });
}

popupVide(play_video);

popupVide(play_info);

function hiddenModal() {
  iframe_video.attr("src", "");
  popup_video.removeClass("active");
}
close_video.on("click", function (e) {
  hiddenModal();
});

$(document).on("click", function () {
  hiddenModal();
});

iframe_wrap.on("click", function (e) {
  e.stopPropagation();
});

// ================================= menu + back to top (JQUERY) =================================

let btnbacktotop = $("footer .backtotop");
let backtotopfixed = $(".back-to-top");
let btnLogo = $(".logo");

function backtotop(b) {
  b.click(function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}
backtotop(btnbacktotop);
backtotop(backtotopfixed);
backtotop(btnLogo);

let prositionSectionProduct = $(".products").offset().top;
let $header = $("header");

$(window).on("scroll", function () {
  let positionScroll = window.pageYOffset;
  if (positionScroll > prositionSectionProduct - $("header").outerHeight()) {
    backtotopfixed.addClass("active");
    $header.addClass("active");
  } else {
    backtotopfixed.removeClass("active");
    $header.removeClass("active");
  }
});

// ================================= BTN HAMBUGER MENU =================================

let btnMenu = $("header .btnmenu");
btnMenu.click(function () {
  let nav = $("header .nav");
  $(this).toggleClass("open");
  nav.toggleClass("active");
});

// ================================= TAB NEWS (JQUERY) =================================

// let tagText = document.querySelectorAll('.news__tags .tag')
// let tagList = document.querySelectorAll('.news__item-wrap')
// tagText.forEach(function (item, index) {
//     item.addEventListener('click', function () {
//         let tagID = index + 1
//         tagText.forEach(function (tag) {
//             tag.classList.remove('active')
//         })
//         tagList.forEach(function (tags) {
//             tags.classList.remove('active')
//         })
//         item.classList.add('active')
//         console.log(document.querySelector('.news__list-' + tagID))
//         console.log(tagID)
//         document.querySelector('.news__list-' + tagID).classList.add('active')
//     })
// })

let panel = $(".news .news__item-wrap");

$(document).on("click", ".news .tag", function (e) {
  // e.preventDefault();
  $(".news .tag").removeClass("active");
  $(this).addClass("active");
  let index = $(this).index();
  let itemPanel = panel.eq(index);
  $(".news .news__item-wrap").removeClass("active");
  itemPanel.addClass("active");
});

// ================================= FAQ (JQUERY) =================================

$(document).ready(function () {
  $(document).on("click", ".faq .faq__list .accordion", function () {
    $(".faq .faq__list .accordion .arrow")
      .not($(this).children())
      .removeClass("active");
    $(".faq .faq__list .panel").not($(this).next()).slideUp();
    $(this).next().slideToggle();
    $(this).children().toggleClass("active");
  });
});

// ================================= TAGS (JQUERY) =================================

$(document).on("keypress", 'input[name="tags"]', function (e) {
  if (e.keyCode == 13) {
    let value = $(this).val();
    let htmlTag =
      '<div class="tag">' + value + ' <span class="remove">x</span></div>';
    $(".tags .tags__list-list").append(htmlTag);
    $(this).val("");
  }
});

$(document).on("click", ".tags .remove", function () {
  $(this).parent().remove();
});

// ================================= gallery PhotoSwipe =================================

var initPhotoSwipeFromDOM = function (gallerySelector) {
  var parseThumbnailElements = function (el) {
    var thumbElements = el.childNodes,
      numNodes = thumbElements.length,
      items = [],
      figureEl,
      linkEl,
      size,
      item;
    for (var i = 0; i < numNodes; i++) {
      figureEl = thumbElements[i]; // <figure> element
      if (figureEl.nodeType !== 1) {
        continue;
      }
      linkEl = figureEl.children[0]; // <a> element
      size = linkEl.getAttribute("data-size").split("x");
      item = {
        src: linkEl.getAttribute("href"),
        w: parseInt(size[0], 10),
        h: parseInt(size[1], 10),
      };
      if (figureEl.children.length > 1) {
        item.title = figureEl.children[1].innerHTML;
      }
      if (linkEl.children.length > 0) {
        // <img> thumbnail element, retrieving thumbnail url
        item.msrc = linkEl.children[0].getAttribute("src");
      }
      item.el = figureEl; // save link to element for getThumbBoundsFn
      items.push(item);
    }
    return items;
  };
  var closest = function closest(el, fn) {
    return el && (fn(el) ? el : closest(el.parentNode, fn));
  };
  var onThumbnailsClick = function (e) {
    e = e || window.event;
    e.preventDefault ? e.preventDefault() : (e.returnValue = false);
    var eTarget = e.target || e.srcElement;
    var clickedListItem = closest(eTarget, function (el) {
      return el.tagName && el.tagName.toUpperCase() === "FIGURE";
    });
    if (!clickedListItem) {
      return;
    }
    var clickedGallery = clickedListItem.parentNode,
      childNodes = clickedListItem.parentNode.childNodes,
      numChildNodes = childNodes.length,
      nodeIndex = 0,
      index;
    for (var i = 0; i < numChildNodes; i++) {
      if (childNodes[i].nodeType !== 1) {
        continue;
      }
      if (childNodes[i] === clickedListItem) {
        index = nodeIndex;
        break;
      }
      nodeIndex++;
    }
    if (index >= 0) {
      openPhotoSwipe(index, clickedGallery);
    }
    return false;
  };
  var photoswipeParseHash = function () {
    var hash = window.location.hash.substring(1),
      params = {};
    if (hash.length < 5) {
      return params;
    }
    var vars = hash.split("&");
    for (var i = 0; i < vars.length; i++) {
      if (!vars[i]) {
        continue;
      }
      var pair = vars[i].split("=");
      if (pair.length < 2) {
        continue;
      }
      params[pair[0]] = pair[1];
    }
    if (params.gid) {
      params.gid = parseInt(params.gid, 10);
    }
    return params;
  };
  var openPhotoSwipe = function (
    index,
    galleryElement,
    disableAnimation,
    fromURL
  ) {
    var pswpElement = document.querySelectorAll(".pswp")[0],
      gallery,
      options,
      items;
    items = parseThumbnailElements(galleryElement);
    options = {
      galleryUID: galleryElement.getAttribute("data-pswp-uid"),
      getThumbBoundsFn: function (index) {
        var thumbnail = items[index].el.getElementsByTagName("img")[0], // find thumbnail
          pageYScroll =
            window.pageYOffset || document.documentElement.scrollTop,
          rect = thumbnail.getBoundingClientRect();

        return {
          x: rect.left,
          y: rect.top + pageYScroll,
          w: rect.width,
        };
      },
      showAnimationDuration: 0,
      hideAnimationDuration: 0,
    };
    if (fromURL) {
      if (options.galleryPIDs) {
        for (var j = 0; j < items.length; j++) {
          if (items[j].pid == index) {
            options.index = j;
            break;
          }
        }
      } else {
        options.index = parseInt(index, 10) - 1;
      }
    } else {
      options.index = parseInt(index, 10);
    }
    if (isNaN(options.index)) {
      return;
    }
    if (disableAnimation) {
      options.showAnimationDuration = 0;
    }
    gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
    gallery.init();
  };
  var galleryElements = document.querySelectorAll(gallerySelector);
  for (var i = 0, l = galleryElements.length; i < l; i++) {
    galleryElements[i].setAttribute("data-pswp-uid", i + 1);
    galleryElements[i].onclick = onThumbnailsClick;
  }
  var hashData = photoswipeParseHash();
  if (hashData.pid && hashData.gid) {
    openPhotoSwipe(hashData.pid, galleryElements[hashData.gid - 1], true, true);
  }
};

$(window).on("load", function () {
  initPhotoSwipeFromDOM(".gallery__grid");
});

// ================================= BT JS BASIC =================================
/** 1
 * Khai báo 2 số a = 4, b = 12.
Tính tổng 2 số a và b => in ra console
Lấy b chia a, lấy phần dư
Lấy b chia a, lấy phần nguyên.
 */
let a = 4;
let b = 12;
console.log(`Bài tập 1: 
\n Tổng cộng: ${a + b} 
\n Chia lấy dư: ${b % a} 
\n Chia lấy nguyên: ${b / a} `);

/** 2
 * In ra họ và tên của mình bằng cách khai báo 1 biến chứa Họ và biến chứa tên,
 *  có khoảng trắng giữa họ và tên của bạn.
 */
let firstName = "Phạm";
let lastName = "Thân";
console.log(`Bài tập 2: 
\n Họ và tên: ${lastName} ${firstName}`);

/** 3
 * Khai báo một chuỗi ký tự là “happy news year”
In ra tổng số ký tự có trong chuỗi (gợi ý dùng length)
In ra vị trí của chữ “y” từ đầu xuống (gợi ý dùng indexOf)
In ra vị trí của chữ “y” từ dưới lên (gợi ý dùng lastIndexOf)
Dùng replace để thay thế từ “happy” bằng một từ tuỳ ý bạn.
 */
let hny = "happy news year";
console.log(`Bài tập 3: 
\n Tổng số ký tự có trong chuỗi: ${hny.length} 
\n Vị trí của chữ "y" từ đầu xuống: ${hny.indexOf("y")}
\n Vị trí của chữ "y" từ dưới lên: ${hny.lastIndexOf("y")}`);

/** 4
 * Khai báo một số bất kỳ, kiểm tra xem số đó có phải là số chẵn hay không,
 * nếu là số chẵn thì trả về true, ngược lại trả về false.
 * Gợi ý sử dụng câu lệnh điều kiện If Else để kiểm tra.
 */
let bt4 = Math.floor(Math.random() * 100);
if (bt4 % 2 == 0) {
  console.log(`Bài tập 4: 
    \n ${bt4} là số chẵn`);
} else {
  console.log(`Bài tập 4: 
    \n ${bt4} là số lẻ`);
}
/** 5
 * Chạy vòng lặp với i = 0, i < 10, i++.
 * Tính tổng giá trị mỗi lần i tăng lên 1 (gợi ý dùng vòng lặp for,
 * khai báo thêm 1 biến total bên ngoài for và sử dụng toán tử += để cộng dồn giá trị của i).
 * In ra kết quả.
 */
let total = 0;
for (i = 0; i < 10; i++) {
  total += i;
}
console.log(`Bài tập 5: 
\n Tổng từ 1-9 là: ${total}`);
/** 6
 * In ra số chẵn từ 0 - 20.
 * (gợi ý: khai báo một biến n có giá trị = 0, sử dụng vòng lặp while với điều kiện n <= 20,
 * tiếp tục sử dụng câu lệnh điều kiện if trong while để kiểm tra xem nếu là số chẵn thì in n ra,
 * sau khi in thì biến n tăng 1 đơn vị).
 */
let n = 0;
let n6 = 0;
while (n <= 20) {
  if (n % 2 == 0) {
    n6 += n;
  }
  n++;
}
console.log(`Bài tập 6: 
 \n Tổng số chẵn từ 0 - 20 là: ${n6}`);

/** 7
 * Khi nào dùng Var, Let, Const. Phần biệt giữa Biến toàn cục và biến cục bộ?
 */
console.log(`Bài tập 7:
\n Var(biến toàn cục) có thể khai báo hoặc gán lại.
\n Let(biến cục bộ) chỉ có thể khai báo 1 lần, có thể gán.
\n Const(biến cục bộ) là hằng số chỉ có thể khai báo 1 lần và không thay đổi.`);
/** 8
 * Khởi tạo 1 mảng bất kỳ với 5 phần tử, thực hiện xoá 2 phần tử cuối,
 * sau đó in ra mảng còn lại (gợi ý dùng splice).
 */
let fruits = ["Banana", "Orange", "Apple", "Mango", "Kiwi"];
console.log(`Bài tập 8:
\n Mảng mặc định: ${fruits}
\n Xóa 2 phần tử cuối: ${fruits.splice(3, 2)}
\n Mảng mới: ${fruits}`);
/** 9
 * Lấy thời gian hệ thống để tạo đồng hồ bằng Javascript,
 * in ra giao diện người dùng t trong thẻ H1 (gợi ý sử dụng setInterval và đối tượng Date,
 * in ra giao diện thì dùng innerHTML).
 */
setInterval(function dongho() {
  let d = new Date();
  console.log(`Bài tập 9: E IN TRONG NÀY LUÔN NHA A
    ${d.getHours()} : ${d.getMinutes()} : ${d.getSeconds()}`);
}, 120000);
/** 10
 * Tạo một cái nút bằng thẻ a có href=”https://cfdtraining.vn”,
 * nội dung thẻ a là Learn More,
 *  bắt sự kiện bấm vào thẻ a thì in ra nội dung trong thuộc tính href và
 * ngăn chặn chuyển trang (gợi ý dùng getAttribute() để lấy nội dung của href,
 * sự kiện click sử dụng addEventListener() và preventDefault() để chặn chuyển trang).
 */

/** 11
 * Hãy ghi ra những gì bạn hiểu về Callback? code một ví dụ trong đó có sử dụng Callback.
 */
console.log(`Bài tập 11:
\n Callback là một function sẽ được thực thi sau khi một function khác đã được thực thi xong `);

function callback(e, i) {
  console.log(`Bắt đầu : ${e}.`);
  i();
}

callback("xem Phim", function () {
  console.log("Xem xong");
});
