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
                        <li title="${this._defaultSkills[skill]}">
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
                        <li title="${this._defaultSkills[skill]}">
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

class ZodiacBlock extends Block {
    constructor(id, title, content, date) {
        super(id, title, content);
        this._date = date ? new Date(date) : new Date();
        this._sign = this.findZodiac(this._date);
        this._prediction = this.generatePrediction();
    }

    findZodiac(date) {
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

    generatePrediction() {
        const predictions = [
            "У вас рак.",
            `Вы умрете через ${Math.floor(Math.random() * 1000)} дней. Чтобы избежать этого, закажите платное гадание.`,
            "Сегодня вас ждет удача.",
            "Что-то не получилось, попробуйте заказать платное гадание.",
            "Звезды говорят: закажите платное гадание.",
            "Вас ждет большое будущее... или большое недоразумение, как повезет.",
            `Через ${Math.floor(Math.random() * 50)} лет вы умрете.`,
            "Вас задавит электробус через ... Чтобы узнать точную дату,закажите платное гадание ",
            "Сатурн в ретрограде, так что не удивляйтесь, если потеряете деньги.",
            "Ваша судьба — стать звездой.",
            "Завтра вы проснетесь богатым, если закажите платное гадание.",
            "Ваша карма чиста, но кошелек скоро опустеет. Спасение — в платном гадании.",
        ];
        return predictions[Math.floor(Math.random() * predictions.length)];
    }

    show() {
        return `
            <div class="block" data-id="${this._id}">
                <h2>${this._title}</h2>
                <p>${this._content}</p>
                <p>Дата: ${this._date.toLocaleDateString('ru-RU')}</p>
                <p>Знак зодиака: ${this._sign}</p>
                <p>Предсказание: ${this._prediction}</p>
                <p>Хочешь еще одно гадание? Поддержи на Binance:</p>
                <p class="donate-address">TUJRyjKhRjns1EC7Tu6AnpLjSckVZRY2xi</p>
                <button onclick="navigator.clipboard.writeText('TUJRyjKhRjns1EC7Tu6AnpLjSckVZRY2xi')">Скопировать адрес</button>
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
        this.currentPage = 'home';
        this.apiData = {
            photos: null,
            weather: null,
            blogPosts: []
        };
        this.weatherLocation = 'Moscow';
        this.autoPostInterval = null;
        this.blogUsers = [
            { name: "Анатолий", avatar: "" },
            { name: "Адун", avatar: "" },
            { name: "Адольф", avatar: "" },
            { name: "Ягон Дон", avatar: "" },
            { name: "Яспер Моглот", avatar: "" },
            { name: "Яна Цист", avatar: "" }
        ];
        this.load();
        this.initBlogUsers();
    }

    async initBlogUsers() {
        try {
            this.blogUsers.forEach(user => {
                user.avatar = `https://picsum.photos/50/50?random=${Date.now() + Math.floor(Math.random() * 1000)}`;
            });
        } catch (error) {
            console.error('Ошибка генерации аватаров:', error);
            this.blogUsers.forEach(user => {
                user.avatar = 'https://via.placeholder.com/50';
            });
        }
    }

    save() {
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
        localStorage.setItem('weatherLocation', this.weatherLocation);
    }

    load() {
        const savedBlocks = localStorage.getItem('blocks');
        const savedName = localStorage.getItem('name');
        const savedDescription = localStorage.getItem('description');
        const savedHobbies = localStorage.getItem('hobbies');
        const savedPhoto = localStorage.getItem('profilePhoto');
        const savedWeatherLocation = localStorage.getItem('weatherLocation');

        if (savedBlocks) {
            const data = JSON.parse(savedBlocks);
            this.blocks = data.map(item => {
                switch (item.type) {
                    case 'contact': return new ContactBlock(item.id, item.title, item.content, item.phone);
                    case 'skills': return new SkillsBlock(item.id, item.title, item.content, item.skills);
                    case 'zodiac': return new ZodiacBlock(item.id, item.title, item.content, item.date);
                    default: return new Block(item.id, item.title, item.content);
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
        this.description = savedDescription || 'О себе: напишите что-нибудь.';
        this.hobbies = savedHobbies || 'Хобби: укажите свои увлечения.';
        this.weatherLocation = savedWeatherLocation || 'Moscow';
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
            case 'contact': this.blocks.push(new ContactBlock(id, 'Новый контакт', '', '')); break;
            case 'skills': this.blocks.push(new SkillsBlock(id, 'Новые навыки', '')); break;
            case 'zodiac': this.blocks.push(new ZodiacBlock(id, 'Новое гадание', 'Предсказание', null)); break;
            default: this.blocks.push(new Block(id, 'Новый блок', ''));
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
                block._date = readDate(data.date);
                block._sign = block.findZodiac(block._date);
                block._prediction = block.generatePrediction();
            }
            if (block instanceof SkillsBlock) block._skills = data.skills || block._skills;
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

    async generateRandomPhoto() {
        const placeholder = document.createElement('div');
        placeholder.className = 'placeholder';
        placeholder.innerHTML = 'Генерация фото...';
        document.body.appendChild(placeholder);

        try {
            const photoUrl = `https://picsum.photos/200/200?random=${Date.now()}`;
            this.profilePhoto = photoUrl;
            this.save();
        } catch (error) {
            console.error('Ошибка генерации фото:', error);
            this.profilePhoto = 'https://via.placeholder.com/150';
        } finally {
            document.body.removeChild(placeholder);
            this.draw();
        }
    }

    async fetchPhotos() {
        const placeholder = document.createElement('div');
        placeholder.className = 'placeholder';
        placeholder.innerHTML = 'Генерация фото...';
        document.body.appendChild(placeholder);

        try {
            const photoResponse = await fetch('https://randomuser.me/api/');
            if (!photoResponse.ok) throw new Error('Ошибка загрузки фото');
            const photoData = await photoResponse.json();
            if (!photoData.results || !photoData.results[0] || !photoData.results[0].picture) {
                throw new Error('Некорректные данные фото');
            }
            const photoUrl = photoData.results[0].picture.large;

            const fakerResponse = await fetch('https://fakerapi.it/api/v1/persons?_quantity=1');
            if (!fakerResponse.ok) throw new Error('Ошибка загрузки данных');
            const fakerData = await fakerResponse.json();
            if (!fakerData.data || !fakerData.data[0]) {
                throw new Error('Некорректные данные FakerAPI');
            }
            const person = fakerData.data[0];
            const name = `${person.firstname} ${person.lastname}`;
            const age = Math.floor(Math.random() * (70 - 18 + 1)) + 18;
            const location = `${person.address.city}, ${person.address.country}`;

            this.apiData.photos = { url: photoUrl, name, age, location };
        } catch (error) {
            console.error('Ошибка генерации:', error);
            this.apiData.photos = {
                url: 'https://via.placeholder.com/150',
                name: 'Неизвестно',
                age: 'N/A',
                location: 'Неизвестно'
            };
        } finally {
            document.body.removeChild(placeholder);
            this.draw();
        }
    }

    updateProfile(data) {
        this.name = data.name || this.name;
        this.description = data.description || this.description;
        this.hobbies = data.hobbies || this.hobbies;
        this.save();
        this.draw();
    }

    async fetchWeather() {
        const placeholder = document.createElement('div');
        placeholder.className = 'placeholder';
        placeholder.innerHTML = 'Загрузка погоды...';
        document.body.appendChild(placeholder);

        try {
            const response = await fetch(
                `http://api.weatherapi.com/v1/forecast.json?key=0b31cd8a9bb942ef950152103252703&q=${encodeURIComponent(this.weatherLocation)}&days=5&lang=ru`
            );
            if (!response.ok) throw new Error('Ошибка загрузки погоды');
            this.apiData.weather = await response.json();
        } catch (error) {
            console.error('Ошибка загрузки погоды:', error);
            this.apiData.weather = null;
        } finally {
            document.body.removeChild(placeholder);
            this.draw();
        }
    }

    setWeatherLocation(location) {
        this.weatherLocation = location;
        this.save();
        this.fetchWeather();
    }

    async fetchBlogPost() {
        const placeholder = document.createElement('div');
        placeholder.className = 'placeholder';
        placeholder.innerHTML = 'Генерация поста...';
        document.body.appendChild(placeholder);

        try {
            const response = await fetch('https://fish-text.ru/get?type=sentence&number=1');
            if (!response.ok) throw new Error('Ошибка загрузки текста');
            const data = await response.json();
            const randomUser = this.blogUsers[Math.floor(Math.random() * this.blogUsers.length)];
            const avatarUrl = `https://picsum.photos/50/50?random=${Date.now() + Math.floor(Math.random() * 1000)}`;
            const newPost = {
                id: Date.now(),
                user: randomUser.name,
                avatar: avatarUrl,
                text: data.text || "Новое сообщение"
            };

            if (this.apiData.blogPosts.length >= 5) {
                this.apiData.blogPosts.shift();
            }
            this.apiData.blogPosts.push(newPost);
        } catch (error) {
            console.error('Ошибка генерации поста:', error);
            const randomUser = this.blogUsers[Math.floor(Math.random() * this.blogUsers.length)];
            this.apiData.blogPosts.push({ 
                id: Date.now(), 
                user: randomUser.name,
                avatar: 'https://via.placeholder.com/50',
                text: "Ошибка при генерации сообщения." 
            });
        } finally {
            document.body.removeChild(placeholder);
            this.draw();
        }
    }

    async deleteBlogPost(id) {
        const placeholder = document.createElement('div');
        placeholder.className = 'placeholder';
        placeholder.innerHTML = 'Удаление сообщения...';
        document.body.appendChild(placeholder);

        try {
            await new Promise(resolve => setTimeout(resolve, 500));
            this.apiData.blogPosts = this.apiData.blogPosts.filter(post => post.id !== id);
        } finally {
            document.body.removeChild(placeholder);
            this.draw();
        }
    }

    startAutoPosting() {
        if (!this.autoPostInterval) {
            this.autoPostInterval = setInterval(() => this.fetchBlogPost(), 8000);
        }
    }

    stopAutoPosting() {
        if (this.autoPostInterval) {
            clearInterval(this.autoPostInterval);
            this.autoPostInterval = null;
        }
    }

    setPage(page) {
        this.currentPage = page;
        if (page === 'photos') this.fetchPhotos();
        if (page === 'weather') this.fetchWeather();
        if (page === 'blog') {
            if (this.apiData.blogPosts.length === 0) {
                this.fetchBlogPost();
            }
            this.startAutoPosting();
        } else {
            this.stopAutoPosting();
        }
        this.draw();
    }

    draw() {
        const nav = `
            <nav class="navigation">
                <button onclick="pageManager.setPage('home')">Главная</button>
                <button onclick="pageManager.setPage('photos')">Фото</button>
                <button onclick="pageManager.setPage('weather')">Погода</button>
                <button onclick="pageManager.setPage('blog')">Блог</button>
            </nav>
        `;

        let content = '';
        if (this.currentPage === 'home') {
            const profileSection = `
                <div class="profile-section">
                    <div class="profile-photo">
                        ${this.profilePhoto ? `<img src="${this.profilePhoto}" alt="Фото профиля">` : '<div class="no-photo">Фото отсутствует</div>'}
                        ${this.isEditMode ? `
                            <div class="photo-controls">
                                <button class="upload-btn" onclick="document.getElementById('photo-upload').click()">Загрузить фото</button>
                                <input type="file" id="photo-upload" accept="image/*" style="display: none;">
                                <button class="generate-btn" onclick="pageManager.generateRandomPhoto()">Сгенерировать фото</button>
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

            content = this.blocks.map(block => {
                if (this.isEditMode) {
                    return `${block.edit()}<button onclick="pageManager.remove('${block._id}')">Удалить</button>`;
                }
                return block.show();
            }).join('');
            document.body.innerHTML = `<div class="container">${nav + profileSection + header + content}</div>`;
        } else if (this.currentPage === 'photos') {
            content = `
                <div class="api-section">
                    <h2>Случайное фото</h2>
                    <div class="photo-container">
                        ${this.apiData.photos ? `
                            <div class="photo-item">
                                <img src="${this.apiData.photos.url}" alt="Случайное фото">
                                <p class="photo-text">Имя: ${this.apiData.photos.name}</p>
                                <p class="photo-text">Возраст: ${this.apiData.photos.age}</p>
                                <p class="photo-text">Местоположение: ${this.apiData.photos.location}</p>
                            </div>
                        ` : 'Фото еще не сгенерировано'}
                    </div>
                    <button onclick="pageManager.fetchPhotos()">Сгенерировать новое</button>
                </div>
            `;
            document.body.innerHTML = `<div class="container">${nav + content}</div>`;
        } else if (this.currentPage === 'weather') {
            content = `
                <div class="api-section">
                    <h2>Погода в ${this.weatherLocation}</h2>
                    <div class="weather-location">
                        <input type="text" id="weather-location-input" value="${this.weatherLocation}" placeholder="Введите город">
                        <button onclick="pageManager.setWeatherLocation(document.getElementById('weather-location-input').value)">Обновить место</button>
                    </div>
                    ${this.apiData.weather ? `
                        <div class="weather-info">
                            <h3>Текущая погода</h3>
                            <div class="weather-details">
                                <div class="weather-temp">${this.apiData.weather.current.temp_c}°C</div>
                                <div class="weather-condition">${this.apiData.weather.current.condition.text}</div>
                                <div>Ощущается как: ${this.apiData.weather.current.feelslike_c}°C</div>
                                <div>Влажность: ${this.apiData.weather.current.humidity}%</div>
                            </div>
                            <img src="https:${this.apiData.weather.current.condition.icon}" alt="Иконка погоды">
                        </div>
                        <h3>Прогноз на 5 дней</h3>
                        <div class="forecast-container" style="display: flex; overflow-x: auto; gap: 10px;">
                            ${this.apiData.weather.forecast.forecastday.map(day => `
                                <div class="forecast-day" style="flex: 0 0 auto; text-align: center;">
                                    <div class="forecast-date">${new Date(day.date).toLocaleDateString('ru-RU', { weekday: 'short', day: 'numeric', month: 'short' })}</div>
                                    <img src="https:${day.day.condition.icon}" alt="Иконка погоды">
                                    <div class="forecast-temp">${day.day.avgtemp_c}°C</div>
                                    <div class="forecast-condition">${day.day.condition.text}</div>
                                </div>
                            `).join('')}
                        </div>
                        <button onclick="pageManager.fetchWeather()">Обновить погоду</button>
                    ` : 'Данные о погоде недоступны'}
                </div>
            `;
            document.body.innerHTML = `<div class="container">${nav + content}</div>`;
        } else if (this.currentPage === 'blog') {
            content = `
                <div class="api-section">
                    <h2>Блог</h2>
                    <button onclick="pageManager.fetchBlogPost()">Добавить сообщение</button>
                    <div class="blog-posts">
                        ${this.apiData.blogPosts.map(post => `
                            <div class="blog-post">
                                <div class="blog-post-header">
                                    <img src="${post.avatar}" alt="${post.user}" class="blog-user-avatar">
                                    <h3>${post.user}</h3>
                                </div>
                                <div class="blog-post-content">
                                    <p>${post.text}</p>
                                </div>
                                <div class="blog-post-actions">
                                    <button onclick="pageManager.deleteBlogPost(${post.id})">Удалить</button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
            document.body.innerHTML = `<div class="container">${nav + content}</div>`;
        }

        if (this.isEditMode && this.currentPage === 'home') {
            const photoUpload = document.getElementById('photo-upload');
            if (photoUpload) photoUpload.addEventListener('change', (e) => this.uploadPhoto(e));

            document.body.addEventListener('change', (e) => {
                const element = e.target.closest('.editable');
                if (element) {
                    const id = element.dataset.id;
                    const data = {
                        title: element.querySelector('.edit-title').value,
                        content: element.querySelector('.edit-content').value
                    };
                    const block = this.blocks.find(b => b._id === id);
                    if (block instanceof ContactBlock) data.phone = element.querySelector('.edit-phone').value;
                    else if (block instanceof ZodiacBlock) data.date = element.querySelector('.edit-date').value;
                    else if (block instanceof SkillsBlock) data.skills = block._skills;
                    this.update(id, data);
                } else if (e.target.id === 'edit-name' || e.target.id === 'edit-description' || e.target.id === 'edit-hobbies') {
                    this.updateProfile({
                        name: document.getElementById('edit-name').value,
                        description: document.getElementById('edit-description').value,
                        hobbies: document.getElementById('edit-hobbies').value
                    });
                }
            });
        }
    }
}

const pageManager = new PageManager();
window.pageManager = pageManager;
pageManager.draw();