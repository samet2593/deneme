var chart;

// ApexCharts grafiği render etme
var options = {
    chart: {ffffffffffffffff
        type: 'line',
        height: 250,
        width: '100%',
    },
    series: [{
        name: 'Satışlar',
        data: [30, 40, 35, 50, 49, 60, 70, 91]
    }],
    xaxis: {
        categories: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos']
    }
};

// Temalar
const themes = {
    light: {
        chart: {
            background: '#ffffff',
            foreColor: '#333333'
        },
        colors: ['#FF4560', '#008FFB', '#00E396', '#775DD0', '#FEB019']
    },
    dark: {
        chart: {
            background: '#333333',
            foreColor: '#ffffff'
        },
        colors: ['#00E396', '#008FFB', '#FF4560', '#775DD0', '#FEB019']
    }
};

// Grafiği oluştur ve render et
chart = new ApexCharts(document.querySelector("#chart"), options);
chart.render();

// Tema değiştirme fonksiyonu
function changeTheme(themeName) {
    const theme = themes[themeName];

    // Tema seçeneklerini güncelle
    chart.updateOptions({
        chart: theme.chart,
        colors: theme.colors
    });
}

// Arka plan ve metin rengi ayarları
document.getElementById('chart-bg-color').addEventListener('input', function() {
    chart.updateOptions({
        chart: {
            background: this.value
        }
    });
});

document.getElementById('chart-text-color').addEventListener('input', function() {
    chart.updateOptions({
        dataLabels: {
            style: {
                colors: [this.value]
            }
        }
    });
});

// Chart seçildiğinde grafik türünü güncelleyen fonksiyon
function selectChartType(type) {
    document.getElementById("chart-sidebar").style.display = 'none';
    document.getElementById("icon-sidebar").style.display = 'flex';
    document.getElementById("settings-sidebar").style.width = '250px';
    document.getElementById("back-button").style.display = 'block';
    document.querySelector(".icon[data-section='data']").classList.add("selected");
    showSettings('data');

    chart.updateOptions({
        chart: {
            type: type
        }
    });
}

// İlgili ayarları göstermek için ikonlara tıklama fonksiyonu
function showSettings(section) {
    var sections = document.querySelectorAll('.sidebar-content');
    sections.forEach(function(s) {
        s.style.display = 'none';
    });
    document.getElementById(section).style.display = 'block';

    var icons = document.querySelectorAll('.icon');
    icons.forEach(function(icon) {
        icon.classList.remove("selected");
    });
    document.querySelector(".icon[data-section='" + section + "']").classList.add("selected");
}

// Başlangıç görünümüne geri dön
function resetView() {
    document.getElementById("chart-sidebar").style.display = 'block';
    document.getElementById("icon-sidebar").style.display = 'none';
    document.getElementById("settings-sidebar").style.width = '0';
    document.getElementById("back-button").style.display = 'none';

    chart.updateOptions({
        chart: {
            type: 'line'
        }
    });
}

// İkonlara tıklama olayını ekle
document.querySelectorAll('.icon').forEach(icon => {
    icon.addEventListener('click', () => {
        document.querySelectorAll('.icon').forEach(i => i.classList.remove('selected'));
        icon.classList.add('selected');
        document.getElementById('settings-sidebar').style.width = '300px';
        showSettings(icon.getAttribute('data-section'));
    });
});

// Gündüz ve gece modları etkinleştirme
document.getElementById('day-mode').addEventListener('click', () => {
    changeTheme('light');
});
document.getElementById('night-mode').addEventListener('click', () => {
    changeTheme('dark');
});

// Palet seçeneklerini uygula
const selectedTheme = document.getElementById('selected-theme');
const paletteOptions = document.querySelectorAll('.palette');
paletteOptions.forEach(palette => {
    palette.addEventListener('click', function() {
        const paletteName = this.getAttribute('data-palette');
        selectedTheme.textContent = paletteName;
        applyTheme(paletteName);
    });
});

