document.addEventListener('DOMContentLoaded', () => {
  /** =========================== БОКОВАЯ ПАНЕЛЬ ============================ */
  const aside = document.querySelector('.aside');

  document.addEventListener('DOMContentLoaded', () => {
    const aside = document.querySelector('.aside');

    function checkWidth() {
      if (!aside) return;
      if (window.innerWidth <= 426) {
        aside.classList.add('collapsed');
      } else {
        aside.classList.remove('collapsed');
      }
    }

    window.addEventListener('resize', checkWidth);
    checkWidth();
  });

  /** =========================== МЕНЮ С ПОИСКОМ ============================ */
  const menuItems = document.querySelectorAll('.menu_with_search a');
  menuItems.forEach((item) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      menuItems.forEach((el) => el.classList.remove('it__selected'));
      item.classList.add('it__selected');
    });
  });

  /** =========================== DOTS-МЕНЮ ============================ */
  document.querySelectorAll('.dots-wrapper').forEach((wrapper) => {
    const menu = wrapper.querySelector('.dots-menu');
    wrapper.addEventListener('click', (e) => {
      e.stopPropagation();
      document.querySelectorAll('.dots-menu').forEach((m) => {
        if (m !== menu) m.style.display = 'none';
      });
      menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
    });
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.dots-wrapper')) {
      document.querySelectorAll('.dots-menu').forEach((menu) => {
        menu.style.display = 'none';
      });
    }
  });

  /** =========================== DELETE-МОДАЛКА ============================ */
  document.querySelectorAll('.dots-menu button').forEach((btn) => {
    if (btn.textContent.trim() === 'Delete') {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const confirmModal = document.getElementById('confirmModal');
        if (confirmModal) confirmModal.style.display = 'flex';
      });
    }
  });

  const confirmNoBtn = document.getElementById('confirmNo');
  if (confirmNoBtn) {
    confirmNoBtn.addEventListener('click', () => {
      const confirmModal = document.getElementById('confirmModal');
      if (confirmModal) confirmModal.style.display = 'none';
    });
  }

  /** =========================== УНИВЕРСАЛЬНЫЕ МОДАЛКИ ============================ */
  function setupModal(modalSelector) {
    document.querySelectorAll(modalSelector).forEach((modal) => {
      const closeBtns = modal.querySelectorAll('.close__btn');

      closeBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
          console.log(
            `Закрыта модалка кнопкой №${index + 1} внутри ${modalSelector}`
          );
          modal.style.display = 'none';
        });
      });

      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = 'none';
      });
    });
  }

  setupModal('.modal-overlay');
  setupModal('.popup-overlay');

  /** =========================== ОТКРЫТИЕ ПОПАПА ============================ */
  const openBtn = document.getElementById('openPopupBtn');
  const popupOverlay = document.getElementById('popupOverlay');
  if (openBtn && popupOverlay) {
    openBtn.addEventListener('click', (e) => {
      e.preventDefault();
      popupOverlay.style.display = 'flex';
    });
  }

  /** =========================== TOOLTIP ============================ */
  document.querySelectorAll('.tooltip-container').forEach((container) => {
    const tooltip = container.querySelector('.tooltip-text');

    // container.addEventListener('mouseenter', () => {
    //   const rect = container.getBoundingClientRect();
    //   tooltip.style.left = `${rect.left}px`;
    //   tooltip.style.top = `${rect.bottom + 5}px`;
    //   tooltip.style.visibility = 'visible';
    //   tooltip.style.opacity = '1';
    //   tooltip.style.transform = 'translate(0, 0) scale(1)';
    // });

    // container.addEventListener('mouseleave', () => {
    //   tooltip.style.visibility = 'hidden';
    //   tooltip.style.opacity = '0';
    //   tooltip.style.transform = 'translate(0, 0) scale(0.95)';
    // });
  });

  /** =========================== СТАТУС INSTAGRAM ============================ */
  const connected = true;
  // const connected = false; // для тестирования
  const statusEl = document.getElementById('status');
  const createBtn = document.getElementById('createBtnAuto');
  if (statusEl && createBtn) {
    if (connected) {
      statusEl.textContent = 'Instagram already connected!';
      statusEl.style.color = '#5cc67a';
      createBtn.classList.remove('auto__btn__hidden');
    } else {
      statusEl.textContent = 'Instagram is not connected :(';
      statusEl.style.color = '#f85243';
      createBtn.classList.add('auto__btn__hidden');
    }
  }

  /** =========================== ВЫПАДАЮЩИЙ СПИСОК АККАУНТОВ ============================ */
  const akk = document.querySelector('.akk');
  const dropdown = document.querySelector('.dropdown-list');
  if (akk && dropdown) {
    const arrow = akk.querySelector('.dropdown-icon');
    const avatar = akk.querySelector('img.card_icon');
    const username = akk.querySelector('.akk__info h3');
    const userinfo = akk.querySelector('.akk__info p');

    akk.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.classList.toggle('show');
      arrow.classList.toggle('rotate');
    });

    dropdown.querySelectorAll('li').forEach((item) => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        const img = item.querySelector('img').src;
        const name = item.querySelector('h3').textContent;
        const info = item.querySelector('p').textContent;

        avatar.src = img;
        username.textContent = name;
        userinfo.textContent = info;

        dropdown.classList.remove('show');
        arrow.classList.remove('rotate');
      });
    });

    document.addEventListener('click', (e) => {
      if (!akk.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.remove('show');
        arrow.classList.remove('rotate');
      }
    });
  }

  /** =========================== ТАЙМЛАЙН ============================ */
  const fields = document.querySelectorAll('.step input');
  const line = document.querySelector('.timeline .line');

  fields.forEach(() => {
    fields.forEach((field) => {
      field.addEventListener('input', () => {
        const filled = Array.from(fields).filter(
          (f) => f.value.trim() !== ''
        ).length;
        const percent = filled === 0 ? 0 : (filled / fields.length) * 100;
        line.style.height = `${percent}%`;
      });
    });
  });
});
