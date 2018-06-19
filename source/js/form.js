(function () {
    var me = {};
    var form = document.querySelector('.form-container');
    var closeButton = null;

    function onClose() {
        me.close();
        closeButton.removeEventListener('click', onClose);
        removeEventListener('keydown', isEsc);
    }
    
    function isEsc(e) {
        if (e.keyCode === 27) {
            onClose();
        } else {
            return false;
        }
    }

    me.open = function() {
        form.classList.remove('is-hidden');

        closeButton = document.querySelector('.form__close-button');
        closeButton.addEventListener('click', onClose);
        addEventListener('keydown', isEsc);
    };

    me.close = function() {
        form.classList.add('is-hidden');
    };

    me.isValid = function() {
        if (!me.isAllCompleted(document.querySelectorAll('[data-valid="required"]'))) {
            console.log("заполните все необходимые поля");
            return false;
        } else if (!MY.validation.isEmail(document.querySelector('[data-email]').value)) {
            console.log("неверный email");
            return false;
        } else if (!MY.validation.isNumber(document.querySelector('[data-number]').value)) {
            console.log("неверный номер");
            return false;
        }

        return true;
    };

    me.isAllCompleted = function (data) {
        var result = true;
        for (var i = 0; i < data.length; i++) {
            if (!MY.validation.isNotEmpty(data[i].value)) {
                result = false;
                break;
            }
        }

        return result;
    };

    MY.form = me;
}());