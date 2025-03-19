class Block {
    constructor(id, title, content) {
        this._id = id;
        this._title = title;
        this._content = content;
    }

    getHTML() {
        return `
            <div class="block" data-id="${this._id}">
                <h2>${this._title}</h2>
                <p>${this._content}</p>
            </div>
        `;
    }

    getEditHTML() {
        return `
            <div class="block editable" data-id="${this._id}">
                <input type="text" class="edit-title" value="${this._title}">
                <textarea class="edit-content">${this._content}</textarea>
            </div>
        `;
    }
}

class ContactBlock extends Block {
    constructor(id, title, content, phone) {
        super(id, title, content);
        this._phone = phone;
    }

    getHTML() {
        return `
            <div class="block" data-id="${this._id}">
                <h2>${this._title}</h2>
                <p>${this._content}</p>
                <p>Телефон: ${this._phone}</p>
            </div>
        `;
    }

    getEditHTML() {
        return `
            <div class="block editable" data-id="${this._id}">
                <input type="text" class="edit-title" value="${this._title}">
                <textarea class="edit-content">${this._content}</textarea>
                <input type="text" class="edit-phone" value="${this._phone}">
            </div>
        `;
    }
}

class SkillsBlock extends Block {
    constructor(id, title, content, skills = {}) {
        super(id, title, content);
        this._defaultSkills = {
            "Сила": "Физическая мощь, способность поднимать тяжёлые предметы",
            "Ловкость": "Координация движений, скорость реакции",
            "Выносливость": "Уровень энергии, сопротивляемость усталости",
            "Интеллект": "Умственные способности, скорость обучения",
            "Харизма": "Влияние на окружающих, социальные навыки",
            "Удача": "Вероятность успешных событий, шанс критических ударов",
            "Восприятие": "Внимательность, способность замечать детали",
            "Гибкость": "Пластичность тела, акробатические способности",
            "Творчество": "Креативность, способность придумывать новое",
            "Эмпатия": "Понимание эмоций других, способность к сопереживанию"
        };
        this._skills = {};
        Object.keys(this._defaultSkills).forEach(skill => {
            this._skills[skill] = skills[skill] !== undefined ? Math.min(Math.max(skills[skill], 0), 10) : 0;
        });
        this._totalPoints = 30;
        this._usedPoints = this.calculateUsedPoints();
    }

    calculateUsedPoints() {
        return Object.values(this._skills).reduce((sum, value) => sum + value, 0);
    }

    getHTML() {
        return `
            <div class="block" data-id="${this._id}">
                <h2>${this._title}</h2>
                <p>${this._content}</p>
                <p>Осталось очков: ${this._totalPoints - this._usedPoints}</p>
                <ul class="skills-list">
                    ${Object.entries(this._skills).map(([skill, points]) => `
                        <li title="${this._defaultSkills[skill]}">
                            ${skill}: ${points}
                            ${this.isEditMode ? `
                                <button class="skill-btn" onclick="pageManager.updateSkill('${this._id}', '${skill}', -1)">-</button>
                                <button class="skill-btn" onclick="pageManager.updateSkill('${this._id}', '${skill}', 1)">+</button>
                            ` : ''}
                        </li>
                    `).join('')}
                </ul>
            </div>
        `;
    }

    getEditHTML() {
        return this.getHTML();
    }
}

const zodiacPredictions = [
    "Сегодня удача на вашей стороне!",
    "Будьте осторожны с новыми знакомствами.",
    "Вас ждёт неожиданный поворот событий.",
    "Сосредоточьтесь на своих целях.",
    "Любовь уже стучится в вашу дверь.",
    "У вас рак."
];

class ZodiacBlock extends Block {
    constructor(id, title, content, date) {
        super(id, title, content);
        this._date = date ? new Date(date) : new Date();
        this._sign = getZodiacSign(this._date);
        this._prediction = zodiacPredictions[Math.floor(Math.random() * zodiacPredictions.length)];
    }

    getHTML() {
        this._prediction = zodiacPredictions[Math.floor(Math.random() * zodiacPredictions.length)];
        return `
            <div class="block" data-id="${this._id}">
                <h2>${this._title}</h2>
                <p>${this._content}</p>
                <p>Дата: ${this._date.toLocaleDateString('ru-RU')}</p>
                <p>Знак зодиака: ${this._sign}</p>
                <p>Предсказание: ${this._prediction}</p>
            </div>
        `;
    }

    getEditHTML() {
        const formattedDate = `${String(this._date.getDate()).padStart(2, '0')}.${String(this._date.getMonth() + 1).padStart(2, '0')}.${this._date.getFullYear()}`;
        return `
            <div class="block editable" data-id="${this._id}">
                <input type="text" class="edit-title" value="${this._title}">
                <textarea class="edit-content">${this._content}</textarea>
                <input type="text" class="edit-date" value="${formattedDate}" placeholder="ДД.ММ.ГГГГ">
            </div>
        `;
    }
}

