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
        container = document.querySelector(".feed-ui").parentElement.querySelector('form');
        container.style.justifyContent = "space-between";
        container.style.maxWidth = "100%";

        const el = document.createElement("div");
        el.classList.add("feed-header");
        el.style.height = "40px";
        container.append(el);
        el.style.display = "flex";
        el.style.justifyContent = "end";
    } else {
        container.style.display = "flex";
        container.style.justifyContent = "space-between";
    }

    return document.querySelector(".feed-header");
}

function createButton() {
    const label = getMessage("kudo_all", "Kudo All");

    const navItem = document.createElement("div");
    navItem.style.display = "flex";

    const style = `
    margin-top: 0;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    max-width: 200px;
    float: right;
`;

    navItem.innerHTML = `
    <button type="button" class="btn btn-default btn-sm empty" style="${style}">
        <div class="app-icon icon-kudo" style="margin-right: 10px;">${label}</div>
        <div class="ka-progress text-caption1">${label}</div>
    </button>
    `;

    navItem.addEventListener("click", kudoAllHandler);

    return navItem;
}

function kudoAllHandler(event) {
    event.preventDefault();

    const athleteId = Number.parseInt(document.querySelector("[data-testid='avatar-wrapper']").href.split('/').pop(), 10);

    Array.from(document.querySelectorAll("[data-testid='web-feed-entry']")).forEach((entry) => {
        const link = entry.querySelector("a[data-testid='owners-name']");
        let feedAthleteId = -1;

        if (link && link.href) {
            feedAthleteId = Number.parseInt(link.href.split("/").pop(), 10);
        }

        // My own activities
        if (feedAthleteId === athleteId) {
            return;
        }

        const btn = entry.querySelector("[data-testid='kudos_button']");

        if (!btn) {
            return;
        }

        const svg = btn.querySelector("svg[data-testid='unfilled_kudos']");

        if (!svg) {
            return;
        }

        btn.click();
    });
}

window.onload = function () {
    setTimeout(() => {
        const container = getContainer();

        if (container) {
            container.append(createButton());
        }
    }, 500)
}
