```powershell
$srcPath = 'C:\..\dropbox-location'
$targetPath = 'D:\..\OneDrive-Location
$items = Get-ChildItem -Path $srcPath -Recurse
$regex = [regex] '[^\p{IsBasicLatin}]|[#%()]|^\s|\s$'

$items | %{
    if($regex.IsMatch($_.Name)) {
        Write-Host -fore red $_.FullName
    }
}

#later execute:
#robocopy /E "$srcPath" "$targetPath"
```


talk about use of symlink
