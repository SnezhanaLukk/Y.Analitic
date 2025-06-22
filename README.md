React + TypeScript + Vite


### Краткое описание

Интерфейс для анализа данных по галактическим кредитам, позволяющий:

- Загружать и обрабатывать таблицы с показателями галактических кредитов по разным рассам (humans, blobs, monsters)

- Генерировать тестовые наборы данных

- Отслеживать историю операций

- Визуализировать результаты аналитики в реальном времени


### Технологический стек:  

- State Management: Zustand (используется в компонентах и сервисных утилитах)

- Роутинг: react-router-dom (настроен в App.tsx)

- Стили: CSS Modules (все компоненты имеют собственные стили)

- API: Fetch (реализация в services/uploadFile.ts services/generateFile.ts)

- Локальное хранилище: LocalStorage (утилиты в services/utils/)

- Модальные окна: React Portals (реализация в components/Modal/)


### Запуск проекта
1. **Установите зависимости:**
```bash
npm install
```

2. **Запустите dev-сервер:**
```bash
npm run dev
```

3. **Соберите production-версию:**
```bash
npm run build
```
4. **Бэкендная часть расположена в отдельном репозитории:**
https://github.com/etozhenerk/shri2025-back

``` bash
git clone https://github.com/etozhenerk/shri2025-back.git
```
**Установка зависимостей**
```bash
npm install
```
**Запуск сервера**
```bash
npm start
```
Сервер будет доступен по адресу:
http://localhost:3000



###  Функционал приложения

  **Главная** 
  Drag&Drop загрузка, закрузка по кнопке, индикатор процесса, просмотр аналитики, сброс состояния

  **Генератор**
  Создание тестовых таблиц, автоматическое скачивание, обработка ошибок

  **История**
  Просмотр операций, удаление записей, модальный окно для просмотра деталей успешных обработок

###  Инструкция по настройке параметров бэкенда

	В проекте используются два ключевых сервисных файла для работы с бэкендом:

1. generateFile.ts (Генерация тестовых данных)
    ```
	const params = new URLSearchParams({
        size: '0.1', 				// Размер отчета (строки)
        withErrors: 'on',			// Включить ошибки в данные
        maxSpend: '1000'			// Макс. трата за день
    });
	``` 
2. uploadFile.ts (Загрузка данных)

	```
		const params = new URLSearchParams({ rows: '100000' });		// Размер порции обработки
	```



###  Архитектура

src/

├── components/
│   ├── FileUploadContext/			# Контекст для управления состоянием загрузки
│   │   └── FileUploadContext.tsx
│   ├── FileUploader/			# Компонент загрузки файлов (drag&drop)
│   │   ├── FileUploader.module.css
│   │   └── FileUploader.tsx
│   ├── Generator/			# Кнопка генерации тестовых данных
│   │   ├── generator.module.css
│   │   └── Generator.tsx
│   ├── Header/			# Шапка проекта и навигационное меню
│   │   ├── header.module.css
│   │   └── Header.tsx
│   ├── Highlight/			# Визуализация аналитики
│   │   ├── highlight.module.css
│   │   └── Highlight.tsx
│   ├── HistoryList/			# Список истории операций
│   │   ├── HistoryItem/			# Элемент истории
│   │   │   ├── historyItem.module.css
│   │   │   └── HistoryItem.tsx
│   │   ├── historyList.module.css
│   │   └── HistoryList.tsx
│   ├── Modal/			# Модальное окно
│   │   ├── modal.module.css
│   │   └── Modal.tsx
│   ├── ReportCell/				# Компонент отчёта (визуализация аналитики)
│   │   ├── reportCell.module.css
│   │   └── ReportCell.tsx
│   └── Upload/				# Кнопка по отправке данных на аналитику
│		    ├── upload.module.css
│   	  └── Upload.tsx
├── image/           # Папка с изображениями
├── pages/
│   ├── GeneratorPage/			# Страница генерации тестовых данных
│   │   └── GeneratorPage.tsx
│   ├── History/			# Страница истории операций
│   │   └── History.tsx
│   ├──MainPage/			# Главная страница (загрузка данных)
│   │   └── MainPage.tsx
│   └── Page404/			# Страница ошибки (Страница не найдена)
│		    ├── Page404.module.css
│   	  └── Page404.tsx
├── services/
│   ├── utils/
│   │   ├── historyDataMutation.ts		# Трансформация данных истории
│   │   ├── mutationData.ts				# Обработка аналитических данных
│   │   ├── saveToLocalStorage.ts		# Работа с LocalStorage
│   ├── generateFile.ts				# Генерация тестовых данных
│   └── uploadFile.ts				# Логика загрузки файлов
├── store/
│   └── slice.ts				# Стейт менедер Zustand
├── types/
│   └── HistoryTypes.tsx		# Типы TypeScript для работы с историей
│
├── App.css
├── App.tsx
├── index.css
├── main.tsx
└── vite-env.d.ts
