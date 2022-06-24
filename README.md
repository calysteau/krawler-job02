# krawler-job02

Download department GEOJSON file, and add population from a local CSV file using __Kalisio Krawler__ https://github.com/kalisio/krawler

## Setting up the environment

### git install
Download : https://git-scm.com

### nvm install
Download : https://github.com/coreybutler/nvm-windows

```bash
nvm install 16
nvm use 16.15.1
```

### yarn install
Download : https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable

## Krawler install
In the working directory (e.g. c:\workspace), create a kalisio directory

```bash
cd c:\workspace\kalisio
git clone https://github.com/kalisio/krawler
cd krawler
yarn install
yarn link
```

## job02 install
In the kalisio directory ( ex: C:\workspace\kalisio)

```bash
git clone https://github.com/calysteau/krawler-job02
cd krawler-job02
yarn install
```

Run the job
```bash
krawler jobfile.js
```

## Notes

If you need to activate the Krawler DEBUG

```bash
set DEBUG= krawler*   (pour CMD)
```
or 
```bash
$env:DEBUG="krawler*"  (pour PowerShell)
```
