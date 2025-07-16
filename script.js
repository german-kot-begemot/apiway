document.addEventListener('DOMContentLoaded', () => {
  /** =========================== БОКОВАЯ ПАНЕЛЬ ============================ */
  const aside = document.querySelector('.aside');

  if (!aside) return;

  function checkWidth() {
    const isForced = aside.hasAttribute('data-force-collapsed');

    if (window.innerWidth <= 768 || isForced) {
      aside.classList.add('aside--collapsed');
    } else {
      aside.classList.remove('aside--collapsed');
    }
  }

  checkWidth();
  window.addEventListener('resize', checkWidth);

  /** =========================== МЕНЮ С ПОИСКОМ ============================ */
  document.querySelectorAll('.menu_with_search a').forEach((item) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      document
        .querySelectorAll('.menu_with_search a')
        .forEach((el) => el.classList.remove('it__selected'));
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

  document.addEventListener('click', () => {
    document.querySelectorAll('.dots-menu').forEach((menu) => {
      menu.style.display = 'none';
    });
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

  /** =========================== КАСТОМНЫЙ SELECT ============================ */
  document.querySelectorAll('.trigger__custom-select').forEach((select) => {
    const selected = select.querySelector('.trigger__selected');
    const options = select.querySelectorAll('.trigger__options li');
    const input = select
      .closest('.trigger__form-group')
      ?.querySelector("input[type='hidden']");

    selected.onclick = (e) => {
      e.stopPropagation();
      document.querySelectorAll('.trigger__custom-select').forEach((s) => {
        if (s !== select) {
          s.classList.remove('open', 'open-up');
        }
      });

      select.classList.toggle('open');

      // Проверка места снизу
      const rect = select.getBoundingClientRect();
      const dropdown = select.querySelector('.trigger__options');
      const dropdownHeight = dropdown.scrollHeight;

      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;

      if (spaceBelow < dropdownHeight && spaceAbove > dropdownHeight) {
        select.classList.add('open-up');
      } else {
        select.classList.remove('open-up');
      }
    };

    options.forEach((opt) => {
      opt.onclick = (e) => {
        e.stopPropagation();
        selected.textContent = opt.textContent.trim();
        if (input) input.value = opt.dataset.value;
        select.classList.remove('open');
      };
    });
  });

  document.addEventListener('click', () => {
    document
      .querySelectorAll('.trigger__custom-select')
      .forEach((s) => s.classList.remove('open'));
  });

  /** =========================== TOGGLE ПАРОЛЯ ============================ */
  document.querySelectorAll('.toggle__password').forEach((button) => {
    button.addEventListener('click', () => {
      const targetId = button.getAttribute('data-target');
      const input = document.getElementById(targetId);
      if (input) {
        input.type = input.type === 'password' ? 'text' : 'password';
      }
    });
  });

  /** =========================== ВАЛИДАЦИЯ ПАРОЛЯ ============================ */
  const newPasswordInput = document.getElementById('new-password');
  const rules = document.querySelectorAll(
    '#password__requirements .password__rule'
  );

  const checkIcon = `
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M13.9007 5.01616L6.83231 11.9039C6.76971 11.9654 6.68449 12 6.59559 12C6.50669 12 6.42147 11.9654 6.35886 11.9039L2.76464 8.40155C2.70152 8.34054 2.66602 8.2575 2.66602 8.17087C2.66602 8.08425 2.70152 8.0012 2.76464 7.9402L3.23142 7.48535C3.29403 7.42384 3.37925 7.38925 3.46815 7.38925C3.55705 7.38925 3.64227 7.42384 3.70487 7.48535L6.59225 10.2989L12.9605 4.09346C13.0924 3.96885 13.302 3.96885 13.4339 4.09346L13.9007 4.55481C13.9638 4.61582 13.9993 4.69886 13.9993 4.78549C13.9993 4.87211 13.9638 4.95516 13.9007 5.01616Z" fill="#4BC160" />
</svg>`;

  const crossIcon = `
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M11.8986 10.9586C11.9617 11.0212 11.9972 11.1064 11.9972 11.1953C11.9972 11.2841 11.9617 11.3693 11.8986 11.4319L11.4319 11.8986C11.3693 11.9617 11.2841 11.9972 11.1953 11.9972C11.1064 11.9972 11.0212 11.9617 10.9586 11.8986L7.9986 8.9386L5.0386 11.8986C4.97601 11.9617 4.89081 11.9972 4.80193 11.9972C4.71305 11.9972 4.62785 11.9617 4.56527 11.8986L4.0986 11.4319C4.0355 11.3693 4 11.2841 4 11.1953C4 11.1064 4.0355 11.0212 4.0986 10.9586L7.0586 7.9986L4.0986 5.0386C4.0355 4.97601 4 4.89081 4 4.80193C4 4.71305 4.0355 4.62785 4.0986 4.56527L4.56527 4.0986C4.62785 4.0355 4.71305 4 4.80193 4C4.89081 4 4.97601 4.0355 5.0386 4.0986L7.9986 7.0586L10.9586 4.0986C11.0212 4.0355 11.1064 4 11.1953 4C11.2841 4 11.3693 4.0355 11.4319 4.0986L11.8986 4.56527C11.9617 4.62785 11.9972 4.71305 11.9972 4.80193C11.9972 4.89081 11.9617 4.97601 11.8986 5.0386L8.9386 7.9986L11.8986 10.9586Z" fill="#F85243" />
</svg>`;

  if (newPasswordInput) {
    rules.forEach((rule) => {
      const iconSpan = rule.querySelector('.icon');
      iconSpan.innerHTML = crossIcon;
      rule.classList.add('invalid');
    });

    newPasswordInput.addEventListener('input', () => {
      const value = newPasswordInput.value;

      const conditions = [
        /.{8,}/.test(value), // min 8 characters
        /[A-Z]/.test(value), // uppercase
        /[a-z]/.test(value), // lowercase
        /[0-9]/.test(value), // number
        /[^A-Za-z0-9]/.test(value), // one special character
      ];

      rules.forEach((rule, index) => {
        const iconSpan = rule.querySelector('.icon');
        if (!iconSpan) return;
        if (conditions[index]) {
          rule.classList.add('valid');
          rule.classList.remove('invalid');
          iconSpan.innerHTML = checkIcon;
        } else {
          rule.classList.add('invalid');
          rule.classList.remove('valid');
          iconSpan.innerHTML = crossIcon;
        }
      });
    });
  }
});

/** =========================== СОРТИРОВКА ТАБЛИЦЫ по дате  ============================ */
function sortTable(columnIndex) {
  const table = document.getElementById('sortableTable');
  const tbody = table.tBodies[0];
  const rows = Array.from(tbody.rows);
  const th = table.querySelectorAll('th')[columnIndex];
  const isAscending = th.classList.toggle('asc');

  const parseDate = (cellText) => new Date(cellText.trim());

  rows.sort((rowA, rowB) => {
    const cellA = rowA.cells[columnIndex].innerText;
    const cellB = rowB.cells[columnIndex].innerText;

    const dateA = parseDate(cellA);
    const dateB = parseDate(cellB);

    return isAscending ? dateA - dateB : dateB - dateA;
  });

  rows.forEach((row) => tbody.appendChild(row));
}

/** =========================== ДРОПДАУН АККАУНТОВ ============================ */
function setupAccountDropdown(containerSelector, dropdownSelector) {
  const akk = document.querySelector(containerSelector);
  const dropdown = document.querySelector(dropdownSelector);

  if (!akk || !dropdown) {
    // console.warn('Account container или dropdown не найдены!');
    return;
  }

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
setupAccountDropdown('.akk', '.dropdown-list');

/** =========================== PHONE SCREEN TOGGLE ============================ */
function initTogglePhoneScreen() {
  const createContent = document.querySelector('.create__main__content');

  if (!createContent) return;

  const toggle = createContent.querySelector('#toggleDetected');
  const commentsBlock = createContent.querySelector('.phone__screen__comments');
  const dmBlock = createContent.querySelector('.phone__screen__dm');

  function updatePhoneScreen() {
    if (toggle.checked) {
      commentsBlock.style.display = 'none';
      dmBlock.style.display = 'block';
    } else {
      commentsBlock.style.display = 'block';
      dmBlock.style.display = 'none';
    }
  }

  toggle.addEventListener('change', updatePhoneScreen);
  updatePhoneScreen();
}
initTogglePhoneScreen();

/** =========================== ВЫБОР ОПЦИИ LIKE ============================ */
function initOptionLikeSelection() {
  const toggle = document.getElementById('toggleDetected');
  const detectTextBlock = document.getElementById('detect');
  const detectImgBlock = document.getElementById('detect-img');
  const imageInput = document.getElementById('image');

  document.querySelectorAll('.option').forEach((option) => {
    option.addEventListener('click', () => {
      const chosen = document.createElement('div');
      chosen.classList.add('option__choosed');
      chosen.textContent = option.textContent;

      const removeBtn = document.createElement('span');
      removeBtn.classList.add('remove');
      removeBtn.innerHTML = `
        <svg width="10" height="10" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M0.208955 0.718069C0.34279 0.584155 0.524283 0.508934 0.713519 0.508934C0.902756 0.508934 1.08425 0.584155 1.21808 0.718069L4.99551 4.49877L8.77296 0.718069C8.83883 0.649841 8.91755 0.595427 9.00462 0.557991C9.09169 0.520555 9.18539 0.500855 9.2801 0.500027C9.37487 0.499205 9.46886 0.517277 9.55657 0.553191C9.64428 0.589105 9.72393 0.642148 9.79094 0.709212C9.85795 0.776276 9.91098 0.856026 9.94688 0.943812C9.9827 1.0316 10.0008 1.12565 9.99998 1.2205C9.99912 1.31534 9.97942 1.40907 9.94203 1.49621C9.90463 1.58335 9.85025 1.66217 9.78209 1.72806L6.00464 5.50877L9.78209 9.28948C9.91212 9.42419 9.98406 9.60462 9.98242 9.7919C9.98078 9.97919 9.90577 10.1583 9.77338 10.2908C9.64107 10.4232 9.46208 10.4983 9.27496 10.5C9.08783 10.5016 8.90756 10.4296 8.77296 10.2995L4.99551 6.51877L1.21808 10.2995C1.08349 10.4296 0.903213 10.5016 0.716089 10.5C0.528965 10.4983 0.349969 10.4232 0.217648 10.2908C0.0853265 10.1583 0.0102699 9.97919 0.00864985 9.7919C0.00702268 9.60462 0.0789532 9.42419 0.208955 9.28948L3.98639 5.50877L0.208955 1.72806C0.0751636 1.59412 0 1.41247 0 1.22306C0 1.03366 0.0751636 0.852012 0.208955 0.718069Z" fill="#777777"/>
        </svg>`;

      removeBtn.addEventListener('click', () => {
        document.querySelector('.options__step__block').appendChild(option);
        chosen.remove();
        detectTextBlock.innerHTML = '';
      });

      chosen.appendChild(removeBtn);
      document.getElementById('input-like').appendChild(chosen);

      if (!toggle.checked) {
        detectTextBlock.innerHTML = '';
        const clone = document.createElement('div');
        clone.classList.add('option__choosed-detect');
        clone.textContent = option.textContent;
        detectTextBlock.appendChild(clone);
      }

      option.remove();
    });
  });

  if (imageInput && toggle && detectImgBlock) {
    imageInput.addEventListener('change', () => {
      if (toggle.checked && imageInput.files.length > 0) {
        const file = imageInput.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
          detectImgBlock.innerHTML = '';
          const img = document.createElement('img');
          img.src = e.target.result;
          img.alt = 'Uploaded preview';
          img.style.maxWidth = '100%';
          detectImgBlock.appendChild(img);
        };
        reader.readAsDataURL(file);
      }
    });
  }
}

initOptionLikeSelection();

/** =========================== ПРЕДПРОСМОТР ИЗОБРАЖЕНИЯ ============================ */
function initFilePreview() {
  const fileInput = document.getElementById('fileInput');
  const previewContainer = document.getElementById('previewContainer');
  const dmImageContainer = document.querySelector('.dm__uploaded__img');

  if (!fileInput || !previewContainer || !dmImageContainer) return;

  fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        const imageSrc = e.target.result;

        previewContainer.innerHTML = `
          <div class="preview-wrapper">
            <div class="preview-image-container">
              <img src="${imageSrc}" alt="Preview" />
              <button class="remove-preview" type="button" aria-label="Remove preview">
                <img src="images/cl.svg" alt="Close" />
              </button>
            </div>
          </div>
        `;
        document.querySelector('.icon').style.display = 'none';
        document.querySelector('.upload-text').style.display = 'none';
        document.querySelector('.browse-button').style.display = 'none';
        document.querySelector('.file-upload').style.border = 'none';

        dmImageContainer.innerHTML = `<img src="${imageSrc}" alt="Uploaded image" />`;

        previewContainer
          .querySelector('.remove-preview')
          .addEventListener('click', () => {
            previewContainer.innerHTML = '';
            fileInput.value = '';
            document.querySelector('.icon').style.display = '';
            document.querySelector('.upload-text').style.display = '';
            document.querySelector('.browse-button').style.display = '';
            document.querySelector('.file-upload').style.border = '';
            dmImageContainer.innerHTML = '';
          });
      };

      reader.readAsDataURL(file);
    } else {
      previewContainer.innerHTML = '';
      dmImageContainer.innerHTML = '';
    }
  });
}

