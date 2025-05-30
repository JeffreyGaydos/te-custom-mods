te_GraphicBlur();

function te_CreateWarningLabel() {
    var warningLabel = document.createElement("P");
    warningLabel.style.overflow = "visible";
    warningLabel.style.height = 0;
    warningLabel.style.marginInline = "auto";
    warningLabel.style.position = "relative";
    warningLabel.style.textAlign = "center";
    warningLabel.style.left = "0px";
    warningLabel.style.top = "20px";
    warningLabel.style.zIndex = 10;
    warningLabel.style.color = "white";
    warningLabel.style.pointerEvents = "none";
    warningLabel.innerText = "Warning: Graphic Content. Click to Toggle";
    warningLabel.style.fontWeight = 600;
    warningLabel.style.fontFamily = "sans-serif";
    warningLabel.style.textShadow = "0 0 6px black";
    warningLabel.classList.add("graphic-content-label");
    return warningLabel;
}

function te_GraphicBlur() {
    const blurClass = "graphic-content";
    var blurContent = document.querySelectorAll(`.${blurClass}`);

    blurContent.forEach(b => {
        var warningLabelInstance = te_CreateWarningLabel();
        warningLabelInstance.style.width = `${b.clientWidth}px`;
        b.parentElement.prepend(warningLabelInstance);
        b.addEventListener("click", (e) => {
            if(e.target.classList.contains(blurClass)) {
                e.target.classList.remove(blurClass);
                warningLabelInstance.style.color = "rgba(0,0,0,0)";
                warningLabelInstance.style.textShadow = "none";
            } else {
                e.target.classList.add(blurClass);
                warningLabelInstance.style.color = "white";
                warningLabelInstance.style.textShadow = "0 0 6px black";
            }
        });
    });
}