function applyTheme(paletteName) {
    const paletteColors = {
        palette1: ['#008FFB', '#00E396', '#FEB019', '#FF4560'],
        palette2: ['#775DD0', '#00E396', '#008FFB', '#FEB019'],
        palette3: ['#D4526E', '#546E7A', '#26A69A', '#D32F2F'],
        palette4: ['#4ECDC4', '#556270', '#C7F464', '#FF6B6B'],
        palette5: ['#FF4560', '#00E396', '#775DD0', '#FEB019']
    };
    chart.updateOptions({
        colors: paletteColors[paletteName]
    });
}

// Gölge ayarlarını güncelle
const enableShadow = document.getElementById('enable-shadow');
const shadowBlur = document.getElementById('shadow-blur');
const shadowOffsetX = document.getElementById('shadow-offset-x');
const shadowOffsetY = document.getElementById('shadow-offset-y');
const shadowColor = document.getElementById('shadow-color');
const shadowOpacity = document.getElementById('shadow-opacity');

enableShadow.addEventListener('change', function() {
    chart.updateOptions({
        chart: {
            dropShadow: {
                enabled: this.checked,
                top: parseInt(shadowOffsetY.value),
                left: parseInt(shadowOffsetX.value),
                blur: parseInt(shadowBlur.value),
                opacity: parseFloat(shadowOpacity.value),
                color: shadowColor.value
            }
        }
    });
});

shadowBlur.addEventListener('input', function() {
    chart.updateOptions({
        chart: {
            dropShadow: {
                enabled: enableShadow.checked,
                blur: parseInt(this.value)
            }
        }
    });
});

shadowOffsetX.addEventListener('input', function() {
    chart.updateOptions({
        chart: {
            dropShadow: {
                enabled: enableShadow.checked,
                left: parseInt(this.value)
            }
        }
    });
});

shadowOffsetY.addEventListener('input', function() {
    chart.updateOptions({
        chart: {
            dropShadow: {
                enabled: enableShadow.checked,
                top: parseInt(this.value)
            }
        }
    });
});

shadowColor.addEventListener('input', function() {
    chart.updateOptions({
        chart: {
            dropShadow: {
                enabled: enableShadow.checked,
                color: this.value
            }
        }
    });
});

shadowOpacity.addEventListener('input', function() {
    chart.updateOptions({
        chart: {
            dropShadow: {
                enabled: enableShadow.checked,
                opacity: parseFloat(this.value)
            }
        }
    });
});

// Değer artırma ve azaltma işlemleri
function updateValue(targetId, increment) {
    const target = document.getElementById(targetId);
    let currentValue = parseInt(target.value);
    currentValue = increment ? currentValue + 1 : currentValue - 1;
    if (currentValue >= 0 && currentValue <= 100) {
        target.value = currentValue;
        document.getElementById(`${targetId}-value`).textContent = currentValue;
    }
}

document.querySelectorAll('.increment').forEach(button => {
    button.addEventListener('click', function() {
        updateValue(this.dataset.target, true);
    });
});

document.querySelectorAll('.decrement').forEach(button => {
    button.addEventListener('click', function() {
        updateValue(this.dataset.target, false);
    });
});

function toggleAccordion(element) {
    const content = element.nextElementSibling; // İçerik

    if (content.style.maxHeight) {
        // İçerik açıksa, kapat
        content.style.maxHeight = null;
        content.style.padding = "0 18px";
    } else {
        // İçerik kapalıysa, aç
        content.style.maxHeight = content.scrollHeight + "px";
        content.style.padding = "15px 18px"; // Açıldığında padding ekle
    }

    // Scrollable özelliği: İçerik yüksekliği belli bir değeri aşarsa scrollbar ekle
    if (content.scrollHeight > 400) {
        content.classList.add('scrollable-content');
    } else {
        content.classList.remove('scrollable-content');
    }
}
