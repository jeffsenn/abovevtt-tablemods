# Close all windows
$windows = Get-Process | Where-Object {$_.MainWindowHandle -ne 0}
Write-Debug "fo $windows"
foreach ($window in $windows) {
  if( $window.MainWindowTitle -ne "Shuterdown.bat - Shortcut") {
    Write-Host "Closing $window.MainWindowTitle"
    $window.CloseMainWindow()
    Start-Sleep -Milliseconds 100 # Wait briefly between closing windows
  }
}
Stop-Computer
