let total = 0;

function addButton(labelValue, inputValue) {
    if (!labelValue) {
        labelValue = $("#labelInput").val().trim();
    }

    if (!inputValue) {
        inputValue = parseFloat($("#numberInput").val());
    } else {
        inputValue = parseFloat(inputValue);
    }

    if (isNaN(inputValue) || !labelValue) {
        alert("有効な数字とラベルを入力してください。");
        return;
    }

    const $form = $(`<div class="form-floating"></div>`);
    const $btnGroup = $(`<div class="btn-group m-2" role="group"></div>`);
    const $label = $(`<span class="btn btn-light">${labelValue}</span>`);
    const $btn = $(`<button class="btn btn-secondary">${inputValue}</button>`);
    
    $btn.click(() => {
        total += inputValue;
        $("#total").text(total);
        updateCookies();
    });

    const $deleteBtn = $('<button class="btn btn-danger ml-2">削除</button>');
    $deleteBtn.click(() => {
        $form.remove();
        updateCookies();
    });

    $btnGroup.append($label).append($btn).append($deleteBtn);
    $form.append($btnGroup);
    $("#buttonsArea").append($form);
    
    $("#numberInput").val("");
    $("#labelInput").val("");
    updateCookies();
}

function clearTotal() {
    total = 0;
    $("#total").text(total);
    updateCookies();
}

function updateCookies() {
    Cookies.set('total', total);

    const buttonData = [];
    $("#buttonsArea .btn-group").each(function() {
        const label = $(this).find(".btn-light").text();
        const value = parseFloat($(this).find(".btn-secondary").text());
        buttonData.push({ label, value });
    });

    Cookies.set('buttons', JSON.stringify(buttonData));
}

function initButtons() {
    // 初期値のボタンを設定
    addButton("5等", 200);
    addButton("4等", 1000);
    addButton("3等", 10000);
    addButton("2等", 50000);
    addButton("1等", 1000000);
}

$(document).ready(() => {
    const savedTotal = parseFloat(Cookies.get('total'));
    if (!isNaN(savedTotal)) {
        total = savedTotal;
        $("#total").text(total);
    }

    const savedButtons = Cookies.get('buttons');
    if (savedButtons) {
        const buttonDataArray = JSON.parse(savedButtons);
        for (let buttonData of buttonDataArray) {
            addButton(buttonData.label, buttonData.value);
        }
    } else {
        initButtons();
    }
});
