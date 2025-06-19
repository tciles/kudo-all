function getContainer() {
    let container =  document.querySelector(".feed-header");

    if (!container) {
        let stravaContainer = document.querySelector(".feed-ui");

        if (null === stravaContainer) {
            stravaContainer = document.querySelector(".feature-feed")
        }

        container = stravaContainer.parentElement.querySelector('form');
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
    const label = "Kudo All";

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

    const athleteId = Number.parseInt(document.querySelector("[data-testid='avatar-wrapper']").closest("a").href.split('/').pop(), 10);

    Array.from(document.querySelectorAll("[data-testid='web-feed-entry']")).forEach((entry) => {
        Array.from(entry.querySelectorAll("[data-testid='entry-header']")).forEach((entryHeader) => {
            const activity = entryHeader.parentElement;

            if (!activity) {
                return;
            }

            Array.from(activity.querySelectorAll("a[data-testid='owners-name']")).forEach((link) => {
                let feedAthleteId = -1;
    
                if (link && link.href) {
                    feedAthleteId = Number.parseInt(link.href.split("/").pop(), 10);
                }
        
                // My own activities
                if (feedAthleteId === athleteId) {
                    return;
                }
        
                const btn = activity.querySelector("[data-testid='kudos_button']");
        
                if (!btn) {
                    return;
                }
        
                const svg = btn.querySelector("svg[data-testid='unfilled_kudos']");
        
                if (!svg) {
                    return;
                }
        
                btn.click();
            });
        });
    });
}

setTimeout(() => {
    const container = getContainer();

    if (container) {
        container.append(createButton());
    }
}, 1000);
