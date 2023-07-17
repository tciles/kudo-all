let _intl;

try {
    if (window.chrome !== undefined) {
        _intl = chrome.i18n;
    } else {
        _intl = browser.i18n;
    }
} catch (err) {
    _intl = {
        getMessage: function (messageName, substitutions) {
            if (substitutions) {
                return substitutions;
            }

            return messageName;
        }
    }
}

function getMessage(messageName, substitutions) {
    return _intl.getMessage(messageName, substitutions);
}

function getContainer() {
    let container =  document.querySelector(".feed-header");

    if (!container) {
        container = document.querySelector(".feed-container.tab-content");
        const el = document.createElement("div");
        el.classList.add("feed-header");
        el.style.height = "40px";
        container.prepend(el);
        el.style.display = "flex";
        el.style.justifyContent = "end";
    } else {
        container.style.display = "flex";
        container.style.justifyContent = "space-between";
    }

    return document.querySelector(".feed-header");
}

function findKudosButtons(container) {
    const selector = "button[data-testid='kudos_button'] > svg[data-testid='unfilled_kudos']";

    if (!container) {
        return Array.from(document.querySelectorAll(selector));
    }

    return Array.from(container.querySelectorAll(selector));
}

function createFilter(athleteLink) {
    const href = athleteLink.href
        .replace("https://www.strava.com", "")
        .replace("https://strava.com", "");

    return item => !item.querySelector(`a[href^="${href}"]`);
}

function getKudosButtons() {
    const athleteLink = document.querySelector("#athlete-profile a[href^='/athletes']");

    if (!athleteLink) {
        return findKudosButtons();
    }

    let activities = document.querySelectorAll("div[data-testid='web-feed-entry']");

    if (activities.length < 1) {
        return findKudosButtons();
    }

    activities = Array.from(activities).filter(createFilter(athleteLink));

    if (activities.length < 1) {
        return findKudosButtons();
    }

    return activities.flatMap(findKudosButtons).filter(item => !!item);
}

function createButton() {
    const label = getMessage("kudo_all", "Kudo All");

    const navItem = document.createElement("div");
    navItem.style.display = "flex";

    navItem.innerHTML = `
    <button type="button" class="btn btn-default btn-sm empty">
        <div class="app-icon icon-kudo" style="margin-right: 10px;">${label}</div>
        <div class="ka-progress text-caption1">${label}</div>
    </button>
    `;

    return navItem;
}

function kudoAllHandler(event) {
    event.preventDefault();

    const icons = getKudosButtons();
    const len = icons.length;

    if (len < 1) {
        return;
    }

    for (let i = 0; i < len; i++) {
        const item = icons[i];

        if (!item) {
            continue;
        }

        const parentItem = item.parentElement;

        if (parentItem) {
            parentItem.click();
        }
    }
}

const container = getContainer();

if (container) {


    const button = createButton();
    container.append(button);

    button.addEventListener("click", kudoAllHandler);
}
