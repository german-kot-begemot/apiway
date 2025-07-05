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

  /** =========================== ВЫБОР ОПЦИИ LIKE ============================ */
  document.querySelectorAll('.option').forEach((option) => {
    option.addEventListener('click', () => {
      const chosen = document.createElement('div');
      chosen.classList.add('option__choosed');
      chosen.textContent = option.textContent;

      const removeBtn = document.createElement('span');
      removeBtn.classList.add('remove');
      removeBtn.innerHTML = `
      <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.208955 0.718069C0.34279 0.584155 0.524283 0.508934 0.713519 0.508934C0.902756 0.508934 1.08425 0.584155 1.21808 0.718069L4.99551 4.49877L8.77296 0.718069C8.83883 0.649841 8.91755 0.595427 9.00462 0.557991C9.09169 0.520555 9.18539 0.500855 9.2801 0.500027C9.37487 0.499205 9.46886 0.517277 9.55657 0.553191C9.64428 0.589105 9.72393 0.642148 9.79094 0.709212C9.85795 0.776276 9.91098 0.856026 9.94688 0.943812C9.9827 1.0316 10.0008 1.12565 9.99998 1.2205C9.99912 1.31534 9.97942 1.40907 9.94203 1.49621C9.90463 1.58335 9.85025 1.66217 9.78209 1.72806L6.00464 5.50877L9.78209 9.28948C9.91212 9.42419 9.98406 9.60462 9.98242 9.7919C9.98078 9.97919 9.90577 10.1583 9.77338 10.2908C9.64107 10.4232 9.46208 10.4983 9.27496 10.5C9.08783 10.5016 8.90756 10.4296 8.77296 10.2995L4.99551 6.51877L1.21808 10.2995C1.08349 10.4296 0.903213 10.5016 0.716089 10.5C0.528965 10.4983 0.349969 10.4232 0.217648 10.2908C0.0853265 10.1583 0.0102699 9.97919 0.00864985 9.7919C0.00702268 9.60462 0.0789532 9.42419 0.208955 9.28948L3.98639 5.50877L0.208955 1.72806C0.0751636 1.59412 0 1.41247 0 1.22306C0 1.03366 0.0751636 0.852012 0.208955 0.718069Z" fill="#777777"/>
      </svg>`;

      removeBtn.addEventListener('click', () => {
        document.querySelector('.options__step__block').appendChild(option);
        chosen.remove();
      });

      chosen.appendChild(removeBtn);
      document.getElementById('input-like').appendChild(chosen);
      option.remove();
    });
  });
});
