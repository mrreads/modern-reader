document.querySelector('#titleBar > #titleBack').addEventListener('click', () => {
    window.location = './index.html';
});

const settingButton = document.querySelector('#viewSetting');
const contentElem = document.querySelector('#viewer .content');

settingButton.addEventListener('click', () => {
    document.querySelector('#viewer .settings').classList.toggle('hide');
});

document.querySelector('.padding input').addEventListener('input', () => {
    currentSettings = require('./data/setting.json');
    currentSettings.padding = `${document.querySelector('.padding input').value}`;
    fs.writeFileSync(dataSettingPath, JSON.stringify(currentSettings));
    updateViewer();
});

document.querySelector('.font-size input').addEventListener('input', () => {
    currentSettings = require('./data/setting.json');
    currentSettings.fontSize = `${document.querySelector('.font-size input').value}`;
    fs.writeFileSync(dataSettingPath, JSON.stringify(currentSettings));
    updateViewer();
});

document.querySelector('.line-height input').addEventListener('input', () => {
    currentSettings = require('./data/setting.json');
    currentSettings.lineHeight = `${document.querySelector('.line-height input').value}`;
    fs.writeFileSync(dataSettingPath, JSON.stringify(currentSettings));
    updateViewer();
});

function updateViewer()
{
    viewSetting = require('./data/setting.json');

    document.querySelector('.padding input').value = viewSetting.padding;
    contentElem.style.padding = `${viewSetting.padding}px`;
    document.querySelector('.padding p span').textContent = document.querySelector('.padding input').value;

    document.querySelector('.font-size input').value = viewSetting.fontSize;
    contentElem.style.fontSize = `${viewSetting.fontSize}px`;
    document.querySelector('.font-size p span').textContent = document.querySelector('.font-size input').value;

    document.querySelector('.line-height input').value = viewSetting.lineHeight;
    contentElem.style.lineHeight = `${viewSetting.lineHeight}`;
    document.querySelector('.line-height p span').textContent = document.querySelector('.line-height input').value;
}

updateViewer();