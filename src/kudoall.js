let _intl;

try {
    if (window.chrome !== undefined) {
        _intl = chrome.i18n;
    } else {
        _intl = browser.i18n;
    }
} catch (err) {
    console.log("Plugin Kudo All", err);

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
    return document.querySelector(".user-nav")
}

function getKudosButtons() {
    return document.querySelectorAll("button[data-testid='kudos_button'] > svg[data-testid='unfilled_kudos']");
}

function createNavItem() {
    const label = getMessage("kudo_all", "Kudo All");

    const navItem = document.createElement("li");
    navItem.classList.add("nav-item");

    navItem.innerHTML = `
    <button type="button" class="btn btn-unstyled empty">
        <div class="app-icon-wrapper">
            <div class="app-icon icon-kudo">${label}</div>
            <div class="ka-progress text-caption1">${label}</div>
        </div>
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

window.onload = function () {
    const container = getContainer();

    if (!container) {
        return;
    }

    const navItem = createNavItem();
    container.prepend(navItem);

    navItem.addEventListener("click", kudoAllHandler);
}