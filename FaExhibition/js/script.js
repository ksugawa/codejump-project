document.querySelector('.navbtn').addEventListener('click', function () {
    document.querySelector('header').classList.toggle('open');
    document.querySelector('.navbtn').classList.toggle('active');
});

$(function () {
    $('a[href^="#"]').click(function () { //ページ内スクロール
        var speed = 500;
        var href = $(this).attr("href");
        var target = $(href == "#" || href == "" ? 'html' : href);
        var position = target.offset().top - 100;
        $("html, body").animate({
            scrollTop: position
        }, speed, "swing");
        return false;
    });
});

$(window).scroll(function () {
    // スクロール位置を取得
    let scroll = $(window).scrollTop();
    mv_scale(scroll);
    if (scroll > 520) {
        // ロゴとハンバーガ―メニュをfadeInで表示する
        $('.logo').fadeIn(500);
        $('.navbtn').fadeIn(500);
    } else {
        // ロゴとハンバーガ―メニュをfadeOutで非表示にする
        $('.logo').fadeOut(500);
        $('.navbtn').fadeOut(500);
    }

    let gallery_position = $('#gallery').offset().top - $(window).height();
    // 画面下から#accessまでの距離を取得
    let access_position = $('#access').offset().top - $(window).height();
    if (window.innerWidth > 900) {
        // #galleryが表示された場合（スクロール位置が、画面下から#galleryまでの距離を超えた場合）
        if (scroll > gallery_position) {
            // #accessが表示されるまでの間は、#side-btnを横からスライドさせて表示する
            if (scroll < access_position) {
                $('#side-btn').css({
                    'transform': 'rotate(-90deg) translateY(0)'
                });
                // #accessが表示されたら、#side-btnをスライドさせて非表示にする
            } else {
                $('#side-btn').css({
                    'transform': 'rotate(-90deg) translateY(60px)'
                });
            }
            // #galleryが表示される前は、#side-btnをスライドさせて非表示にする
        } else {
            $('#side-btn').css({
                'transform': 'rotate(-90deg) translateY(60px)'
            });
        }
    }

    let fadeInTarget = document.querySelectorAll('.fade-in');
    window.addEventListener('scroll', () => {
        for (let i = 0; i < fadeInTarget.length; i++) {
            const rect = fadeInTarget[i].getBoundingClientRect().top;
            const scroll = window.pageYOffset || document.documentElement.scrollTop;
            const offset = rect + scroll;
            const windowHeight = window.innerHeight;
            if (scroll > offset - windowHeight + 150) {
                fadeInTarget[i].classList.add('scroll-in');
            }
        }
    });

    $(window).on('load resize', function () {
        // スクロール位置を取得
        let scroll = $(window).scrollTop();
        mv_scale(scroll);
    });

    function mv_scale(scroll) {
        if (window.innerWidth > 900) {
            $('.fv img').css({
                'width': 100 / 3 + scroll / 10 + '%'
            });
        } else {
            // メインビジュアルのCSS（width）を変更する
            // widthの値をスクロール量にあわせて減らすことで画像を縮小させる
            $('.fv img').css({
                'width': 100 - scroll / 10 + '%'
            });
        }
    }

});