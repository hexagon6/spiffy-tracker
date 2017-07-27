#!/usr/bin/env bash

set -e

CURRENCY=$1

function check_currency {
  CUR=$1
  # extract all existing currencies from first data acquisition point
  CURRENCIES=$(cat log/d0.json | jq '.ticker[] | .id' | tr -d \")
  FOUND=false
  for currency in $CURRENCIES;
  do 
	[ ${currency} = "$1" ] && FOUND=true
  done
  $FOUND && echo found $CUR || (echo -ne "selected currency not found in data set,\n\tmust be one of:\n$CURRENCIES\n"
	exit 1)
}

check_currency $CURRENCY

ID=$CURRENCY

# extract price_eur from selected currency
ls -1 log/d*.json | sort -V | xargs cat | jq '.ticker[] | select(.id == "'$ID'").price_eur' | tr -d \" > eur_${ID}.csv
