(function () {
  'use strict';

  var DAYS = 90;
  var SUMMARY_URL = '/data/summary.json';

  function formatDate(d) {
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
  }

  function toKey(d) {
    return d.getFullYear() + '-' +
      String(d.getMonth() + 1).padStart(2, '0') + '-' +
      String(d.getDate()).padStart(2, '0');
  }

  function getDays() {
    var days = [];
    var today = new Date();
    for (var i = DAYS - 1; i >= 0; i--) {
      var d = new Date(today);
      d.setDate(d.getDate() - i);
      d.setHours(0, 0, 0, 0);
      days.push(d);
    }
    return days;
  }

  function getBarClass(minutesDown) {
    if (minutesDown === -1) return 'no-data';
    if (minutesDown === 0) return 'operational';
    if (minutesDown <= 30) return 'degraded';
    if (minutesDown <= 120) return 'partial-outage';
    return 'major-outage';
  }

  function getStatusText(minutesDown) {
    if (minutesDown === -1) return 'No data';
    if (minutesDown === 0) return 'No downtime';
    if (minutesDown < 60) return minutesDown + ' min downtime';
    var h = Math.floor(minutesDown / 60);
    var m = minutesDown % 60;
    return h + 'h ' + m + 'm downtime';
  }

  function calcUptime(dailyMinutesDown, days) {
    var totalMinutes = days.length * 1440;
    var totalDown = 0;
    for (var i = 0; i < days.length; i++) {
      var key = toKey(days[i]);
      var mins = dailyMinutesDown[key];
      if (mins && mins > 0) totalDown += mins;
    }
    var pct = ((totalMinutes - totalDown) / totalMinutes) * 100;
    return pct.toFixed(2);
  }

  function renderService(site, days, startDate) {
    var el = document.createElement('div');
    el.className = 'uptime-service';

    var dailyDown = site.dailyMinutesDown || {};
    var uptime = calcUptime(dailyDown, days);
    var pctClass = '';
    if (parseFloat(uptime) < 99) pctClass = ' down';
    else if (parseFloat(uptime) < 99.9) pctClass = ' degraded';

    var header = document.createElement('div');
    header.className = 'uptime-service-header';
    header.innerHTML =
      '<span class="uptime-service-name">' + site.name + '</span>' +
      '<span class="uptime-service-pct' + pctClass + '">' + uptime + '% uptime</span>';
    el.appendChild(header);

    var barsContainer = document.createElement('div');
    barsContainer.className = 'uptime-bars';

    for (var i = 0; i < days.length; i++) {
      var key = toKey(days[i]);
      var mins = dailyDown[key];
      var minutesDown = (mins !== undefined && mins !== null) ? mins : -1;

      // If day is before the site started tracking, show no-data
      if (days[i] < startDate) minutesDown = -1;
      // If day is today or after start and no entry, it means 0 downtime
      else if (minutesDown === -1) minutesDown = 0;

      var bar = document.createElement('div');
      bar.className = 'uptime-bar ' + getBarClass(minutesDown);

      var tooltip = document.createElement('div');
      tooltip.className = 'uptime-bar-tooltip';
      tooltip.textContent = formatDate(days[i]) + ' \u2014 ' + getStatusText(minutesDown);
      bar.appendChild(tooltip);

      barsContainer.appendChild(bar);
    }

    el.appendChild(barsContainer);

    var legend = document.createElement('div');
    legend.className = 'uptime-legend';
    legend.innerHTML =
      '<span>' + formatDate(days[0]) + '</span>' +
      '<span>' + DAYS + ' days ago \u2192 Today</span>' +
      '<span>' + formatDate(days[days.length - 1]) + '</span>';
    el.appendChild(legend);

    return el;
  }

  function findStartDate(site) {
    // Use the earliest date in dailyMinutesDown, or fall back to 90 days ago
    var dailyDown = site.dailyMinutesDown || {};
    var keys = Object.keys(dailyDown);
    if (keys.length > 0) {
      keys.sort();
      return new Date(keys[0]);
    }
    // If no downtime data, assume tracking started when the repo was created
    // We'll use 90 days ago minus a buffer — effectively show all green
    var d = new Date();
    d.setDate(d.getDate() - DAYS);
    return d;
  }

  function findInsertionPoint() {
    // Try to insert before the footer, or after main content
    var footer = document.querySelector('footer');
    if (footer && footer.parentNode) {
      var container = document.createElement('div');
      container.id = 'uptime-history';
      footer.parentNode.insertBefore(container, footer);
      return container;
    }
    var main = document.querySelector('main');
    if (main) {
      var container = document.createElement('div');
      container.id = 'uptime-history';
      main.appendChild(container);
      return container;
    }
    var sapper = document.getElementById('sapper');
    if (sapper) {
      var container = document.createElement('div');
      container.id = 'uptime-history';
      sapper.appendChild(container);
      return container;
    }
    return null;
  }

  function init() {
    fetch(SUMMARY_URL)
      .then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json();
      })
      .then(function (sites) {
        var container = document.getElementById('uptime-history') || findInsertionPoint();
        if (!container) return;

        var title = document.createElement('h2');
        title.textContent = 'Uptime History (' + DAYS + ' days)';
        container.appendChild(title);

        var days = getDays();

        for (var i = 0; i < sites.length; i++) {
          var startDate = findStartDate(sites[i]);
          container.appendChild(renderService(sites[i], days, startDate));
        }
      })
      .catch(function (err) {
        console.warn('Uptime bars: could not load summary data', err);
      });
  }

  // Upptime's Sapper app renders async — wait for content to load
  function waitForApp() {
    var maxAttempts = 50;
    var attempts = 0;
    var interval = setInterval(function () {
      attempts++;
      var hasContent = document.querySelector('footer') || document.querySelector('main');
      if (hasContent || attempts >= maxAttempts) {
        clearInterval(interval);
        init();
      }
    }, 200);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', waitForApp);
  } else {
    waitForApp();
  }
})();
