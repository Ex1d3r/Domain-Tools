# 🚀 Domain Generator & Availability Checker

<div align="center">

![Version](https://img.shields.io/badge/version-1.2.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

**✨ Generate awesome domain names and check their availability instantly! ✨**

_[English](#-english-version) | [Русский](#-русская-версия)_

</div>

## 🌎 ENGLISH VERSION

### 🔥 Features

- 🚀 **Mass Generation**: Create hundreds of domain ideas from a single keyword
- 🌐 **Custom TLDs**: Specify which domain zones you want to use (NEW!)
- 🔍 **Availability Check**: Find out which domains are available to register
- 💾 **Auto-Save**: Results are saved to files for easy reference

### ⚙️ Installation

```bash
npm install
```

### 📚 Usage

#### Generating Domain Ideas

```bash
# Basic usage
node domainTool.js generate <keyword>

# Advanced usage with custom TLDs
node domainTool.js generate <keyword> <tlds>
```

This will generate domain ideas based on the provided keyword and save them to a file named `<keyword>_domains.txt`.

**TLDs parameter**: Comma-separated list of TLDs without dots (e.g., `com,net,org,io,app`)

#### Checking Domain Availability

```bash
node domainTool.js check-available <domainListFile>
```

This will check the availability of domains listed in the provided file using WHOIS.

#### Help

```bash
node domainTool.js --help
```

### 🔄 How It Works

1. **Domain Generation**: The tool combines your keyword with various prefixes, suffixes, and TLDs to create a comprehensive list of domain ideas.

2. **Availability Checking**: It uses WHOIS to check if each domain is already registered. Results are saved in two separate files: one for available domains and one for already registered domains.

### 💡 Examples

```bash
# Generate domain ideas for "coffee" with default TLDs
node domainTool.js generate coffee

# Generate domain ideas for "coffee" with specific TLDs
node domainTool.js generate coffee com,io,app,dev

# Check availability of generated domains
node domainTool.js check-available coffee_domains.txt
```

### ⚠️ Note on WHOIS Rate Limits

Be aware that many WHOIS servers have rate limits. The tool processes domains in small batches with delays between requests to avoid triggering these limits.

---

## 🌐 РУССКАЯ ВЕРСИЯ

### 🔥 Функции

- 🚀 **Массовая генерация**: Создавайте сотни идей доменов из одного ключевого слова
- 🌐 **Пользовательские TLD**: Указывайте, какие доменные зоны вы хотите использовать (НОВОЕ!)
- 🔍 **Проверка доступности**: Узнайте, какие домены доступны для регистрации
- 💾 **Автосохранение**: Результаты сохраняются в файлы для удобного использования

### ⚙️ Установка

```bash
npm install
```

### 📚 Использование

#### Генерация идей доменов

```bash
# Базовое использование
node domainTool.js generate <ключевое_слово>

# Расширенное использование с пользовательскими TLD
node domainTool.js generate <ключевое_слово> <зоны>
```

Это сгенерирует идеи доменов на основе предоставленного ключевого слова и сохранит их в файл с именем `<ключевое_слово>_domains.txt`.

**Параметр зон**: Список TLD через запятую без точек (например, `com,net,org,ru,рф`)

#### Проверка доступности доменов

```bash
node domainTool.js check-available <файл_со_списком_доменов>
```

Это проверит доступность доменов, перечисленных в предоставленном файле, используя WHOIS.

#### Справка

```bash
node domainTool.js --help
```

### 🔄 Как это работает

1. **Генерация доменов**: Инструмент комбинирует ваше ключевое слово с различными префиксами, суффиксами и TLD для создания полного списка идей доменов.

2. **Проверка доступности**: Использует WHOIS для проверки, зарегистрирован ли уже каждый домен. Результаты сохраняются в двух отдельных файлах: один для доступных доменов и один для уже зарегистрированных доменов.

### 💡 Примеры

```bash
# Генерация идей доменов для "coffee" с TLD по умолчанию
node domainTool.js generate coffee

# Генерация идей доменов для "coffee" с указанными TLD
node domainTool.js generate coffee com,io,app,ru,рф

# Проверка доступности сгенерированных доменов
node domainTool.js check-available coffee_domains.txt
```

### ⚠️ Примечание о лимитах WHOIS

Имейте в виду, что многие серверы WHOIS имеют ограничения по частоте запросов. Инструмент обрабатывает домены небольшими партиями с задержками между запросами, чтобы избежать срабатывания этих ограничений.

---

<div align="center">

✨ **Powered by Exider** ✨

</div>
