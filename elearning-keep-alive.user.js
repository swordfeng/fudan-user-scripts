// ==UserScript==
// @name         Elearning Keep-Alive
// @namespace    https://swordfeng.xyz/
// @version      0.1.1
// @description  Keep E-Learning Site alive!
// @author       swordfeng
// @match        http://elearning.fudan.edu.cn/*
// @grant        none
// ==/UserScript==
(function() {
    'use strict';
    setInterval(keep_session_alive, 300000);
})();
