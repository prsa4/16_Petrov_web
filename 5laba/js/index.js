class Block {
    constructor(id, title, content) {
        this._id = id;
        this._title = title;
        this._content = content;
    }

    show() {
        return `
            <div class="block" data-id="${this._id}">
                <h2>${this._title}</h2>
                <p>${this._content}</p>
            </div>
        `;
    }

    edit() {
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

    show() {
        return `
            <div class="block" data-id="${this._id}">
                <h2>${this._title}</h2>
                <p>${this._content}</p>
                <p>Телефон: ${this._phone}</p>
            </div>
        `;
    }

    edit() {
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
        this._usedPoints = this.countPoints();
    }

    countPoints() {
        return Object.values(this._skills).reduce((sum, value) => sum + value, 0);
    }

    show() {
        return `
            <div class="block" data-id="${this._id}">
                <h2>${this._title}</h2>
                <p>${this._content}</p>
                <p>Осталось очков: ${this._totalPoints - this._usedPoints}</p>
                <ul class="skills-list">
                    ${Object.entries(this._skills).map(([skill, points]) => `
                        <li title="${this._defaultSkills[skill] || 'Пользовательский навык'}">
                            ${skill}: ${points}
                            ${this.isEditMode ? `
                                <button class="skill-btn" onclick="pageManager.changeSkill('${this._id}', '${skill}', -1)">-</button>
                                <button class="skill-btn" onclick="pageManager.changeSkill('${this._id}', '${skill}', 1)">+</button>
                            ` : ''}
                        </li>
                    `).join('')}
                </ul>
            </div>
        `;
    }

    edit() {
        return `
            <div class="block editable" data-id="${this._id}">
                <input type="text" class="edit-title" value="${this._title}">
                <textarea class="edit-content">${this._content}</textarea>
                <p>Осталось очков: ${this._totalPoints - this._usedPoints}</p>
                <ul class="skills-list">
                    ${Object.entries(this._skills).map(([skill, points]) => `
                        <li title="${this._defaultSkills[skill] || 'Пользовательский навык'}">
                            ${skill}: ${points}
                            <button class="skill-btn" onclick="pageManager.changeSkill('${this._id}', '${skill}', -1)">-</button>
                            <button class="skill-btn" onclick="pageManager.changeSkill('${this._id}', '${skill}', 1)">+</button>
                        </li>
                    `).join('')}
                </ul>
            </div>
        `;
    }
}

const zodiacPred = [
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
        this._sign = findZodiac(this._date);
        this._prediction = zodiacPred[Math.floor(Math.random() * zodiacPred.length)];
    }

    show() {
        this._prediction = zodiacPred[Math.floor(Math.random() * zodiacPred.length)];
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

    edit() {
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

function findZodiac(date) {
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

function readDate(dateStr) {
    const [day, month, year] = dateStr.split('.').map(Number);
    if (!day || !month || !year || day > 31 || month > 12 || year < 1) {
        throw new Error('Неверный формат даты');
    }
    return new Date(year, month - 1, day);
}

class PageManager {
    constructor() {
        this.blocks = [];
        this.isEditMode = false;
        this.profilePhoto = '';
        this.name = '';
        this.description = '';
        this.hobbies = '';
        this.load();
    }

    save() {
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
            
            localStorage.setItem('blocks', JSON.stringify(data));
            localStorage.setItem('name', this.name);
            localStorage.setItem('description', this.description);
            localStorage.setItem('hobbies', this.hobbies);
            localStorage.setItem('profilePhoto', this.profilePhoto);
        } catch (error) {
            console.error('Ошибка сохранения:', error);
        }
    }

    load() {
        try {
            const savedBlocks = localStorage.getItem('blocks');
            const savedName = localStorage.getItem('name');
            const savedDescription = localStorage.getItem('description');
            const savedHobbies = localStorage.getItem('hobbies');
            const savedPhoto = localStorage.getItem('profilePhoto');

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

            this.profilePhoto = savedPhoto || '';
            this.name = savedName || 'Имя не указано';
            this.description = savedDescription || 'О себе: напишите что-нибудь о себе.';
            this.hobbies = savedHobbies || 'Хобби: укажите свои увлечения.';
        } catch (error) {
            console.error('Ошибка загрузки:', error);
            this.profilePhoto = '';
        }
    }

    switchMode() {
        this.isEditMode = !this.isEditMode;
        this.blocks.forEach(block => {
            if (block instanceof SkillsBlock) block.isEditMode = this.isEditMode;
        });
        this.draw();
    }

    add(type) {
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
        this.save();
        this.draw();
    }

    remove(id) {
        this.blocks = this.blocks.filter(block => block._id !== id);
        this.save();
        this.draw();
    }

    update(id, data) {
        const block = this.blocks.find(b => b._id === id);
        if (block) {
            block._title = data.title;
            block._content = data.content;
            if (block instanceof ContactBlock) block._phone = data.phone;
            if (block instanceof ZodiacBlock) {
                try {
                    block._date = readDate(data.date);
                    block._sign = findZodiac(block._date);
                } catch (e) {
                    console.error(e.message);
                    return;
                }
            }
            if (block instanceof SkillsBlock) {
                block._skills = data.skills || block._skills;
                block._usedPoints = block.countPoints();
            }
            this.save();
        }
    }

    changeSkill(blockId, skill, delta) {
        const block = this.blocks.find(b => b._id === blockId);
        if (block instanceof SkillsBlock) {
            const currentPoints = block._skills[skill];
            const newPoints = Math.min(Math.max(currentPoints + delta, 0), 10);
            const usedPoints = block.countPoints() - currentPoints + newPoints;
            if (usedPoints <= block._totalPoints) {
                block._skills[skill] = newPoints;
                block._usedPoints = usedPoints;
                this.save();
                this.draw();
            }
        }
    }

    uploadPhoto(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                this.profilePhoto = e.target.result;
                this.save();
                this.draw();
            };
            reader.readAsDataURL(file);
        }
    }

    clearPhoto() {
        this.profilePhoto = '';
        this.save();
        this.draw();
    }

    updateProfile(data) {
        this.name = data.name || this.name;
        this.description = data.description || this.description;
        this.hobbies = data.hobbies || this.hobbies;
        this.save();
        this.draw();
    }

    draw() {
        const profileSection = `
            <div class="profile-section">
                <div class="profile-photo">
                    ${this.profilePhoto ? `<img src="${this.profilePhoto}" alt="Фото профиля">` : '<div class="no-photo">Фото отсутствует</div>'}
                    ${this.isEditMode ? `
                        <div class="photo-controls">
                            <button class="upload-btn" onclick="document.getElementById('photo-upload').click()">Загрузить фото</button>
                            <input type="file" id="photo-upload" accept="image/*" style="display: none;">
                            ${this.profilePhoto ? `<button class="clear-btn" onclick="pageManager.clearPhoto()">Удалить фото</button>` : ''}
                        </div>
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
                <button onclick="pageManager.switchMode()">
                    ${this.isEditMode ? 'Просмотр' : 'Редактировать'}
                </button>
                ${this.isEditMode ? `
                    <button onclick="pageManager.add('contact')">Добавить контакт</button>
                    <button onclick="pageManager.add('skills')">Добавить навыки</button>
                    <button onclick="pageManager.add('zodiac')">Добавить гадание</button>
                ` : ''}
            </div>
        `;

        const content = this.blocks.map(block => {
            if (this.isEditMode) {
                return `
                    ${block.edit()}
                    <button onclick="pageManager.remove('${block._id}')">Удалить</button>
                `;
            }
            return block.show();
        }).join('');

        document.body.innerHTML = `<div class="container">${profileSection + header + content}</div>`;

        if (this.isEditMode) {
            const photoUpload = document.getElementById('photo-upload');
            if (photoUpload) {
                photoUpload.addEventListener('change', (e) => this.uploadPhoto(e));
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
                    } else if (block instanceof SkillsBlock) {
                        data.skills = block._skills;
                    }
                    this.update(id, data);
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
pageManager.draw();