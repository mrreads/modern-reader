const contentElem = document.querySelector('#viewer .content');

document.querySelector('.padding input').addEventListener('input', () => {
    currentSettings = require('./data/setting.json');
    currentSettings.padding = `${document.querySelector('.padding input').value}`;
    fs.writeFileSync(dataSettingPath, JSON.stringify(currentSettings));
    updateViewer();
});

function updateViewer()
{
    viewSetting = require('./data/setting.json');
    
    contentElem.style.padding = `${viewSetting.padding}px`;
}