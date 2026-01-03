function tec_placeCommissionBlurb() {
    if(document.querySelector('a[href*="https://amzn.to"], a[href*="&tag=tankencyclope-20"]')) {
        if(document.querySelector('span.button a[href*="https://amzn.to"], span.button a[href*="&tag=tankencyclope-20"]')) {
            //a <span> with a button class is always the old styling from david. There are usually not any links in the sources section, so let's put it at the bottom of the article since that's where the massive amazon book ads are
            document.querySelector(".entry-content, .main-raised").classList.add("tec-commission-blurb");
            document.querySelector(".entry-content, .main-raised").classList.add("tec-commission-skinny");
        } else {
            const sourceHeader = tec_find_source_header();
            tec_tag_source_section(sourceHeader);
        }
    }
}

function tec_find_source_header() {
    const validHeaders = ["Sources", "source", "Sources:"];
    const validHeaderContains = ["Links and references", "Links and reference", "Link and references", "Link and reference"];
    var result = [];
    document.querySelectorAll(".entry-content h3:not(#tec_indexBox), .entry-content h2:not(#tec_indexBox), .main-raised h3:not(#toc), .main-raised h2:not(#toc)").forEach(n => {
        for(var i = 0; i < validHeaders.length; i++) {
            if(n.textContent.trim().toUpperCase() == validHeaders[i].toUpperCase()) {
                result.push(n);
                return;
            }
        }
        for(var i = 0; i < validHeaderContains.length; i++) {
            if(n.textContent.trim().toUpperCase().includes(validHeaderContains[i].toUpperCase())) {
                result.push(n);
                return;
            }
        }
    });
    return result?.length >= 1 ? result[0] : undefined;
}

function tec_tag_source_section(sourceNode) {
    let addedBlurb = false;
    if(sourceNode) {
        //New theme behavior
        if(sourceNode.parentElement.tagName == 'SECTION') {
            sourceNode.parentElement.classList.add("tec-commission-blurb");
            addedBlurb = true;
            return;
        }
        //Original plugin behavior
        const nextElement = sourceNode.nextElementSibling;
        switch(nextElement.tagName) {
            case 'P':
                if(nextElement.firstChild.tagName == "A") {
                    nextElement.classList.add("tec-commission-blurb");
                    addedBlurb = true;
                }
                break;
            case 'OL':
            case 'UL':
                nextElement.classList.add("tec-commission-blurb");
                addedBlurb = true;
            default:
                break;
        }
    }
    if(!addedBlurb) {
        document.querySelector(".entry-content, .main-raised").classList.add("tec-commission-blurb");
        document.querySelector(".entry-content, .main-raised").classList.add("tec-commission-skinny");
    }
}

tec_placeCommissionBlurb();