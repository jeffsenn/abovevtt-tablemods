$chromeTabs = Get-Process chrome -ErrorAction SilentlyContinue
$url = 'https://www.dndbeyond.com/characters/130166158'
if ($chromeTabs) {
    $tabs = (Get-Process chrome | Select-Object -ExpandProperty MainWindowTitle) -match $url
    if (-not $tabs) {
        Start-Process "chrome.exe" $url
    }
} else {
    Start-Process "chrome.exe" $url
}
