$sourceDir = "d:\Red Team and Prompting\Book\purple team teacher books"
$targetFile = "d:\Red Team and Prompting\research\Obsidian\nexus\src\data\BIBLE_DATA.json"
$files = Get-ChildItem $sourceDir -Filter "purple_team_bible_*.md"
$results = $files | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    @{
        name = $_.Name
        content = $content
    }
}
$results | ConvertTo-Json -Depth 2 | Out-File -FilePath $targetFile -Encoding utf8
Write-Host "Consolidation complete: $targetFile"
