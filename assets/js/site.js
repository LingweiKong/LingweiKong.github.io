/* ==========================================================================
   站点交互脚本（原生 JS，无依赖）
   --------------------------------------------------------------------------
   取代原先 131KB 的 jQuery + 插件打包文件 main.min.js。用到 jQuery 的两件事
   在这里各自用几十行原生代码实现：

   1. 顶部导航折叠：宽度不足时把右侧菜单项依次收进「更多」下拉
      （对应原 jquery.greedy-navigation 插件，行为保持一致）
   2. 顶栏高亮当前章节：页内锚点滚动时给对应导航项打 is-active（scrollspy）

   侧栏链接的显隐交给 CSS：$large 断点（925px）下 .author__urls 与
   .author__urls_sm 互相切换，无需 JS 参与。

   原打包文件里用不到的插件一并去掉：
   - magnific-popup（灯箱）：页面没有图片弹层
   - fitVids（视频自适应）：页面没有视频
   - Stickyfill：现代浏览器原生支持 position: sticky
   - jquery.smooth-scroll：改由 CSS `scroll-behavior: smooth` 实现，
     与 `scroll-margin-top` 配合才能让标题准确停在顶栏下方
     （原来用 JS 计算滚动位置，会绕过 scroll-margin）
   ========================================================================== */

(function () {
  'use strict';

  /* ---------------------------------------------------------------
     1. 顶部导航折叠
     --------------------------------------------------------------- */

  var nav = document.getElementById('site-nav');
  var btn = nav && nav.querySelector('button');
  var vlinks = nav && nav.querySelector('.visible-links');
  var hlinks = nav && nav.querySelector('.hidden-links');
  var breaks = [];

  function widthOf(el) {
    return el.getBoundingClientRect().width;
  }

  function updateNav() {
    if (!nav || !btn || !vlinks || !hlinks) return;

    var availableSpace = btn.classList.contains('hidden')
      ? widthOf(nav)
      : widthOf(nav) - widthOf(btn) - 30;

    if (widthOf(vlinks) > availableSpace) {
      // 溢出：把最后一个可见项移入隐藏列表，并显示「更多」按钮
      breaks.push(widthOf(vlinks));
      if (vlinks.lastElementChild) {
        hlinks.insertBefore(vlinks.lastElementChild, hlinks.firstElementChild);
      }
      btn.classList.remove('hidden');
    } else {
      // 有空间：把隐藏列表里的第一项移回可见列表
      if (availableSpace > breaks[breaks.length - 1] && hlinks.firstElementChild) {
        vlinks.appendChild(hlinks.firstElementChild);
        breaks.pop();
      }
      if (breaks.length < 1) {
        btn.classList.add('hidden');
        hlinks.classList.add('hidden');
      }
    }

    btn.setAttribute('count', breaks.length);

    // 可见列表仍然溢出时继续收（按钮出现后可用宽度会变小）
    if (widthOf(vlinks) > availableSpace) updateNav();
  }

  if (btn && hlinks) {
    btn.addEventListener('click', function () {
      hlinks.classList.toggle('hidden');
      btn.classList.toggle('close');
    });
  }

  /* ---------------------------------------------------------------
     2. 当前章节高亮
     --------------------------------------------------------------- */

  var masthead = document.querySelector('.masthead');
  var spyLinks = [];
  var spySections = [];

  function collectSpyTargets() {
    spyLinks = [];
    spySections = [];

    var links = document.querySelectorAll('.greedy-nav a[href*="#"]');

    for (var i = 0; i < links.length; i++) {
      var parts = (links[i].getAttribute('href') || '').split('#');
      if (parts.length < 2 || !parts[1]) continue;

      var hash = parts[1];
      var target = document.getElementById(decodeURIComponent(hash));
      if (!target) continue;

      spyLinks.push({ hash: hash, link: links[i] });
      spySections.push({ hash: hash, target: target });
    }
  }

  function updateSpy() {
    if (!spySections.length) return;

    // 顶栏高度 + 一点余量：章节标题停在顶栏下方即算「进入」该章节
    var offset = (masthead ? masthead.getBoundingClientRect().height : 0) + 24;

    // 还没滚动到第一个章节时（页面顶部），默认高亮第一项「关于我」
    var active = spySections[0].hash;

    for (var i = 0; i < spySections.length; i++) {
      if (spySections[i].target.getBoundingClientRect().top <= offset) {
        active = spySections[i].hash;
      } else {
        break; // 导航顺序与正文顺序一致，后面的更靠下
      }
    }

    for (var j = 0; j < spyLinks.length; j++) {
      var isActive = spyLinks[j].hash === active;
      spyLinks[j].link.classList.toggle('is-active', isActive);
      if (isActive) {
        spyLinks[j].link.setAttribute('aria-current', 'location');
      } else {
        spyLinks[j].link.removeAttribute('aria-current');
      }
    }
  }

  /* ---------------------------------------------------------------
     事件绑定
     --------------------------------------------------------------- */

  var ticking = false;

  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      ticking = false;
      updateSpy();
    });
  }

  function onResize() {
    updateNav();
    updateSpy();
  }

  updateNav();
  collectSpyTargets();
  updateSpy();

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onResize);
  window.addEventListener('load', collectSpyTargets);
})();