function getZodiacSign(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;

    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Овен";
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Телец";
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Близнецы";
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Рак";
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Лев";
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Дева";
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Весы";
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "Скорпион";
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "Стрелец";
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "Козерог";
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Водолей";
    if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return "Рыбы";
}

function parseDateFromDDMMYYYY(dateStr) {
    const [day, month, year] = dateStr.split('.').map(Number);
    if (!day || !month || !year || day > 31 || month > 12 || year < 1) {
        throw new Error('Неверный формат даты');
    }
    return new Date(year, month - 1, day);
}

const CookieManager = {
    setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${encodeURIComponent(value)}; expires=${date.toUTCString()}`;
    },
    getCookie(name) {
        const matches = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
        return matches ? decodeURIComponent(matches[1]) : null;
    },
    deleteCookie(name) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
    }
};

class PageManager {
    constructor() {
        this.blocks = [];
        this.isEditMode = false;
        this.profilePhoto = null;
        this.name = '';
        this.description = '';
        this.hobbies = '';
        this.loadFromCookies();
    }

    saveToCookies() {
        try {
            const data = this.blocks.map(block => {
                if (block instanceof ContactBlock) {
                    return { type: 'contact', id: block._id, title: block._title, content: block._content, phone: block._phone };
                } else if (block instanceof SkillsBlock) {
                    return { type: 'skills', id: block._id, title: block._title, content: block._content, skills: block._skills };
                } else if (block instanceof ZodiacBlock) {
                    return { type: 'zodiac', id: block._id, title: block._title, content: block._content, date: block._date.toISOString() };
                }
                return { type: 'basic', id: block._id, title: block._title, content: block._content };
            });
            CookieManager.setCookie('blocks', JSON.stringify(data), 30);
            CookieManager.setCookie('name', this.name, 30);
            CookieManager.setCookie('description', this.description, 30);
            CookieManager.setCookie('hobbies', this.hobbies, 30);

            localStorage.setItem('profilePhoto', this.profilePhoto);
    
        } catch (error) {
            console.error('Ошибка сохранения в cookies:', error);
        }
    }
    
    loadFromCookies() {
        try {
            const savedBlocks = CookieManager.getCookie('blocks');
            const savedName = CookieManager.getCookie('name');
            const savedDescription = CookieManager.getCookie('description');
            const savedHobbies = CookieManager.getCookie('hobbies');
    
            if (savedBlocks) {
                const data = JSON.parse(savedBlocks);
                this.blocks = data.map(item => {
                    switch (item.type) {
                        case 'contact':
                            return new ContactBlock(item.id, item.title, item.content, item.phone);
                        case 'skills':
                            return new SkillsBlock(item.id, item.title, item.content, item.skills);
                        case 'zodiac':
                            return new ZodiacBlock(item.id, item.title, item.content, item.date);
                        default:
                            return new Block(item.id, item.title, item.content);
                    }
                });
            } else {
                this.blocks = [
                    new ContactBlock('1', 'Контакты', 'Email: test@example.com', '+7 999 123-45-67'),
                    new SkillsBlock('2', 'Навыки', 'Твои навыки'),
                    new ZodiacBlock('3', 'Гадание', 'Ваше предсказание', null)
                ];
            }
    
            this.profilePhoto = localStorage.getItem('profilePhoto') || 'https://via.placeholder.com/150';
            this.name = savedName || 'Имя не указано';
            this.description = savedDescription || 'О себе: напишите что-нибудь о себе.';
            this.hobbies = savedHobbies || 'Хобби: укажите свои увлечения.';
        } catch (error) {
            console.error('Ошибка загрузки из cookies:', error);
            this.profilePhoto = 'https://via.placeholder.com/150';
        }
    }
    

    toggleEditMode() {
        this.isEditMode = !this.isEditMode;
        this.blocks.forEach(block => {
            if (block instanceof SkillsBlock) block.isEditMode = this.isEditMode;
        });
        this.render();
    }

    addBlock(type) {
        const id = Date.now().toString();
        switch (type) {
            case 'contact':
                this.blocks.push(new ContactBlock(id, 'Новый контакт', '', ''));
                break;
            case 'skills':
                this.blocks.push(new SkillsBlock(id, 'Новые навыки', ''));
                break;
            case 'zodiac':
                this.blocks.push(new ZodiacBlock(id, 'Новое гадание', 'Предсказание для вас', null));
                break;
            default:
                this.blocks.push(new Block(id, 'Новый блок', ''));
        }
        this.saveToCookies();
        this.render();
    }

    removeBlock(id) {
        this.blocks = this.blocks.filter(block => block._id !== id);
        this.saveToCookies();
        this.render();
    }

    updateBlock(id, data) {
        const block = this.blocks.find(b => b._id === id);
        if (block) {
            block._title = data.title;
            block._content = data.content;
            if (block instanceof ContactBlock) block._phone = data.phone;
            if (block instanceof ZodiacBlock) {
                try {
                    block._date = parseDateFromDDMMYYYY(data.date);
                    block._sign = getZodiacSign(block._date);
                } catch (e) {
                    console.error(e.message);
                    return;
                }
            }
            this.saveToCookies();
        }
    }

    updateSkill(blockId, skill, delta) {
        const block = this.blocks.find(b => b._id === blockId);
        if (block instanceof SkillsBlock) {
            const currentPoints = block._skills[skill];
            const newPoints = Math.min(Math.max(currentPoints + delta, 0), 10);
            const usedPoints = block.calculateUsedPoints() - currentPoints + newPoints;
            if (usedPoints <= block._totalPoints) {
                block._skills[skill] = newPoints;
                block._usedPoints = usedPoints;
                this.saveToCookies();
                this.render();
            }
        }
    }


    updateProfilePhoto(photo) {
        this.profilePhoto = photo;
        this.saveToCookies();
        this.render();
    }


    handlePhotoUpload(ev) {
        const file = ev.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                this.updateProfilePhoto(e.target.result); 
            };
            reader.readAsDataURL(file); 
        }
    }

    updateProfile(data) {
        this.name = data.name || this.name;
        this.description = data.description || this.description;
        this.hobbies = data.hobbies || this.hobbies;
        this.saveToCookies();
        this.render();
    }

    render() {
        const profileSection = `
            <div class="profile-section">
                <div class="profile-photo">
                    <img src="${this.profilePhoto}" alt="Фото профиля">
                    ${this.isEditMode ? `
                        <input type="file" id="photo-upload" accept="image/*" style="margin-top: 10px;">
                        <input type="text" id="edit-profile-photo" value="${this.profilePhoto}" placeholder="URL фото" style="margin-top: 10px;">
                    ` : ''}
                </div>
                <div class="profile-info">
                    ${this.isEditMode ? `
                        <input type="text" id="edit-name" value="${this.name}">
                        <textarea id="edit-description">${this.description}</textarea>
                        <textarea id="edit-hobbies">${this.hobbies}</textarea>
                    ` : `
                        <h1>${this.name}</h1>
                        <p>${this.description}</p>
                        <p>${this.hobbies}</p>
                    `}
                </div>
            </div>
        `;

        const header = `
            <div class="header">
                <button onclick="pageManager.toggleEditMode()">
                    ${this.isEditMode ? 'Просмотр' : 'Редактировать'}
                </button>
                ${this.isEditMode ? `
                    <button onclick="pageManager.addBlock('contact')">Добавить контакт</button>
                    <button onclick="pageManager.addBlock('skills')">Добавить навыки</button>
                    <button onclick="pageManager.addBlock('zodiac')">Добавить гадание</button>
                ` : ''}
            </div>
        `;

        const content = this.blocks.map(block => {
            if (this.isEditMode && !(block instanceof SkillsBlock)) {
                return `
                    ${block.getEditHTML()}
                    <button onclick="pageManager.removeBlock('${block._id}')">Удалить</button>
                `;
            }
            return block.getHTML();
        }).join('');

        document.body.innerHTML = `<div class="container">${profileSection + header + content}</div>`;


        if (this.isEditMode) {
            const photoUploadInput = document.getElementById('photo-upload');
            if (photoUploadInput) {
                photoUploadInput.addEventListener('change', (e) => this.handlePhotoUpload(e));
            }

            document.body.addEventListener('change', (e) => {
                const element = e.target.closest('.editable');
                if (element) {
                    const id = element.dataset.id;
                    const data = {
                        title: element.querySelector('.edit-title').value,
                        content: element.querySelector('.edit-content').value
                    };
                    const block = this.blocks.find(b => b._id === id);
                    if (block instanceof ContactBlock) {
                        data.phone = element.querySelector('.edit-phone').value;
                    } else if (block instanceof ZodiacBlock) {
                        data.date = element.querySelector('.edit-date').value;
                    }
                    this.updateBlock(id, data);
                } else if (e.target.id === 'edit-profile-photo') {
                    this.updateProfilePhoto(document.getElementById('edit-profile-photo').value);
                } else if (e.target.id === 'edit-name' || e.target.id === 'edit-description' || e.target.id === 'edit-hobbies') {
                    this.updateProfile({
                        name: document.getElementById('edit-name').value,
                        description: document.getElementById('edit-description').value,
                        hobbies: document.getElementById('edit-hobbies').value
                    });
                }
            }, { once: true });
        }
    }
}

const pageManager = new PageManager();
window.pageManager = pageManager;
window.CookieManager = CookieManager;
pageManager.render();