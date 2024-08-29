# this is a windows power script to close Chrome and open it only
# on our page at full screen -- and checks to make sure network is up

# YOU WILL NEED TO PUT THE CHARACTER NUMBER OF YOUR MAPBOT HERE:
$character = "130166159"
$websiteUrl = "https://www.dndbeyond.com"
$cp = Get-Process chrome -ErrorAction SilentlyContinue 
if($cp) {
  foreach ($p in $cp) {
    if($p.MainWindowHandle -ne 0) {
      $p.CloseMainWindow() | Out-Null
      $p.WaitForExit()
    }
  }
}

$timeoutSeconds = 10   # Time to wait between checks
$maxAttempts = 2000    # Maximum number of attempts
$attempt = 0
$siteAvailable = $false
while (-not $siteAvailable -and $attempt -lt $maxAttempts) {
    try {
        $response = Invoke-WebRequest -Uri $websiteUrl -UseBasicParsing -TimeoutSec 5
        if ($response.StatusCode -eq 200) {
            $siteAvailable = $true
            Write-Output "Website is available."
        }
    } catch {
        Write-Output "Website is not available, retrying in $timeoutSeconds seconds..."
        Start-Sleep -Seconds $timeoutSeconds
        $attempt++
    }
}

Start-Process "chrome.exe"  -ArgumentList "--start-fullscreen https://www.dndbeyond.com/characters/$character?abovevtt=true"