initFilePreview();

/** =========================== СТАТУС INSTAGRAM ============================ */
function updateInstagramStatus(connected) {
  const statusEl = document.getElementById('status');
  const createBtn = document.getElementById('createBtnAuto');

  if (!statusEl || !createBtn) return;

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

const connected = true; // или false
updateInstagramStatus(connected);

/** =========================== ОБЩИЙ ОБРАБОТЧИК ДЛЯ ТУМБЛЕРОВ ============================ */
function initToggleSwitches() {
  document.querySelectorAll('.toggle-switch').forEach((toggleLabel) => {
    const input = toggleLabel.querySelector('input[type="checkbox"]');
    if (!input) return;

    const title =
      toggleLabel.previousElementSibling?.tagName === 'H3'
        ? toggleLabel.previousElementSibling
        : toggleLabel.nextElementSibling?.tagName === 'H3'
        ? toggleLabel.nextElementSibling
        : null;

    if (!title) return;

    if (!title.dataset.original) {
      title.dataset.original = title.textContent;
    }

    input.addEventListener('change', () => {
      title.textContent = input.checked ? 'Activated' : title.dataset.original;
    });
  });
}

initToggleSwitches();

/** =========================== ИНИЦИАЛИЗАЦИЯ ПОПАПОВ ============================ */
function initPopupOpeners() {
  const openBtn = document.getElementById('openPopupBtn');
  const popupOverlay = document.getElementById('popupOverlay');

  if (openBtn && popupOverlay) {
    openBtn.addEventListener('click', (e) => {
      e.preventDefault();
      popupOverlay.style.display = 'flex';
    });
  }

  const specificRadio = document.querySelector(
    'input[name="commentOption"][value="specific"]'
  );

  if (specificRadio && popupOverlay) {
    specificRadio.addEventListener('change', () => {
      if (specificRadio.checked) {
        popupOverlay.style.display = 'flex';
      }
    });
  }
}
initPopupOpeners();

/** =========================== ПЛЕЙСХОЛДЕРЫ ФОРМЫ ============================ */
document
  .querySelectorAll('input[placeholder], textarea[placeholder]')
  .forEach((field) => {
    const original = field.placeholder;

    field.addEventListener('focus', () => (field.placeholder = ''));
    field.addEventListener('blur', () => (field.placeholder = original));
  });

/** =========================== УНИВЕРСАЛЬНЫЕ МОДАЛКИ ============================ */
function setupModal(modalSelector) {
  document.querySelectorAll(modalSelector).forEach((modal) => {
    modal.querySelectorAll('.close__btn').forEach((btn) => {
      btn.addEventListener('click', () => (modal.style.display = 'none'));
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.style.display = 'none';
    });
  });
}
function initAllModals() {
  setupModal('.modal-overlay');
  setupModal('.popup-overlay');
}

initAllModals();

// =========================== АВТОМАТИЧЕСКАЯ ПОДГОНКА ВЫСОТЫ ТЕКСТОВОЙ ОБЛАСТИ ============================
function changeTextareaHeight() {
  document.querySelectorAll('textarea').forEach((textarea) => {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';

    textarea.addEventListener('input', () => {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    });
  });
}

changeTextareaHeight();
