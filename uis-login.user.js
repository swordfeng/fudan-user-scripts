// ==UserScript==
// @name         Fudan UIS Login
// @namespace    https://swordfeng.xyz/
// @version      0.2.2
// @description  Save password and auto login! Portal login page is redirected to UIS login.
// @author       swordfeng
// @match        *://*.fudan.edu.cn/*
// @grant        none
// ==/UserScript==

function loginPage() {
    'use strict';

    let userinput = document.getElementById('IDToken1');
    let passinput = document.getElementById('IDToken2');

    // append 'save password' checkbox
    let textstyle = 'font-size:14px;color:#11295C;font-family:serif;font-weight:700;';
    let tableunit = passinput.parentElement.parentElement.nextElementSibling.children[0];
    tableunit.align = 'center';
    tableunit.innerHTML = `<input type="checkbox" id="save_password"><label for="save_password" style="${textstyle}">保存密码</label>`;
    tableunit.innerHTML += '&nbsp;';
    tableunit.innerHTML += `<input type="checkbox" id="auto_login"><label for="auto_login" style="${textstyle}">自动登录</label>`;

    let savepassinput = document.getElementById('save_password');
    let autologininput = document.getElementById('auto_login');

    let loginbutton = Array.prototype.filter.call(document.getElementsByTagName('img'), x => x.src.match(/login/))[0];

    let config = loadConfig();
    if (config.savePassword) {
        savepassinput.checked = true;
        userinput.value = config.user;
        passinput.value = config.password;
        if (config.autoLogin) {
            autologininput.checked = true;
            loginbutton.click();
        }
    }

    // save config when unload
    window.addEventListener('beforeunload', function () {
        config.savePassword = savepassinput.checked;
        config.autoLogin = autologininput.checked;
        if (config.savePassword) {
            config.user = userinput.value;
            config.password = passinput.value;
        } else {
            config.user = '';
            config.password = '';
        }
        saveConfig(config);
    });
}

function logoutPage() {
    let config = loadConfig();
    config.autoLogin = false;
    saveConfig(config);
}

function loginPortal() {
    // append div
    document.getElementById('password').outerHTML += '<div id="utilbox"></div>';
    
    let userinput = document.getElementById('username');
    let passinput = document.getElementById('password');

    // append 'save password' checkbox
    let textstyle = 'font-size:14px;color:#666666;font-family:serif;font-weight:700;';
    let tableunit = document.getElementById('utilbox');
    tableunit.align = 'center';
    tableunit.innerHTML = `<input type="checkbox" id="save_password"><label for="save_password" style="${textstyle}">保存密码</label>`;
    tableunit.innerHTML += '&nbsp;';
    tableunit.innerHTML += `<input type="checkbox" id="auto_login"><label for="auto_login" style="${textstyle}">自动登录</label>`;

    let savepassinput = document.getElementById('save_password');
    let autologininput = document.getElementById('auto_login');

    let loginbutton = document.getElementsByClassName('IDCheckLoginBtn')[0];
    
    let config = loadConfig();
    if (config.savePassword) {
        savepassinput.checked = true;
        userinput.value = config.user;
        passinput.value = config.password;
        if (config.autoLogin) {
            autologininput.checked = true;
            if (document.getElementById('cpatchaDiv').innerHTML.trim() === '') {
                loginbutton.click();
            }
        }
    }

    // save config when unload
    window.addEventListener('beforeunload', function () {
        config.savePassword = savepassinput.checked;
        config.autoLogin = autologininput.checked;
        if (config.savePassword) {
            config.user = userinput.value;
            config.password = passinput.value;
        } else {
            config.user = '';
            config.password = '';
        }
        saveConfig(config);
    });
}

function loadConfig() {
    // load config
    let config = localStorage.getItem('swordfeng.xyz/UISLogin');
    try {
        config = JSON.parse(config);
        if (typeof config !== 'object' || config === null) throw Error();
    } catch (err) {
        config = {
            savePassword: false,
            autoLogin: false,
            user: '',
            password: ''
        };
    }
    return config;
}

function saveConfig(config) {
    localStorage.setItem('swordfeng.xyz/UISLogin', JSON.stringify(config));
}

(function () {
    const loginpath = /uis\d.fudan.edu.cn\/amserver\/UI\/Login/;
    const logoutpath = /uis\d.fudan.edu.cn\/amserver\/UI\/Logout/;
    const loginportalpath = 'uis.fudan.edu.cn/authserver/login';
    let path = location.hostname + location.pathname;
    if (path.match(loginpath)) loginPage();
    else if (path.match(logoutpath)) logoutPage();
    else if (path.match(loginportalpath)) loginPortal();
})();
