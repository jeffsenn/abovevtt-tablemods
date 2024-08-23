$character = "130166159"
$url = "https://www.dndbeyond.com/characters/$character"
$chromeProcess = Get-Process chrome -ErrorAction SilentlyContinue
if ($chromeProcess) {
    foreach ($process in $chromeProcess) {
        if ($process.MainWindowHandle -ne 0) {
            $process.CloseMainWindow() | Out-Null
            $process.WaitForExit()
        }
    }
}
Start-Process "chrome.exe" -ArgumentList "--start-fullscreen $url"
