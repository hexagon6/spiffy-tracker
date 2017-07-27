# PRIMITIVE CRYPTOCURRENCY-TRACKER

Tracker tracking data WAT?

# WARNING

Do not use this if you have no idea what you're doing. I'm looking at you doge!

# USAGE

Read the code before executing, I will take no responsibilities for your behaviour. You can copy, rename, remix any part of this code.

# PURPOSE

This is supposed to be a small set of utilities to track output from the coinmarketcap API and analyze it for fun and profit.

# REQUIREMENTS

* bash
* node
* jq
* sort (GNU variant for numerical sorting with `sort -V`) 

# ONELINE MANUAL DATA COLLECTION

query every 60 seconds and let it run forever
```bash
 c=0; while true; do node index.js > log/d${c}.json; c=$(($c+1)); sleep 60; done
```

# DATA EXTRACTION

collect your currency you would like to have,
which generates a list of price values in eur in `eur_litecoin.csv`
```bash
./collect.sh litecoin
```

# DATA ANALYSIS

open in your spreadsheet application and plot away!
```bash
xdg-open eur_litecoint.csv
```

Authored by hexagon6 or whoever this is.
