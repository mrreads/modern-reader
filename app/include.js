const remote = require('electron').remote;

const win = remote.getCurrentWindow();

document.onreadystatechange = (event) => 
{
    if (document.readyState == "complete") 
    {
        handleWindowControls();
    }
};

window.onbeforeunload = (event) => 
{
    win.removeAllListeners();
}

function handleWindowControls() 
{
    document.getElementById('titleMinimize').addEventListener("click", event => {
        win.minimize();
    });

    document.getElementById('titleRestore').addEventListener("click", event => {
        if (win.isMaximized())
        {
            win.unmaximize();
        }
        else
        {
            win.maximize();
        }
    });

    document.getElementById('titleClose').addEventListener("click", event => {
        win.close();
    });
}