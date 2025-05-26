te_GraphicBlur();

function te_CreateWarningLabel() {
    var warningLabel = document.createElement("P");
    warningLabel.style.overflow = "visible";
    warningLabel.style.height = 0;
    warningLabel.style.position = "relative";
    warningLabel.style.textAlign = "center";
    warningLabel.style.left = "0px";
    warningLabel.style.top = "20px";
    warningLabel.style.zIndex = 10;
    warningLabel.style.color = "white";
    warningLabel.innerText = "Warning: Graphic Content. Click to Toggle";
    warningLabel.style.fontWeight = 600;
    warningLabel.style.fontFamily = "sans-serif";
    warningLabel.classList.add("graphic-content-label");
    return warningLabel;
}

function te_GraphicBlur() {
    const blurClass = "graphic-content";
    var blurContent = document.querySelectorAll(`.${blurClass}`);

    blurContent.forEach(b => {
        var warningLabelInstance = te_CreateWarningLabel();
        warningLabelInstance.style.width = `${b.clientWidth}px`;
        warningLabelInstance.addEventListener("click", (e) => {
            if(b.classList.contains(blurClass)) {
                b.classList.remove(blurClass);
                e.target.style.color = "rgba(0,0,0,0)";
            } else {
                b.classList.add(blurClass);
                e.target.style.color = "white";
            }
        })
        b.parentElement.prepend(warningLabelInstance);
        b.addEventListener("click", (e) => {
            if(e.target.classList.contains(blurClass)) {
                e.target.classList.remove(blurClass);
                warningLabelInstance.style.color = "rgba(0,0,0,0)";
            } else {
                e.target.classList.add(blurClass);
                warningLabelInstance.style.color = "white";
            }
        });
    });
}
